<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
    <el-link class="el-icon-back" onclick=history.go(-1)></el-link>
      <h2 class="login-title">注册一个新用户</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="register">注册</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    openHTML(html) {
    this.$message({
        dangerouslyUseHTMLString: true,
        message: html
    });
    },
    register() {
        var username = this.form.username;
        var password = this.form.password;
        var email = this.form.email;
        if(username.length==0||password.length==0||email.length==0){
            this.openHTML("参数不能为空");
        }
        else{
          var data = {"username":username,"password":password,"email":email}
          this.Axios.post('/api/user/register',this.qs.stringify(data)).then(res=>{
            if(res.data.code==200){
              this.openHTML("注册成功，正在跳转...");
              setTimeout(function(){window.location.href='/user/login'},1500);
            }else{
              this.openHTML(res.data.msg);
            }
          }).catch(error=>{
            console.log(error);
          });
        }
    }
  }
};
</script>

<style acoped>
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/login.png");
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style> -->