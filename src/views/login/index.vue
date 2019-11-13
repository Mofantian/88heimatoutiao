<template>
  <div class="login">
    <!-- element ui 卡片组件 -->
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form style="margin-top:30px">
        <el-form-item>
          <!-- 放置手机号 -->
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 放置验证码 -->
          <el-input style="width:280px" placeholder="请输入验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // 占当前屏幕的百分百高度
    background: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    .login-card {
      width: 440px;
      height: 340px;
      .title {
        text-align: center;
        img {
          height: 45px;
        }
      }
    }
 }
</style>
