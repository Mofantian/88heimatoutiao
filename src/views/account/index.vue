<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="onUpload"
          >
            <img v-if="user.photo" width="100" :src="user.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p>点击选择上传用户头像</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input v-model="user.intro" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="user.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        intro: '',
        photo: '',
        mobile: ''
      }
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        // console.log(res)
        this.user = res.data.data
      }).catch(err => {
        console.log('获取用户数据失败', err)
        this.$message.error('获取数据失败')
      })
    },
    onSubmit () {
      const { name, email, intro } = this.user
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          email,
          intro
        }
      }).then(res => {
        // 更新用户信息成功之后,通知头部组件
        eventBus.$emit('update-user', this.user)
        this.$message.success('修改成功')
        this.loadUserProfile()
      }).catch(err => {
        this.$message.error('修改失败')
        console.log('修改用户数据失败', err)
      })
    },
    // 该事件触发的时候,它会给这个函数传递这个参数
    // 回调函数中会接收到一个参数,一个上传相关的配置对象
    onUpload (config) {
      const fd = new FormData()
      fd.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      }).then(res => {
        // 发布通知头部组件
        eventBus.$emit('update-user', this.user)
        this.user.photo = res.data.data.photo
        this.loadUserProfile()
      }).catch(err => {
        this.$message.error('上传失败')
        console.log('上传头像失败', err)
      })
    }
  }
}
</script>

<style>

</style>
