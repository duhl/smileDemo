<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <span class="location iconfont icon-location"></span>
        </van-col>
        <van-col span="16">
          <input
            type="text"
            class="search-input"
          >
        </van-col>
        <van-col
          span="5"
          class="search-button"
        >
          <van-button size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swipe-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item
          v-for="(banner,index) in bannerPicArray"
          :key="index"
        >
          <img
            v-lazy="banner.image"
            width="100%"
            alt=""
          >
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div
        v-for="(item,index) in category"
        :key="index"
      >
        <img
          width="100%"
          v-lazy="item.image"
          alt=""
        >
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <div class="">
      <img
        width="100%"
        v-lazy="adBanner"
        alt=""
      >
    </div>
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOptions">
          <swiper-slide
            v-for="(item,index) in recommendGoods"
            :key="index"
          >
            <div class="recommend-item">
              <img
                v-lazy="item.image"
                alt=""
                width="80%"
              >
              <div>{{item.goodsName}}</div>
              <div>¥{{item.price|moneyFilter}}(¥{{item.mallPrice|moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor
      :floorData="floor1"
      :floorTitle="floorName.floor1"
    ></floor>
    <floor
      :floorData="floor2"
      :floorTitle="floorName.floor2"
    ></floor>
    <floor
      :floorData="floor3"
      :floorTitle="floorName.floor3"
    ></floor>
    <!-- <swiperDefault></swiperDefault>
    <swiperMultiple></swiperMultiple>
    <swiperMultipleVertical></swiperMultipleVertical>
    <swiperText></swiperText> -->
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import swiperDefault from "@/components/swiper/swiperDefault";
import swiperMultiple from "@/components/swiper/swiperMultiple";
import swiperMultipleVertical from "@/components/swiper/swiperMultipleVertical";
import swiperText from "@/components/swiper/swiperText";
import floor from "@/components/com/floor";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      msg: "Shopping Mall",
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      swiperOptions: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {}
    };
  },
  components: {
    swiper,
    swiperSlide,
    floor
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
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
          this.recommendGoods = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floor2 = res.data.data.floor2;
          this.floor3 = res.data.data.floor3;
          this.floorName = res.data.data.floorName;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.search-bar {
  overflow: hidden;
  height: 2.2rem;
  background-color: #e5017d;
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
  div {
    padding: 0.3rem;
    text-align: center;
  }
}
.recommend-area {
  background-color: white;
  margin-top: 0.3rem;
  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #e5017d;
    padding: 0.2rem;
  }
  .recommend-body {
    width: 100%;
    border-bottom: 1px solid #eee;
    .recommend-item {
      width: 99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>