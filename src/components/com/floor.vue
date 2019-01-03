<template>
  <div class="floor">
    <div class="floor-anomaly">
      <div class="floor-one">
        <img
          :src="floor1_0.image"
          alt=""
        >
      </div>
      <div>
        <div class="floor-two">
          <img
            :src="floor1_1.image"
            alt=""
          >
        </div>
        <div class="floor-three">
          <img
            :src="floor1_2.image"
            alt=""
          >
        </div>
      </div>
    </div>
    <div class="floor-rule">
      <div
        v-for="(item,index) in floorData.slice(3)"
        :key="index"
      >
        <img
          :src="item.image"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    floorData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      floor1_0: {},
      floor1_1: {},
      floor1_2: {}
    };
  },
  watch: {
    floorData(val) {
      this.floor1_0 = val[0];
      this.floor1_1 = val[1];
      this.floor1_2 = val[2];
    }
  }
};
</script>

<style lang="less" scoped>
.floor {
  img {
    width: 100%;
  }
  .floor-anomaly {
    display: flex;
    flex-direction: row;
    background-color: white;
    border-bottom: 1px solid #ddd;

    div {
      width: 10rem;
      box-sizing: border-box;
    }
    .floor-one {
      border-right: 1px solid #ddd;
    }
    .floor-two {
      border-bottom: 1px solid #ddd;
    }
  }
  .floor-rule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: white;
    div {
      width: 10rem;
      box-sizing: border-box;
      border-bottom: 1px solid #ddd;
      &:nth-child(odd) {
        border-right: 1px solid #ddd;
      }
    }
  }
}
</style>