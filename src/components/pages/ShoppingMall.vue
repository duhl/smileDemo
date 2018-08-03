<template>
  <div>
    <div class="search-bar">
      <van-rown>
        <van-col span="3">
          <span class="location iconfont icon-location"></span>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5" class="search-button">
          <van-button size="mini">搜索</van-button>
        </van-col>
      </van-rown>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Shopping Mall"
    };
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
}
.location {
  width: 2rem;
  height: 2.2rem;
  line-height: 2.2rem;
  margin-left: 0.5rem;
  font-size: 1.8rem;
  color: white;
}
.search-input {
  width: 100%;
  padding-top: 0.2rem;
  height: 1.5rem;
  background-color: transparent;
  color: white;
  border: 0;
  border-bottom: 1px solid white;
}
.search-button {
  line-height: 2rem;
  padding-left: 0.8rem;
}
</style>