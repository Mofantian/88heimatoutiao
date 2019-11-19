<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :md="6" :sm="12">
          <div class="grid-content bg-purple">123</div>
        </el-col>
        <el-col :xs="24" :md="6" :sm="12">
          <div class="grid-content bg-purple">456</div>
        </el-col>
        <el-col :xs="24" :md="6" :sm="12">
          <div class="grid-content bg-purple">789</div>
        </el-col>
        <el-col :xs="24" :md="6" :sm="12">
          <div class="grid-content bg-purple">123456</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" >
.grid-content {
  background-color: pink;
}
</style>
