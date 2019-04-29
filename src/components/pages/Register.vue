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
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
      />
      <van-field
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        required
        type="password"
      />
    </div>
    <div class="register_button">
      <van-button type="primary" size="large" @click="registerUserFn"
        >马上注册</van-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.js";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerUserFn() {
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => {
          console.log("注册成功，返回");
        })
        .catch(err => {
          console.log("注册出错");
        });
    }
  }
};
</script>

<style lang="less">
</style>