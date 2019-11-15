<template>
  <div class="login">
    <!-- element ui 卡片组件 -->
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- model属性 首先要绑定表单数据对象 -->
      <!-- rules属性 校验规则属性 -->
      <el-form
        style="margin-top:30px"
        :model="loginForm"
        :rules="loginRules"
        ref="formObj"
        >
        <el-form-item prop="mobile">
          <!-- 放置手机号 -->
          <el-input
            v-model="loginForm.mobile"
            placeholder="请输入您的手机号"
            ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 放置验证码 -->
          <el-input
            style="width:280px"
            v-model="loginForm.code"
            placeholder="请输入您的验证码"
            ></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <!-- 勾选同意框 -->
          <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%"
            @click="onlogin"
            >
            登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 要校验的整个表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: '' // 是否勾选
      },
      // 校验规则对象
      loginRules: {
        // key(要校验的字段名):value(数组-->多条或者一条或者没有规则)
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        checked: [
          // rule 代表当前的规则
          // value 代表当前的值 -->表单字段checked的值
          // callBack 回调函数
          { validator: function (rule, value, callBack) {
            if (value) {
              // 如果是true 就是选中了 通过校验
              callBack() // 直接执行callBack,表示校验通过
            } else {
              // 没有选中 不通过校验
              callBack(new Error('您必须同意才能使用'))
            }
          } }
        ]
      }
    }
  },
  methods: {
    onlogin () {
      // ref: 可以通过给标签定义一个ref属性,通过this.$refs属性 获取dom对象
      this.$refs.formObj.validate((isOK) => {
        if (isOK) {
          // 如果为true 继续下一步,调用接口登录
          this.$axios({
            method: 'POST',
            url: '/authorizations',
            data: this.loginForm
          }).then(res => {
            // 存储到本地
            window.localStorage.setItem('user-token', res.data.data.token)
            // 跳转到主页
            this.$router.push('/layout')
          }).catch(res => {
            this.$message({
              message: '你的手机号或者验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
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
