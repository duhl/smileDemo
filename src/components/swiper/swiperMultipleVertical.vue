<template>
  <div>
    <swiper class="swiper" :options="swiperOptions">
      <swiper-slide class="siwper-slide" v-for="(item,index) in slide" :key="index">
        slide {{item}}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      slide: [1, 2, 3, 4, 5],
      swiperOptions: {
        direction: "vertical",
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="less" scoped>
.swiper {
  height: 7rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .siwper-slide {
    height: 4rem;
    text-align: center;
    line-height: 4rem;
  }
  .swiper-pagination-bullets {
    right: 25px;
  }
}
</style>