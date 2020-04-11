<template>
  <div id="app">
    <el-container>
      <el-header style="height: 50px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content" style="font-size: 18px;">
              <router-link to="home" style="color: #E4E7ED;">观影小站</router-link>
            </div>
            <div style="font-family: Helvetica Neue">
              <router-link to="home" style="color: #FFFFFF">电影</router-link>
              <router-link to="blog" style="color: #FFFFFF; padding-left: 18px;">交流会</router-link>
              <router-link v-if="this.$store.getters.ifLogin" to="myblogs" style="color: #FFFFFF; padding-left: 18px;">我的文章</router-link>
            </div>
          </el-col>
          <el-col :span="12" v-if="!this.$store.state.user.name">
            <router-link to="userService" class="grid-content">注册</router-link>
            <router-link to="login" class="grid-content">登录</router-link>
          </el-col>
          <el-col :span="12" v-else>
            <span class="grid-content">{{this.$store.state.user.nickName}}</span>
            <a class="grid-content" href="#" @click="logout()">退出</a>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { commitLogout } from "./store/help";

  export default {
    name: 'App',
    methods: {
      home() {
        this.$router.push('/home')
      },
      logout() {
        this.$message({
          showClose: true,
          message: '退出成功',
          type: 'success'
        })
        commitLogout()
        this.$router.push('/home')
      }
    }
  }
</script>

<style>
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  .el-header {
    background-color: #409EFF;
    color: #333;
    text-align: center;
    line-height: 50px;
  }

  .el-main {
    color: #333;
    text-align: center;
    min-height: 600px;
  }

  .el-col {
    display: flex;
    justify-content: flex-start;
  }

  .el-col:last-child {
    justify-content: flex-end;
  }

  .grid-content {
    height: 50px;
    color: #E4E7ED;
  }

  .grid-content:first-child {
    margin-right: 20px;
  }
</style>
