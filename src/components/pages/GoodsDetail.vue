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
    <div class="goods_name">{{ goodsData.NAME }}</div>
    <div class="goods_price">
      价格：￥{{ goodsData.PRESENT_PRICE | moneyFilter }}元
    </div>
    <div class="goods_tabs">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsData.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">评论制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods_bottom">
      <van-button size="large" type="primary" @click="addGoodsToCart">
        加入购物车
      </van-button>
      <van-button size="large" type="danger">
        直接购买
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import url from "@/serviceAPI.js";
import { toMoney } from "@/filter/moneyFilter";
export default {
  data() {
    return {
      msg: "",
      goodsData: {}
    };
  },
  computed: {
    goodsId() {
      return this.$route.query.goodsId || this.$route.params.goodsId;
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    console.log("009", this.$route);
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
    },
    addGoodsToCart() {
      let cartData = localStorage.cartData
        ? JSON.parse(localStorage.cartData)
        : [];
      let isHaveGoods = cartData.find(item => item.goodsId == this.goodsId);
      console.log("已经加入购物车了吗？？？", isHaveGoods);
      if (!isHaveGoods) {
        let newGoodsData = {
          goodsId: this.goodsData.ID,
          name: this.goodsData.NAME,
          price: this.goodsData.PRESENT_PRICE,
          image: this.goodsData.IMAGE1,
          count: 1
        };
        cartData.push(newGoodsData);
        localStorage.cartData = JSON.stringify(cartData);
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" });
    }
  }
};
</script>

<style lang="less" scoped>
.root {
  background-color: white;
  .topic {
    img {
      width: 100%;
    }
  }
  .goods_tabs {
    .detail {
      font-size: 0px;
    }
  }
  .goods_bottom {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    background-color: white;
    button {
      flex: 1;
      margin: 5px;
    }
  }
}
</style>