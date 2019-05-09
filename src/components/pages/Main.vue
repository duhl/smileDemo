<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <div>
      <van-tabbar v-model="active" @change="changeFn(active)">
        <van-tabbar-item>首页</van-tabbar-item>
        <van-tabbar-item>商品列表</van-tabbar-item>
        <van-tabbar-item>购物车</van-tabbar-item>
        <van-tabbar-item>会员中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: ""
    };
  },
  created() {
    this.changeTabber();
  },
  updated() {
    this.changeTabber();
  },
  methods: {
    changeFn(active) {
      console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: "ShoppingMall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          break;
        default:
          break;
      }
    },
    changeTabber() {
      this.nowPath = this.$route.path;
      switch (this.nowPath) {
        case "/cart":
          this.active = 2;
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>