<template>
  <div>
    <h1>商品详情</h1>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import url from "@/serviceAPI.js";
export default {
  data() {
    return {
      msg: ""
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
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>