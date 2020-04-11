<template>
  <div id="login">
    <my-form name="会员登录" style="text-align: left">
      <el-form-item label="用户名" style="font-weight: bold">
        <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" style="font-weight: bold">
        <el-input v-model="form.password" show-password placeholder="请输入密码" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" style="transform: translateX(-60px)" @click="ToLogin()">登录</el-button>
          <el-button @click="ToResign()">注册</el-button>
        </el-form-item>
      </el-form-item>
    </my-form>
  </div>
</template>

<script>
  import { login } from "../service/userService";
  import { commitLogin } from "../store/help";
  import { User } from '../service/userService'

  export default {
    name: "Login",
    data() {
      return {
        form: {
          name: '',
          password: ''
        }
      }
    },
    components: {
      myForm: () => import('components/reuse/myElForm')
    },
    methods: {
      open(message) {
        this.$alert(message, '登陆成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/home')
          }
        });
      },
      ToLogin() {
        if (this.form.name === "") {
          this.$message.error('用户名为空');
          this.$refs.nameInput.focus()
          return;
        }
        if (this.form.password === "") {
          this.$message.error('密码为空');
          this.$refs.nickName.focus()
        } else {
          login(this.form).then(res => {
            if (res.data.state == 200) {
              this.open(res.data.message)
              const user = User.fromJson(res.data.user)
              commitLogin(user.option)
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      },
      ToResign() {
        this.$router.push('/resign')
      }
    }
  }
</script>

<style scoped>
  #login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-input {
    width: 500px;
  }
</style>