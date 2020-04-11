<template>
  <div id="myBlogs">
    <div v-for="(item,index) in blogs.slice((nowPage-1)*10,nowPage*10)">
      <div class="response">
        <el-avatar style="align-self: flex-start" shape="square" :size="80" :fit="fit" :src="url"></el-avatar>
        <div class="msgBody">
          <div class="title">
            <span class="name">{{item.name}}</span>
            <span class="date">{{item.date}}</span>
          </div>
          <div class="content" v-html="item.body" v-if="index != nowEdit"></div>
          <mavon-editor
              v-model="item.md"
              ref="md"
              @change="edited"
              class="content"
              style="margin: 15px 0"
              :toolbarsFlag=false
              v-if="index == nowEdit"
          />
          <div class="edit" v-if="item.author && index != nowEdit">
            <el-button type="primary" icon="el-icon-edit" circle @click="edit(index)"></el-button>
          </div>
          <div class="edit" v-if="item.author && index == nowEdit">
            <el-button type="primary" icon="el-icon-upload2" circle @click="update(item.id,editedHtml,item.md)"></el-button>
            <el-button type="primary" icon="el-icon-close" circle @click="cancel(index)"></el-button>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <el-pagination
        background
        :current-page="nowPage"
        layout="prev, pager, next"
        :total="totalPage"
        @current-change="toPage"
        v-show="blogs.length>10">
    </el-pagination>
  </div>
</template>

<script>
  import { userBlog, update } from "../../service/blog";
  import { Blog } from "../../service/blog";
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "MyBlogs",
    data() {
      return {
        fit: 'fill',
        url: 'http://123.57.217.239:8889/images/2020/04/09/u1456927614091651670fm26gp0.jpg',
        blogs: [

        ],
        nowPage: 1,
        nowEdit: Number.POSITIVE_INFINITY,
        editedHtml: ''
      }
    },
    components: {
      mavonEditor
    },
    mounted() {
      let id = this.$store.state.user.id? this.$store.state.user.id : 0
      userBlog(id).then(res => {
        for (let item of res.data) {
          this.blogs.push(Blog.fromJson(item).blog)
        }
      })
      if (!this.$store.getters.ifLogin) this.nowEdit = Number.POSITIVE_INFINITY
    },
    computed: {
      totalPage() {
        return this.blogs.length
      }
    },
    methods: {
      edit(index) {
        this.nowEdit = index
      },
      toPage(page) {
        this.nowPage = page
      },
      update(id, body, md) {
        if (!this.$store.state.user.name) {
          this.$message.error("尚未登录")
        } else if (body == '' || md == '') {
          this.$message.error("请输入文本")
        } else {
          update({
            name: this.$store.state.user.name,
            body: body,
            token: this.$store.state.user.token,
            md: md,
            id: id
          }).then(res => {
            if (res.data.state == 200) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'success'})
              this.blogs = []
              let id = this.$store.state.user.id? this.$store.state.user.id : 0
              userBlog(id).then(res => {
                for (let item of res.data) {
                  this.blogs.push(Blog.fromJson(item).blog)
                }
              })
              this.nowEdit = Number.POSITIVE_INFINITY
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      },
      cancel() {
        this.nowEdit = Number.POSITIVE_INFINITY
      },
      edited(value, render) {
        this.editedHtml = render
      }
    }
  }
</script>

<style scoped>
  .response {
    height: 100px;
    display: flex;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
    margin-bottom: 30px;
  }
  .msgBody {
    flex: 1;
    margin-left: 10px;
  }
  .title {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .name {
    color:#606266;
    padding: 3px;
  }
  .date {
    color: #000;
    padding: 3px;
  }
  .content {
    font-size: 20px;
    text-align: left;
    padding: 3px;
  }
  .edit {
    text-align: right;
  }
</style>