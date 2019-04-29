<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register_panel">
      <van-field
        v-model="userName"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="userName = ''"
        :error-message="userNameErrorMsg"
      />
      <van-field
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        required
        type="password"
        :error-message="passwordErrorMsg"
      />
    </div>
    <div class="register_button">
      <van-button
        type="primary"
        size="large"
        @click="registerAction"
        :loading="openLoading"
        >马上注册</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import url from "@/serviceAPI.js";
export default {
  data() {
    return {
      userName: "",
      password: "",
      openLoading: false,
      userNameErrorMsg: "",
      passwordErrorMsg: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction() {
      this.checkForm() && this.registerUser();
    },
    registerUser() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
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
            this.$router.push("/");
          } else {
            Toast.fail("注册失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          Toast.fail("注册失败");
          this.openLoading = false;
          console.log(err);
        });
    },
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        this.userNameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.userNameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style lang="less">
</style>