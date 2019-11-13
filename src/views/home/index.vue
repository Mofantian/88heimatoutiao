<template>
  <el-container>
    <!-- 左侧容器 -->
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <!-- 头部容器 -->
      <el-header>Header</el-header>
      <el-main>
        <!-- 中间内容容器 -->
        这里面放二级路由
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'home',
  components: {

  }
}
</script>
