<template>
  <div>
    <h2>upload</h2>
    <el-row>
      <el-col :span="10">
        <el-input placeholder="请输入标题" v-model="title" clearable>
        </el-input>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入说明"
          v-model="intro"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="url.upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="onBeforeUploadImage"
      multiple
      :limit="10"
      :on-exceed="handleExceed"
      :on-change="fileChange"
      :file-list="fileList"
      :auto-upload="false"
      :http-request="UploadImage"
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
      title: "",
      intro: ""
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
    },
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 20;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 20MB!");
      }
      return isIMAGE && isLt1M;
    },
    UploadImage(param) {
      console.log("111", param);
      //   return;
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("title", this.title);
      formData.append("intro", this.intro);
      //   url.upload
      axios
        .post(url.upload, formData)
        .then(response => {
          console.log("上传图片成功");
          param.onSuccess(); // 上传成功的图片会显示绿色的对勾
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        })
        .catch(response => {
          console.log("图片上传失败");
          param.onError();
        });
    },
    fileChange(file) {
      return;
      this.$refs.upload.clearFiles(); //清除文件对象
      this.logo = file.raw; // 取出上传文件的对象，在其它地方也可以使用
      this.fileList = [{ name: file.name, url: file.url }]; // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    }
  }
};
</script>

<style lang="less" scoped>
</style>