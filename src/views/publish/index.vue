<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $route.params.articleID ? '编辑文章' : '发布文章'}}</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <!-- 富文本编辑器 -->
          <quill-editor
            v-model="article.content"
            ref="myQuillEditor"
            :options="editorOption"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- 下拉列表会把选中的option的value同步到数据中 -->
          <!-- <el-select placeholder="请选择频道" v-model="article.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
              ></el-option>
          </el-select> -->
          <!-- 频道列表组件 -->
          <!--
            我们自己封装的频道下拉列表
            下拉列表的选中状态受绑定数据的影响
            下拉列表切换选中也会改变绑定的数据
           -->
          <channel-select v-model="article.channel_id"></channel-select>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type >= 0">
            <el-row :gutter="20">
              <el-col :span="4" v-for="item in article.cover.type" :key="item">
                <upload-image v-model="article.cover.images[item - 1]"></upload-image>
              </el-col>
            </el-row>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器的样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'

import ChannelSelect from '@/components/channel-select'
import UploadImage from './components/upload-image.vue'
export default {
  name: 'PublishArticle',
  components: {
    // 注册局部组件
    quillEditor,
    ChannelSelect,
    UploadImage
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          // 我们需要把用户选择上传的图片路径存储到这个数组中,用于提交给后台
          images: [] // 图片,无图就是空数组即可
        }, // 文章封面
        channel_id: ''
      },
      // channels: [],
      editorOption: {} // 富文本编辑器的配置选项
    }
  },
  methods: {
    onSubmit (draft) {
      if (this.$route.params.articleID) {
        // 请求编辑文章
        this.updateArticle(draft)
      } else {
        // 请求添加文章
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // header参数
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        // query参数
        params: {
          draft
        },
        // body参数
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '发布成功'
        })
        console.log('发布成功', res)
        this.$router.push('/article')
      }).catch(err => {
        this.$message.error('发布失败')
        console.log('发布失败', err)
      })
    },
    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleID}`,
        // query参数
        params: {
          draft
        },
        // body参数
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        console.log('修改成功', res)
        this.$router.push('/article')
      }).catch(err => {
        this.$message.error('更新失败')
        console.log('发布失败', err)
      })
    },
    // 是否需要token由接口文档告诉你
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     // console.log(res)
    //     this.channels = res.data.data.channels
    //   }).catch(err => {
    //     console.log('文章类别获取失败', err)
    //   })
    // }
    loadArticle () {
      this.$axios({
        url: `/articles/${this.$route.params.articleID}`,
        method: 'GET'
      }).then(res => {
        this.article = res.data.data
      })
    }
  },
  created () {
    // 加载频道列表
    // this.loadChannels()

    // 添加和编辑使用的都是这个组件
    // 只有编辑才需要在初始化的时候,根据id获取文章内容
    if (this.$route.params.articleID) {
      this.loadArticle()
    }
  }
}
</script>

<style>

</style>
