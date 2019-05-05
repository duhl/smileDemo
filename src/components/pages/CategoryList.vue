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
          <van-tabs v-model="active">
            <van-tab
              v-for="(item, index) in categorySub"
              :key="index"
              :title="item.MALL_SUB_NAME"
            ></van-tab>
          </van-tabs>
          <div class="list">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onload">
                <div class="item" v-for="(item, index) in list" :key="index">
                  {{ item }}
                </div>
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
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      loading: false,
      finished: false, //上拉加载是否有数据,
      list: [],
      isRefresh: false
    };
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
          } else {
            Toast("服务器错误，商品小分类列表数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGoodsListByCategorySubIdFn(item) {
      axios({
        url: url.getGoodsListByCategorySubId,
        method: "post",
        data: {
          categorySubId: item.ID,
          page: 1,
          nums: 20
        }
      })
        .then(res => {
          console.log("根据小分类id获取到小分类列表数据", res);
          if (res.data.code == 0 && res.data.data) {
            this.categorySub = res.data.data;
          } else {
            Toast("服务器错误，列表数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onload() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.list = [];
        this.onload();
      }, 500);
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
    .list {
      overflow: scroll;
      .item {
        text-align: center;
        line-height: 5rem;
      }
    }
  }
}
</style>