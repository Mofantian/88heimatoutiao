<template>
  <el-container>
    <!-- 左侧容器 -->
    <el-aside width="220px" class="left">
      <div class="menu-title">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <el-menu
        style="width:221px"
        background-color='#353b4e'
        text-color='#adafb5'
        active-text-color='#ffd04b'
        router
        >
        <el-menu-item index='/'>首页</el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu index="1">
          <template slot="title">内容管理</template>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/article">内容管理</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="/media">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">粉丝管理</template>
          <el-menu-item>图文数据</el-menu-item>
          <el-menu-item>粉丝概况</el-menu-item>
          <el-menu-item>粉丝画像</el-menu-item>
          <el-menu-item>粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="/account">账户信息</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部容器 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <!-- 中间内容容器 -->
        <!-- 这里面放二级路由 -->
        <!--
          在router-view上增加一个key,就可以禁用路由缓存功能
          key值不唯一即可
         -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from '../../components/layout-header.vue'
export default {
  components: {
    'layout-header': layoutHeader
  }
}
</script>

<style lang="less" scoped>
.left{
  width: 220px;
  height: 100vh;
  background-color: #353b4e;
  overflow: hidden;
  .menu-title {
    padding: 15px 0;
    text-align: center;
    background-color: #2e2f32;
    img {
      height: 30px;
    }
  }
}

</style>
