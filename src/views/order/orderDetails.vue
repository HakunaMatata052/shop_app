<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="top">
        <p>Shipping countdown : 35 days</p>
      </div>

      <div class="goods-list">
        <div class="goods-items" v-for="(item,i) in cartInfo" :key="i">
          <div class="goods-info">
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
              <p>{{item.vip_detail}}</p>
              <div class="price" v-if="item.productInfo.attrInfo">
                <span>{{$store.state.currency}}{{item.productInfo.attrInfo.price}}</span>
                X{{item.cart_num}}
              </div>
              <div class="price" v-else>
                <span>{{$store.state.currency}}{{item.productInfo.price}}</span>
                X{{item.cart_num}}
              </div>
            </div>
          </div>
          <van-divider color="#d8dada" />
          <div class="btn-group">
            <van-button type="warning" class="buy" round @click="$router.push('/goodsDetails/'+item.productInfo.id)">buy again</van-button>
            <div class="repo-info"  v-if="orderInfo.paid==1 && item.is_type == 1 && item.is_status !=1">
              <van-button type="primary" class="btn" round plain @click="orderchase(item.id)">Official repo</van-button>
              <van-icon
                name="question-o"
                size="26px"
                color="#9fa6b0"
                @click="$router.push('/content/3')"
              />
            </div>
          </div>

          <div class="subtotal">
            Total repurchases:
            <span>{{$store.state.currency}}{{item.productInfo.ot_price}}</span>（Repurchase fee:5%）
            <br />
            Refund shipping:{{$store.state.currency}}{{item.productInfo.postage}}
          </div>
        </div>
      </div>

      <div class="order-info">
        <p>
          Order Number : {{orderInfo.order_id}}
          <br />Total :
          <span>{{$store.state.currency}}{{orderInfo.total_price}}</span>
          <br />
          <br />
          Freight : {{$store.state.currency}}{{orderInfo.pay_postage}}
          <br />
          Actual Payment : {{$store.state.currency}}{{orderInfo.pay_price}}
          <br />
          Payment Method :   <template v-if="orderInfo.pay_type=='yue'">Balance Bayment</template> {{$store.state.currency}}{{orderInfo.pay_postage}}
          <br />Payment Time : {{orderInfo._pay_time}}
          <br />Delivery Address : {{orderInfo.user_address}}
          <br />
        </p>
      </div>

      <van-button type="warning" block round  v-if="orderInfo.status==0 && orderInfo.paid==0" @click="show=true">pay</van-button>

      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <password-box @onSuccess="submit" ref="passwordBox" />
    </div>
    <div class="bottom-btn safe-area-inset-bottom boxshadow-top" @click="$router.push('/chat')">
      <van-icon name="service-o" size="23px" color="#1ac0a8" />
      <span>Contact Customer Service</span>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import passwordBox from "@/components/operation/passwordBox.vue";
export default {
  name: "orderDetails",
  data() {
    return {
      cartInfo: [],
      orderInfo: {},
      id:null,
      type:null,
      show:false,
      actions: [
        { name: '余额支付',payType:"yue" },
        { name: '微信支付',payType:"weixin" },
      ],
      payType:null
    };
  },
  components: {
    navBar,
    passwordBox
  },
  created() {
    this.$SERVER.orderDetail(this.$route.params.id).then(res => {
      this.cartInfo = res.data.cartInfo;
      this.orderInfo = res.data;
    });
  },
  methods: {
    orderchase(id) {
      this.$refs.passwordBox.showFn();
      this.id = id
      this.type= 0
    },
    submit(pwd) {
      if(this.type==0){
      this.$SERVER
        .orderchase({
          order_id: this.id,
          paypwd: pwd
        })
        .then(res => {
          this.$toast.success(res.msg);
          this.$refs.passwordBox.hideFn();
          this.$refs.passwordBox.clearFn();
          this.$router.push("/orderDetails/" + res.data.result.orderId);
        })
        .catch(err => {
          this.$refs.passwordBox.clearFn();
        });
      }else if(this.type==1){
        
      this.$SERVER
        .orderPay({
          uni: this.orderInfo.order_id,
          paytype: this.payType,
          from:"app",
          paypwd: pwd
        })
        .then(res => {
          this.$toast.success(res.msg);
          this.$refs.passwordBox.hideFn();
          this.$refs.passwordBox.clearFn();
          this.$router.go(-1);
        })
        .catch(err => {
          this.$refs.passwordBox.clearFn();
        });
      }

    },
    onSelect(item){
      this.type = 1
      this.payType = item.payType
      this.$refs.passwordBox.showFn();
      this.show = false
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  p {
    font-size: 15px;
    span {
      text-decoration: underline;
      font-size: 15px;
      font-weight: bold;
      color: #1ac0a8;
      margin-right: 5px;
    }
  }
}
.img {
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    background-color: #ccc;
    border-radius: 10px;
  }
}

.order-info {
  margin-bottom: 25px;
  p {
    font-size: 13px;
    line-height: 25px;
    span {
      font-size: 20px;
      font-weight: bold;
      color: #fb581d;
      margin-right: 10px;
    }
  }
}
.bottom-btn {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 15px;
    color: #1ac0a8;
    padding-left: 15px;
  }
}

.goods-items {
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  margin-top: 16px;
  margin-bottom: 25px;
  .goods-info {
    display: flex;
    .left {
      flex-shrink: 0;
      width: 93px;
      height: 112px;
      margin-right: 23px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .right {
      flex-grow: 1;
      .goods-name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .goods-short-name {
        font-size: 12px;
      }
      s {
        font-size: 13px;
        color: #999999;
      }
      p {
        font-size: 15px;
        margin-bottom: 5px;
      }
      .price {
        font-size: 15px;
        color: #000000;
        margin-bottom: 5px;
        span {
          font-size: 20px;
          color: #fb581d;
          margin-right: 10px;
          font-weight: bold;
        }
      }
      .isVip {
        font-size: 13px;
        color: #999999;
      }
    }
  }

  .btn-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .buy {
      font-size: 15px;
      font-weight: bold;
      height: 35px;
      line-height: 35px;
      margin-right: 10px;
    }
  }
}
.repo-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  .btn {
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    font-weight: bold;
    margin-right: 15px;
  }
  p {
    margin-top: 15px;
    width: 100%;
    line-height: 24px;
    color: #fb581d;
  }
}

.subtotal {
  font-size: 13px;
  color: #fb581d;
  span {
    font-size: 18px;
  }
}
</style>