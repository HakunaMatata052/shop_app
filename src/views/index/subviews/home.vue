<template>
  <div class="container">
    <navBar :goback="false" />
    <div class="main">
      <van-swipe :autoplay="3000" indicator-color="white" class="banner">
        <van-swipe-item v-for="(item,i) in banner" :key="i" @click="$router.push(item.url)">
          <img :src="item.pic" />
        </van-swipe-item>
      </van-swipe>
      <div class="tips">
        <p>
          <van-icon class-prefix="icon" name="dunpai1" />Genuine guarantee
        </p>
        <p>
          <van-icon class-prefix="icon" name="dunpai" />One year warranty
        </p>
      </div>
      <van-grid :column-num="4" :border="false" clickable class="menu">
        <van-grid-item :text="item.cate_name" v-for="(item,i) in menu" :key="i" :to="'/cateogry/'+item.id">
          <van-icon :name="item.pic" slot="icon" class="ico" />
        </van-grid-item>        
      </van-grid>
      <div class="goods-list">
        <goods-item :data="item" v-for="(item,i) in list" :key="i" />
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import goodsItem from "@/components/goods/goodsItem.vue";
export default {
  name: "home",
  data() {
    return {
      banner: [],
      menu: [],
      list: []
    };
  },
  components: {
    navBar,
    goodsItem
  },
  created() {
    this.getList();
  },
  deactivated() {},
  methods: {
    getList() {
      this.$SERVER.index().then(res => {
        this.banner = res.data.banner;
        this.list = res.data.bastList;
        this.menu = res.data.cateogry;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 155px;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #b3b3b3;
  padding: 10px 0;
  i {
    font-size: 15px;
    margin-right: 5px;
  }
}
.menu {
  flex-wrap: nowrap;
  .ico {
    font-size: 35px;
    color: #1ac0a8;
  }
}
.goods-list {
  padding: 0 0 15px 0;
}
</style>

