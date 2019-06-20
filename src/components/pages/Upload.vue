<template>
  <div>
    <h2>upload</h2>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import url from "@/serviceAPI.js";
export default {
  data() {
    return {
      openLoading: false
    };
  },
  methods: {
    loadFn() {
      this.openLoading = true;
      axios({
        url: url.upload,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
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
    }
  }
};
</script>

<style lang="less" scoped>
</style>