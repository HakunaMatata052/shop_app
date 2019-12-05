<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="cart-top">
        <span>{{selectNum}} in total</span>
        <van-button plain type="primary" round class="btn">Empty shopping cart</van-button>
      </div>
      <div class="cart-list">
        <div class="order-item" v-for="(item,i) in list" :key="i">
          <van-checkbox v-model="item.checked" class="checkbox"></van-checkbox>
          <div class="goods-items" @click.stop="$router.push('/goodsDetails/'+item.productInfo.id+'/0')">
            <div class="left">
              <img :src="item.productInfo.attrInfo.image" v-if="item.productInfo.attrInfo" />
              <img :src="item.productInfo.image" v-else />
            </div>
            <div class="right">
              <div class="goods-name">{{item.productInfo.store_name}}</div>
              <div
                class="goods-short-name"
                v-if="item.productInfo.attrInfo"
              >{{item.productInfo.attrInfo.suk.replace(/,/gi, "+")}}</div>
              <ul>
                <li>True Tone display</li>
                <li>Wide color display (P3)</li>
                <li>Haptic Touch</li>
              </ul>
              <s>{{$store.state.currency}}{{item.productInfo.ot_price}}</s>
            </div>
          </div>
          <div class="option">
            <h3>Exclusive Member Discounts</h3>
            <div class="con">
              <div class="dropdown-menu">
                <van-icon name="arrow-down" color="#999" class="ico" />Pre-sale 60-day delivery
              </div>
              <div class="price" v-if="item.productInfo.attrInfo">
                <span>{{$store.state.currency}}{{item.productInfo.attrInfo.price}}</span>
              </div>

              <div class="price" v-else>
                <span>{{$store.state.currency}}{{item.productInfo.price}}</span>
              </div>
            </div>
          </div>
          <div class="price-info">
            <div class="top">
              <h3>Special agent exclusive price</h3>
              <h4>{{$store.state.currency}}1,154.00</h4>
            </div>
            <h5>Enjoy a higher discount forever</h5>
            <p>Become a special agent</p>
          </div>
          <van-stepper v-model="item.cart_num" class="stepper" />
          <div style="clear:both"></div>
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
      list: [],
      selectNum: 0
    };
  },
  components: {
    navBar
  },
  created() {
    this.getList();
    this.getCartNum()
  },
  methods: {
    
    getCartNum(){
      this.$SERVER.cartCount().then(res=>{
        this.cartNum = res.data.count
      })
    },
    getList() {
      this.$SERVER.cartList().then(res => {
        this.list = res.data.valid;
      });
    }
  }
};
</script>
<style lang="less">
.stepper {
  width: 130px;
  display: flex;
  align-items: center;
  padding: 0;
  border: solid 1px #1ac0a8;
  border-radius: 50px;
  float: right;
  button {
    width: 35px;
    height: 35px;
    border-radius: 50px;
    color: #1ac0a8;
    background-color: transparent;
  }
  input {
    flex-grow: 1;
    background-color: transparent;
    font-weight: bold;
    font-size: 20px;
  }
  .van-stepper__minus::before,
  .van-stepper__plus::before {
    width: 20px !important;
    height: 4px !important;
    border-radius: 2px;
  }
  .van-stepper__minus::after,
  .van-stepper__plus::after {
    width: 4px !important;
    height: 20px !important;
    border-radius: 2px;
  }
}
</style>
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
.order-item {
  padding: 15px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  margin-top: 16px;
  border-radius: 5px;

  position: relative;
  .checkbox {
    position: absolute;
    left: 10px;
    top: 10px;
    background-color: #f2f4f5;
    border-radius: 50%;
  }
  .goods-items {
    display: flex;
    margin-bottom: 20px;
    .left {
      flex-shrink: 0;
      width: 95px;
      height: 120px;
      padding-left: 25px;
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
      ul {
        margin-bottom: 10px;
        li {
          font-size: 13px;
          line-height: 17px;
          color: #999999;
          position: relative;
          padding-left: 15px;
          &::before {
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -2px;
            content: "";
            width: 4px;
            height: 4px;
            background-color: #fb581d;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .option {
    margin-bottom: 17px;
    h3 {
      font-size: 15px;
      color: #999999;
      margin-bottom: 10px;
    }
    .con {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .dropdown-menu {
        flex-shrink: 0;
        width: 210px;
        height: 40px;
        line-height: 40px;
        background-color: #f5f6f7;
        border-radius: 20px;
        border: solid 1px #f5f6f7;
        font-size: 15px;
        color: #999999;
        text-align: center;
        .ico {
          margin-right: 5px;
        }
      }
      .price {
        flex-shrink: 0;
        font-size: 20px;
        color: #fb581d;
        span {
          font-weight: bold;
        }
      }
    }
  }
  .price-info {
    margin-bottom: 10px;
    .top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 10px;
      h3 {
        font-size: 15px;
        font-weight: bold;
        margin-right: 5px;
      }
      h4 {
        font-size: 20px;
        font-weight: bold;
      }
    }
    h5 {
      font-size: 15px;
      color: #999999;
    }
    p {
      text-decoration: underline;
      font-size: 15px;
      color: #1ac0a8;
    }
  }
}
</style>