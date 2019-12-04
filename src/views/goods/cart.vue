<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="cart-top">
        <span>2 in total</span>
        <van-button plain type="primary" round class="btn">Empty shopping cart</van-button>
      </div>
      <div class="cart-list">
        <div class="goods-items" @click.stop="$router.push('/goodsDetails/'+data.id+'/0')">
        <van-checkbox v-model="checked" class="checkbox">复选框</van-checkbox>
          <div class="left">
            <img :src="data.image" />
          </div>
          <div class="right">
            <div class="goods-name van-ellipsis">iPhone 11 Pro</div>
            <div class="goods-short-name van-ellipsis">Midnight Green 4G+128G</div>
            <ul>
              <li>True Tone display</li>
              <li>Wide color display (P3)</li>
              <li>Haptic Touch</li>
            </ul>
            <s>$2,234.95</s>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "",
  data() {
    return {
        data:{}
    };
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.cart-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 15px;
    color: #1ac0a8;
  }
  .btn {
    height: 30px;
    line-height: 30px;
  }
}
.goods-items {
  display: flex;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  margin-top: 16px;
  position: relative;
  .left {
    flex-shrink: 0;
    width: 95px;
    height: 105px;
    padding-left: 15px;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .right {
    flex-grow: 1;
    overflow: hidden;
    .goods-name {
      font-size: 17px;
      font-weight: bold;
    }
    .goods-short-name {
      font-size: 12px;
      margin-bottom: 5px;
    }

    s {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>