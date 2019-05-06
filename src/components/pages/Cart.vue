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
        <!-- <li class="text">{{ item.count }}</li> -->
        <li class="price">{{ item.price }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "购物车页",
      cartData: [],
      isEmpty: false
    };
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
      }
    }
  }
}
</style>