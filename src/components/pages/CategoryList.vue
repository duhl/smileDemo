<template>
  <div>
    <div>
      <van-nav-bar title="分类列表" left-text="返回" left-arrow />
    </div>
    <div class="main">
      <van-col span="6">
        <div class="left">
          <ul>
            <li
              v-for="(item, index) in category"
              :key="index"
              :class="{ active: categoryIndex == index }"
              @click="subListFn(item, index)"
            >
              {{ item.MALL_CATEGORY_NAME }}
            </li>
          </ul>
        </div>
      </van-col>
      <van-col span="18">
        <div class="right">
          <van-tabs v-model="active" @click="onClickCategorySub">
            <van-tab
              v-for="(item, index) in categorySub"
              :key="index"
              :title="item.MALL_SUB_NAME"
            ></van-tab>
          </van-tabs>
          <div class="list">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onload">
                <ul
                  class="item"
                  v-for="(item, index) in goodsList"
                  :key="index"
                  @click="toDetail(item)"
                >
                  <li><img :src="item.IMAGE1" :onerror="errorImg" alt="" /></li>
                  <li>{{ item.NAME }}</li>
                  <!-- <li>{{ item.ORI_PRICE }}</li> -->
                  <li>￥{{ item.PRESENT_PRICE | moneyFilter }}元</li>
                </ul>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
      </van-col>
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
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      loading: false,
      finished: false, //上拉加载是否有数据,
      goodsList: [],
      page: 1,
      categorySubId: "", //商品子类id
      isRefresh: false,
      errorImg: 'this.src="' + require("@/assets/errorimg.png") + '"'
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.getCategoryListFn();
  },
  mounted() {
    const winHeight = document.documentElement.clientHeight;
    document.querySelector(".left").style.height = winHeight - 46 + "px";
    document.querySelector(".list").style.height = winHeight - 90 + "px";
  },
  methods: {
    getCategoryListFn() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(res => {
          console.log("获取到商品大类列表数据", res);
          if (res.data.code == 0 && res.data.data) {
            this.category = res.data.data;
            this.getCategorySubListFn(this.category[0]);
          } else {
            Toast("服务器错误，商品大类列表数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    subListFn(item, index) {
      this.categoryIndex = index;
      this.getCategorySubListFn(item);
      this.page = 1;
      this.finished = false;
      this.goodsList = [];
    },
    getCategorySubListFn(item) {
      this.categorySub = [];
      this.active = 0;
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: {
          categoryId: item.ID
        }
      })
        .then(res => {
          console.log("根据大分类id获取到小分类列表数据", res);
          if (res.data.code == 0 && res.data.data) {
            this.categorySub = res.data.data;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID;
            this.onload();
          } else {
            Toast("服务器错误，商品小分类列表数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGoodsListFn() {
      axios({
        url: url.getGoodsListByCategorySubId,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page,
          nums: 20
        }
      })
        .then(res => {
          console.log("根据小分类id获取到列表数据", res);
          if (res.data.code == 0 && res.data.data.length) {
            // this.categorySub = res.data.data;
            this.page++;
            this.goodsList = this.goodsList.concat(res.data.data);
          } else {
            this.finished = true;
            // Toast("服务器错误，列表数据获取失败");
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickCategorySub(index, title) {
      console.log(index, title);
      this.page = 1;
      this.categorySubId = this.categorySub[index].ID;
      this.goodsList = [];
      this.finished = false;
      this.onload();
    },
    onload() {
      setTimeout(() => {
        /* for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        } */
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodsListFn();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodsList = [];
        this.page = 1;
        this.onload();
      }, 500);
    },
    toDetail(item) {
      this.$router.push({
        name: "GoodsDetail",
        params: { goodsId: item.ID }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  .left {
    background-color: #f5fdff;
    ul {
      li {
        padding: 10px;
        line-height: 2rem;
        font-size: 0.8rem;
      }
      li.active {
        background-color: rgb(200, 242, 255);
      }
    }
  }
  .right {
    background-color: white;
    .list {
      overflow: scroll;
      .item {
        padding: 10px 5px;
        width: 100%;
        float: left;
        // line-height: 5rem;
        font-size: 0.8rem;
        border: 1px solid #f1f1f1;
        img {
          width: 100%;
        }
        li {
          width: 70%;
          //   display: inline-block;
          float: right;
        }
        li:first-child {
          width: 28%;
          float: left;
        }
        li:last-child {
          margin-top: 5px;
          color: rgb(199, 26, 26);
        }
      }
    }
  }
}
</style>