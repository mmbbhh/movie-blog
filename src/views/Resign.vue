<template>
  <div id="resign">
    <myForm name="用户注册" style="text-align: left">
      <el-form-item label="用户名" style="font-weight: bold">
        <el-input ref="nameInput" v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="昵称" style="font-weight: bold">
        <el-input ref="nickName" v-model="form.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="密码" style="font-weight: bold">
        <el-input ref="password" v-model="form.password" show-password placeholder="请输入密码" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" style="font-weight: bold">
        <el-input ref="checkPassword" v-model="form.checkPassword" show-password placeholder="请输入密码" ></el-input>
      </el-form-item>
      <el-form-item label="性别" style="font-weight: bold">
        <el-switch
            v-model="form.sex"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="女"
            inactive-text="男">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" style="transform: translateX(-45px)" @click="ToResign()">确认注册</el-button>
        </el-form-item>
      </el-form-item>
    </myForm>
  </div>
</template>

<script>
  import { resign } from "../service/userService";

  export default {
    name: "Resign",
    data() {
      return {
        form: {
          name: '',
          nickName: '',
          password: '',
          checkPassword: '',
          sex: false
        }
      }
    },
    components: {
      myForm: () => import('components/reuse/myElForm')
    },
    methods: {
      open(message) {
        this.$alert(message, '注册成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/login')
          }
        });
      },
      ToResign() {
        if (this.form.name === "") {
          this.$message.error('用户名为空');
          this.$refs.nameInput.focus()
          return;
        }
        if (this.form.nickName === "") {
          this.$message.error('昵称为空');
          this.$refs.nickName.focus()
          return;
        }
        if (this.form.password === "") {
          this.$message.error('密码为空');
          this.$refs.password.focus()
          return;
        }
        if (this.form.password.length < 8) {
          this.$message.error('密码长度至少8位');
          this.$refs.password.focus()
          return;
        }
        if (this.form.checkPassword === "") {
          this.$message.error('请再次输入密码');
          this.$refs.checkPassword.focus()
          return;
        }
        if (this.form.password === this.form.checkPassword) {
          resign(this.form).then(res => {
            if (res.data.state == 200) {
              this.open(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('两次密码输入不一致');
          this.form.password = ''
          this.form.checkPassword = ''
          this.$refs.password.focus()
        }
      }
    }
  }
</script>

<style scoped>
  #resign {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-input {
    width: 500px;
  }
</style>