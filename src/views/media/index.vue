<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button> -->
        <!--
          action 上传文件的请求地址
          on-preview 上传预览事件
          on-remove 删除事件
          这个上传组件能帮我们自动发送请求,我们只需要把相关参数配置给它就可以了
          上传组件内部会自己去发请求提交文件,它内部使用的请求不是我们项目中使用的axios
          所以也就不会有基础路径,拦截器等
          请求方法:默认应该就是POST
          注意:这里需要手动配置请求头
         -->
        <el-upload
          class="upload-demo"
          style="float: right; padding: 3px 0"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          :on-success="onUploadSuccess"
          :show-file-list="false"
          >
          <el-button type="primary">点击上传</el-button>
        </el-upload>
        <el-button
          style="float: right; margin-right: 10px"
          type="success"
          @click="onUpload"
        >自己请求上传图片</el-button>
        <!--
          表单元素有个属性叫hidden,可以隐藏它
         -->
        <input type="file" hidden ref="file" @change="onFileChange">
      </div>
      <div>
        <el-radio-group v-model="type" @change="onFind">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :md="4"
          :sm="12"
          v-for="item in images"
          :key="item.id"
          class="col-item"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="item.url"
              class="image"
              height="200"
            >
            <div style="padding: 14px;" class="action">
              <i
                :class="{
                'el-icon-star-on': item.is_collected,
                'el-icon-star-off': !item.is_collected
                }"
                @click="onCollect(item)"></i>
              <!-- <i :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"></i> -->
              <i class="el-icon-delete-solid" @click="onDelete(item)"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  name: 'MediaIndex',
  data () {
    return {
      images: [],
      type: '全部',
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
      }).catch(() => {
        // console.log('数据获取失败', err)
      })
    },
    // 该函数是radio的change事件处理函数
    // 通过文档得知,事件函数有个回调参数,选中的radio label的值
    // 所以我们可以声明一个形参来接收使用
    onFind (value) {
      // console.log(value)
      this.loadImages(value !== '全部')
    },
    onCollect (item) {
      // 请求收藏/取消收藏
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'PUT',
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message.success('操作成功')
        // 更新视图展示
        item.is_collected = !item.is_collected
      }).catch(() => {
        this.$message.error('操作失败')
        // console.log('收藏状态操作失败', err)
      })
    },
    onDelete (item) {
      this.$confirm('此操作将永久删除此文件,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'DELETE'
        }).then(res => {
          this.$message.success('删除成功')
          // 更新视图展示
          this.loadImages()
        }).catch(() => {
          this.$message.error('删除失败')
          // console.log('删除操作失败', err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onUploadSuccess () {
      // 组件上传成功之后触发的事件
      this.loadImages()
    },
    onUpload () {
      // 手动触发DOM的点击事件
      this.$refs.file.click()
    },
    onFileChange () {
      // console.log('文件选择改变了')
      // 获取用户选择的那个文件对象
      const fileObj = this.$refs.file.files[0]
      // 创建一个表单对象
      const formData = new FormData()
      // 手动往表单数据中添加成员
      formData.append('image', fileObj)
      this.$axios({
        method: 'POST',
        url: '/user/images',
        // 我们常见的两种Content-Type
        // application/json  axios默认会设置
        // multipart/form-data  常用于文件上传
        // 如果你提交的data是一个普通对象,axios会自动把Content-Type设置为application/json
        // 错误
        // data: {
        //   image: fileObj
        // }
        // 我们这里接口要求Content-Type为multipart/form-data,所以需要使用FormData对象
        // 如果data提供的是一个FormData,那么axios会把Content-Type设置为multipart/form-data
        data: formData
      }).then(res => {
        // console.log(res)
        this.loadImages()
      }).catch(() => {
        this.$message.error('上传失败')
        // console.log('上传操作失败', err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.col-item {
  margin-bottom: 20px;
  .action {
    display: flex;
    justify-content: center;
    font-size: 24px;
    .el-icon-delete-solid {
      margin-left: 20px;
    }
  }
}
</style>
