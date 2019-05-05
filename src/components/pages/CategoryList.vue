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
      active: 0
    };
  },
  created() {
    this.getCategoryListFn();
  },
  mounted() {
    const winHeight = document.documentElement.clientHeight;
    document.querySelector(".left").style.height = winHeight - 46 + "px";
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
  }
}
</style>