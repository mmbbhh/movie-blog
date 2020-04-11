<template>
  <div id="Form">
    <el-form ref="form" label-width="80px" style="width: 600px">
      <el-form-item :label="name" class="formHead"></el-form-item>
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "element-form",
    props: {
      name: {
        type: String,
        default: 'name'
      }
    }
  }
</script>

<style scoped>
  .el-form {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .formHead {
    height: 40px;
    background: #E4E7ED;
    font-size: 18px;
  }
</style>