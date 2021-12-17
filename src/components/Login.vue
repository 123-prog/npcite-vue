<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">电子商务管理系统</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round @click="login">登录</el-button>
        <el-link type="primary" href="/user/register">还没有账号？点此注册</el-link>
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
    login() {
      var username  = this.form.username;
      var password = this.form.password;
      if(username.length==0||password.length==0){
        this.openHTML("账号与密码不能为空");
      }
      else{
         let data = {"username":username,"password":password};
         this.Axios.post('/api/user/login',this.qs.stringify(data)).then((res)=>{
           if(res.data.code == 200 && res.data.msg == "登录成功"){
             this.openHTML("登录成功");
             console.log(res.headers);
             window.location.href = '/index/show';
           }else{
             this.openHTML("账号或密码错误");
           }
         }).catch((error)=>{
           console.log(error);
         })
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