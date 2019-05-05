<template>
  <div class="root">
    <!-- <h1>商品详情</h1> -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="topic">
      <img :src="goodsData.IMAGE1" alt="" />
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
      msg: "",
      goodsData: {}
    };
  },
  computed: {
    goodsId() {
      return this.$route.query.goodsId;
    }
  },
  created() {
    this.goodsDetailInfo();
  },
  methods: {
    goodsDetailInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          console.log("获取到详情数据", res);
          if (res.data.code == 0 && res.data.data) {
            this.goodsData = res.data.data;
          } else {
            Toast("服务器错误，商品详情数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.root {
  .topic {
    img {
      width: 100%;
    }
  }
}
</style>