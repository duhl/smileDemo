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
  created() {
    this.goodsDetailInfo();
  },
  methods: {
    goodsDetailInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: "0032862950ca44d397e58a6fb10a3e38"
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