<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
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
        <!-- <el-form-item label="封面">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item> -->
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
export default {
  name: 'PublishArticle',
  components: {
    // 注册局部组件
    quillEditor,
    ChannelSelect
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
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
        console.log(res)
      }).catch(err => {
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
