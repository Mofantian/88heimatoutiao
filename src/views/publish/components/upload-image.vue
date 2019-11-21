<template>
  <div>
    <div class="preview" @click="onUploadShow">
      <img class="avatar" v-if="value" :src="value">
      <i class="el-icon-plus avatar-uploader-icon" v-else></i>
    </div>
    <!--
      visible用来控制对话框的显示和隐藏
     -->
    <el-dialog
      title="请选择文章封面图片"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <!-- 标签导航 -->
      <!--
        el-tabs
          v-model 双向绑定
            数据驱动视图:当绑定数据发生改变,激活的标签页受影响
            视图影响数据:当标签改变的时候,标签的label会同步到数据中
       -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <el-radio-group v-model="activeImage" @change="loadImage">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="collect">收藏</el-radio-button>
          </el-radio-group>
          <el-row :gutter="20">
            <el-col
              :span="6"
              v-for="(item, index) in images"
              :key="item.id"
              :class="{'img-item': index === activeIndex}"
              @click.native="activeIndex=index"
            >
              <img height="100" :src="item.url" alt="">
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            list-type="picture-card"
            :headers="uploadHeaders"
            name="image"
            :on-preview="onPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  name: 'UploadImage',
  props: {
    // 选择预览的图片地址
    value: {
      type: String
    }
  },
  data () {
    return {
      centerDialogVisible: false,
      activeName: 'first',
      activeImage: 'all',
      previewImages: '', // 存储选中的上传图片的路径
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      },
      images: [],
      activeIndex: null // 激活的图片的索引
    }
  },
  methods: {
    onUploadShow () {
      // 请求加载数据
      this.loadImage()
      // 显示弹窗
      this.centerDialogVisible = true
    },
    loadImage (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: this.activeImage === 'collect' // 是否获取收藏图片
        }
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log('数据获取失败', err)
      })
    },
    onConfirm () {
      if (this.activeName === 'first') {
        // 当前是素材库
        const image = this.images[this.activeIndex]
        if (image) {
          // 将选中的图片路径赋值给previewImages
          // this.previewImages = image.url
          // 将图片的地址同步给父组件的绑定的数据
          this.$emit('input', image.url)
        }
      } else if (this.activeName === 'second') {
        // 当前是上传图片
        const previewImage = this.previewImage
        if (previewImage) {
          this.$emit('input', previewImage)
        }
      }
      // 关闭对话框
      this.centerDialogVisible = false
    },
    onPreview (file) {
      this.previewImage = file.response.data.url
    }
  }
}
</script>

<style lang="less" scoped>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152px;
  height: 152px;
  border: 1px solid #000;
  .avatar {
    width: 150px;
    height: 150px;
  }
}
.img-item {
  border: 1px solid #000;
}
</style>
