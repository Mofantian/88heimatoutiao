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
          >
            <img width="100" :src="user.photo" class="avatar">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
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
      console.log('点击上传编辑')
    }
  }
}
</script>

<style>

</style>
