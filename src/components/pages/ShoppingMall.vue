<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <span class="location iconfont icon-location"></span>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5" class="search-button">
          <van-button size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swipe-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(item,index) in category" :key="index">
        <img width="100%" v-lazy="item.image" alt="">
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <div class="">
      <img width="100%" v-lazy="adBanner" alt="">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: "Shopping Mall",
      bannerPicArray: [],
      category: [],
      adBanner: ""
    };
  },
  created() {
    this.interfaceIndexDataFn();
  },
  methods: {
    interfaceIndexDataFn() {
      axios({
        url:
          "https://www.easy-mock.com/mock/5b688452bb39fb125c791fc6/smile/index",
        method: "get"
      })
        .then(res => {
          console.log(res);
          this.category = res.data.data.category;
          this.bannerPicArray = res.data.data.slides;
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.search-bar {
  overflow: hidden;
  height: 2.2rem;
  background-color: #e5017d;
}
.location {
  width: 2rem;
  height: 2.2rem;
  line-height: 2.2rem;
  margin-left: 0.5rem;
  font-size: 1.8rem;
  color: white;
}
.search-input {
  width: 100%;
  padding-top: 0.2rem;
  height: 1.5rem;
  background-color: transparent;
  color: white;
  border: 0;
  border-bottom: 1px solid white;
}
.search-button {
  line-height: 2rem;
  padding-left: 0.8rem;
}
.swipe-area {
  clear: both;
  max-height: 10rem;
  overflow: hidden;
}
.type-bar {
  margin: 0 0.3rem 0.3rem 0.3rem;
  background-color: white;
  border-radius: 0.3rem;
  display: flex;
  /* flex-direction: row; */
  /* flex-wrap: nowrap; */
  font-size: 16px;
}
.type-bar div {
  padding: 0.3rem;
  text-align: center;
}
</style>