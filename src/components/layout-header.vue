<template>
  <!-- 头部组件 el-low布局 -->
  <el-row type="flex" justify="space-between" align="middle">
    <!-- 左侧 -->
    <el-col :span="6" class="left">
      <!-- 左侧 -->
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="3" class="right">
      <!-- 头像 -->
      <img width="50" :src="user.photo" alt="">
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span>
          {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <!--
            如果想要给一个组件注册一个原生js事件
            使用.native修饰符
           -->
          <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
  name: 'LayoutHeater',
  data () {
    return {
      user: {
        name: '',
        photo: ''
      }
    }
  },
  methods: {
    onLogout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行这里
        // 删除token
        window.localStorage.removeItem('user-token')
        // 跳转到登录页
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          // 取消执行这里
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        this.user = res.data.data
      }).catch(() => {
        // console.log('获取用户失败', err)
      })
    }
  },
  created () {
    this.loadUser()
    // 在初始化中监听自定义事件
    eventBus.$on('update-user', user => {
      // console.log('update-user调用了')
      this.user.name = user.name
      this.user.photo = user.photo
    })
  }
}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
  }
  span {
    margin-left: 4px;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
  }
}
</style>
