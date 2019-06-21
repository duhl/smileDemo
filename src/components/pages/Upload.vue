<template>
  <div>
    <h2>upload</h2>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url.upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="10"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import url from "@/serviceAPI.js";
export default {
  data() {
    return {
      openLoading: false,
      fileList: [],
      url: url
    };
  },
  methods: {
    loadFn(fileList) {
      this.openLoading = true;
      axios({
        url: url.upload,
        method: "post",
        /* data: {
          userName: this.userName,
          password: this.password
        } */
        data: fileList
      })
        .then(res => {
          console.log("注册成功，返回", res);
          if (res.data.code == 0) {
            Toast.success(res.data.message);
            // this.$router.push("/");
          } else {
            Toast.fail("注册失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          Toast.fail("上传失败");
          this.openLoading = false;
          console.log(err);
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="less" scoped>
</style>