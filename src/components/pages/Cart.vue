<template>
  <div class="root">
    <div>
      <van-nav-bar title="购物车" />
    </div>
    <div class="top-bar">
      <van-button size="small" type="danger" plain @click="clearCart"
        >清空购物车</van-button
      >
    </div>
    <div class="cart-list">
      <ul class="item" v-for="(item, index) in cartData" :key="index">
        <li class="pic"><img :src="item.image" alt="" /></li>
        <li class="text">
          <span>{{ item.name }}</span>
          <span>
            <van-stepper v-model="item.count" />
          </span>
        </li>
        <li class="price">
          <span>￥{{ item.price | moneyFilter }}</span>
          <span>x{{ item.count }}</span>
          <span>￥{{ (item.count * item.price) | moneyFilter }}</span>
        </li>
      </ul>
    </div>
    <div class="bottom-bar">商品总价：￥{{ totalMeney | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter";
export default {
  data() {
    return {
      msg: "购物车页",
      cartData: [],
      isEmpty: false
    };
  },
  watch: {
    cartData: {
      handler: function(val) {
        console.log("购物车数据有变化了？", val);
      },
      deep: true
    }
  },
  computed: {
    totalMeney() {
      let meney = 0;
      this.cartData.forEach(item => {
        meney += item.price * item.count;
      });
      localStorage.cartData = JSON.stringify(this.cartData);
      return meney;
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.getCarData();
  },
  methods: {
    getCarData() {
      if (localStorage.cartData) {
        this.cartData = JSON.parse(localStorage.cartData);
      }

      console.log("有么有购物车缓存数据", JSON.stringify(this.cartData));
      this.isEmpty = this.cartData.length ? false : true;
    },
    clearCart() {
      localStorage.removeItem("cartData");
      this.cartData = [];
    }
  }
};
</script>

<style lang="less" scoped>
.root {
  background-color: white;
  .top-bar {
    text-align: right;
    padding: 0.5rem;
  }
  .cart-list {
    .item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      font-size: 0.8rem;
      padding: 0.5rem;
      border-bottom: 1px solid #ededed;
      li.pic {
        flex: 6;
        img {
          width: 100%;
        }
      }
      li.text {
        padding-left: 10px;
        flex: 14;
        span {
          display: block;
        }
        span:last-child {
          margin-top: 10px;
        }
      }
      li.price {
        padding-left: 10px;
        flex: 4;
        text-align: right;
        span {
          display: block;
          margin-bottom: 10px;
        }
        span:last-child {
          color: red;
        }
      }
    }
  }
  .bottom-bar {
    box-sizing: border-box;
    padding: 0.5rem;
    width: 100%;
    line-height: 30px;
    border-top: 1px solid #ededed;
    // position: fixed;
    // left: 0;
    // bottom: 0;
    background-color: white;
    text-align: right;
    color: red;
    font-size: 0.8rem;
  }
}
</style>