<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="address" @click="show = true">
        <h3>
          <van-icon name="location-o" class="ico" />Shipping address
        </h3>
        <div class="con">
          <p>
            {{address.address}}
            <br />
            {{address.name}} {{address.phone}}
          </p>
          <van-icon name="arrow" class="ico" />
        </div>
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
              <s>{{$store.state.currency}}{{item.productInfo.ot_price}}</s>
              <p>{{item.vip_detail}}</p>
              <div class="price" v-if="item.productInfo.attrInfo">
                <span>{{$store.state.currency}}{{item.productInfo.attrInfo.price}}</span>
                X{{item.cart_num}}
              </div>
              <div class="price" v-else>
                <span>{{$store.state.currency}}{{item.productInfo.price}}</span>
                X{{item.cart_num}}
              </div>
              <div class="isVip">Exclusive for Diamond Members</div>
            </div>
          </div>
          <van-radio-group v-model="item.htype" class="radio-group">
            <van-radio name="1" class="radio">
              <p>
                {{$store.state.currency}}{{item.productInfo.ot_price}} official repo expires
                <van-icon name="question-o" class="ico" @click="$router.push('/content/2')" />
              </p>
              <span>Repurchase fee 5%</span>
            </van-radio>
            <van-radio name="2" class="radio">
              <p>Delivery due</p>
            </van-radio>
          </van-radio-group>
          <van-divider color="#d8dada" />
          <div class="subtotal">
            Subtotal:
            <span>{{$store.state.currency}}{{item.truePrice*item.cart_num}}</span>
          </div>
        </div>
      </div>
      <div class="order-info">
        <p>
          <b>Freight({{cartInfo.length}} in total):</b>
          {{$store.state.currency}}{{orderPrice.pay_postage || 0}}
          <br />
          <b>Order amount:</b>
          <span>{{$store.state.currency}}{{orderPrice.total_price || 0}}</span>
        </p>

        <van-divider color="#d8dada" />
        <div class="user-balance">
          <p>
            Pay with account balance
            <br />
            <small>(Available Balance: {{$store.state.currency}}{{userInfo.now_money || 0}})</small>
          </p>
          <van-checkbox v-model="payType" class="checkbox"></van-checkbox>
        </div>
      </div>

      <password-box @onSuccess="submit" ref="passwordBox" />
      <van-popup v-model="show" round position="bottom">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
          @click-item="selectAdress"
          add-button-text="add address"
        />
      </van-popup>
    </div>
    <van-submit-bar
      label="Total:"
      :currency="$store.state.currency"
      text-align="left"
      :price="orderPrice.pay_price*100"
      button-text="confirm payment"
      @submit="onSubmit"
      button-type="warning"
      safe-area-inset-bottom
      v-if="!show"
    />
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import passwordBox from "@/components/operation/passwordBox.vue";
export default {
  name: "confirmationOrder",
  data() {
    return {
      show: false,
      chosenAddressId: null,
      address: {},
      list: [],
      orderInfo: {},
      cartInfo: [],
      orderPrice: {
        pay_price: 0
      },
      userInfo: {},
      payType: 1,
      arr:[]
    };
  },
  components: {
    navBar,
    passwordBox
  },
  created() {
    this.$SERVER.addressList().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        let json = {
          id: res.data[i].id,
          name: res.data[i].real_name,
          tel: res.data[i].phone,
          address:
            res.data[i].province +
            res.data[i].city +
            res.data[i].district +
            res.data[i].detail
        };
        if (res.data[i].is_default == 1) {
          this.chosenAddressId = res.data[i].id;
          this.address = json;
        }
        this.list.push(json);
      }
    });
    this.$SERVER
      .orderConfirm({
        cartId: this.$route.params.id
      })
      .then(res => {
        this.cartInfo = res.data.cartInfo;
        this.orderInfo = res.data;
        this.$SERVER.orderComputed(res.data.orderKey).then(res2 => {
          this.orderPrice = res2.data.result;
        });
      })
      .catch(err => {
        this.$router.go(-1);
      });
    this.$SERVER.getUserInfo().then(res => {
      this.userInfo = res.data;
    });
  },
  methods: {
    onSubmit() {
      var that = this;
      var r = true;
      var arr = [];
      for (var i = 0; i < this.cartInfo.length; i++) {
        console.log(this.cartInfo[i].htype);
        if (!this.cartInfo[i].htype) {
          r = false;
          that.$toast.fail("Please select buy back or delivery");
          break;
        } else {
          arr.push(this.cartInfo[i].htype);
        }
      }
      this.arr = arr.join(",")
      console.log(r);
      if (!r) {
        return;
      }
      this.$refs.passwordBox.showFn();
    },
    submit(pwd) {
      this.$SERVER
        .orderCreate({
          orderid: this.orderInfo.orderKey,
          addressId: this.address.id,
          bargainId: 0,
          combinationId: 0,
          couponId: 0,
          from: "app",
          mark: "",
          payType: this.payType ? "yue" : "weixin",
          phone: "",
          pinkId: 0,
          real_name: "",
          seckill_id: 0,
          shipping_type: 1,
          useIntegral: 0,
          htype: this.arr,
          cartId: this.$route.params.id,
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
    },
    onAdd() {
      this.$router.push("/addAddress");
    },
    onEdit(item) {
      this.$router.push("/addAddress/" + item.id);
    },
    selectAdress(val) {
      this.address = val;
      this.show = false;
    }
  }
};
</script>
<style lang="less">
.van-submit-bar__button {
  width: auto !important;
}
</style>
<style lang="less" scoped>
.address {
  padding: 28px 10px 10px;
  h3 {
    font-size: 15px;
    font-weight: bold;
    color: #1ac0a8;
    margin-bottom: 20px;
    .ico {
      margin-right: 5px;
    }
  }
  .con {
    display: flex;
    align-items: center;
    p {
      flex-grow: 1;
      font-size: 15px;
      color: #333333;
    }
    .ico {
      flex-shrink: 0;
      font-size: 36px;
      color: #9fa6b0;
    }
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
        font-size: 17px;
        font-weight: bold;
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
  .radio-group {
    padding: 10px 0;
    .radio {
      align-items: flex-start;
      margin-bottom: 5px;
    }
    p {
      font-size: 15px;
      display: flex;
      align-items: center;
      font-weight: bold;
      .ico {
        color: #9fa6b0;
        margin-left: 5px;
      }
    }
    span {
      font-size: 13px;
      color: #999999;
    }
  }
  .subtotal {
    text-align: right;
    font-weight: bold;
    font-size: 15px;
    span {
      font-weight: bold;
      font-size: 20px;
      color: #fb581d;
    }
  }
}
.order-info {
  background-color: #f5f7f7;
  border-radius: 5px;
  padding: 30px 20px;
  margin-bottom: 50px;
  p {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    width: 260px;
    b {
      display: inline-block;
      width: 180px;
    }
    span {
      color: #fb581d;
      font-style: 23px;
      font-weight: bold;
    }
  }
  .user-balance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    small {
      font-style: 12px;
      font-weight: normal;
    }
    .checkbox {
      background: #ccc;
      border-radius: 50%;
    }
  }
}
</style>