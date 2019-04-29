<template>
  <div>
    <van-nav-bar
      title="用户登录"
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
        @click="loginAction"
        :loading="openLoading"
        >登录</van-button
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
  created() {
    console.log(localStorage.loginInfo);
    if (JSON.parse(localStorage.loginInfo).userName) {
      Toast.success("您已经登录过了");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      this.checkForm() && this.loginUser();
    },
    loginUser() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            new Promise((resolve, reject) => {
              localStorage.setItem(
                "loginInfo",
                JSON.stringify({
                  userName: this.userName
                })
              );
              setTimeout(() => {
                resolve();
              }, 500);
            }).then(() => {
              Toast.success(res.data.message);
              res.data.isLogin && this.$router.push("/");
            });
          } else {
            Toast.fail(res.data.message);
          }
          this.openLoading = false;
        })
        .catch(err => {
          Toast.fail("登录失败");
          console.log("登录失败", err);
          this.openLoading = false;
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