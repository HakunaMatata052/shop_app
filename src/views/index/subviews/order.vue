<template>
  <div class="container">
    <navBar :goback="false" />
    <div class="main">
      <van-tabs
        v-model="activeType"
        :swipe-threshold="2"
        :ellipsis="false"
        :border="false"
        title-active-color="#1ac0a8"
        title-inactive-color="#999"
        :line-height="0"
        class="order-tabs"
        @click="getList(true)"
      >
        <van-tab :title="item.name" :name="item.type" v-for="(item,i) in tabs" :key="i"></van-tab>
      </van-tabs>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="no more"
        @load="getList"
        :offset="0"
      >
        <div class="goods-list">
          <div
            class="goods-items"
            v-for="(item,i) in list"
            :key="i"
            @click="$router.push('/orderDetails/'+item.order_id)"
          >
            <div class="goods-type">
              <div class="text">
                <span v-if="item.status==0 && item.paid==0">To be paid</span>
                <span v-else-if="item.status==1 && item.paid==1">To be delivered</span>
                <span v-else-if="item.repurchase==1">To be repurchased</span>
                <span v-else-if="item.status==3 && item.paid==1">Completed</span>
                <template v-if="item.repurchase==1">countdown:35days</template>
              </div>
              <!-- <van-checkbox v-model="checked"></van-checkbox> -->
            </div>
            <div class="goods-info" v-for="(item2,i2) in item.cartInfo" :key="i2">
              <div class="left">
                <img :src="item2.productInfo.attrInfo.image" v-if="item2.productInfo.attrInfo" />
                <img :src="item2.productInfo.image" v-else />
              </div>
              <div class="right">
                <div class="goods-name">{{item2.productInfo.store_name}}</div>
                <div
                  class="goods-short-name"
                  v-if="item2.productInfo.attrInfo"
                >{{item2.productInfo.attrInfo.suk.replace(/,/gi, "+")}}</div>
                <p>{{item2.vip_detail}}</p>
                <div class="price" v-if="item2.productInfo.attrInfo">
                  <span>{{$store.state.currency}}{{item2.productInfo.attrInfo.price}}</span>
                  X{{item2.cart_num}}
                </div>
                <div class="price" v-else>
                  <span>{{$store.state.currency}}{{item2.productInfo.price}}</span>
                  X{{item2.cart_num}}
                </div>
                <van-button
                  type="warning"
                  round
                  class="btn"
                  style="float:right"
                  v-if="item.status==0 && item.paid==0"
                  @click.stop="$router.push('/orderDetails/'+item.order_id)"
                >To pay</van-button>

                <van-button
                  type="primary"
                  round
                  plain
                  class="btn"
                  v-if="item.status==3 && item.paid==1"
                  style="float:right"
                  @click.stop="$router.push('/shareOrder/'+item2.productInfo.id)"
                >share order</van-button>
              </div>
              <div class="info" v-if="item.paid==1 && item2.is_type == 1 && item2.is_status !=1">
                <div class="repo">
                  <van-icon name="question-o" class="ico" @click.stop="$router.push('/content/2')" />&nbsp;&nbsp;&nbsp;&nbsp;
                  <van-button
                    type="warning"
                    round
                    class="btn"
                    @click.stop="orderchase(item2.id)"
                  >official repo expires</van-button>
                </div>
                <p class="p1">
                  Available:
                  <span>{{$store.state.currency}}{{item2.total_price}}</span>
                </p>
                <p>(Handing fee:5%)</p>
                <p>Freight:{{$store.state.currency}}{{item2.productInfo.postage}}</p>
              </div>
            </div>

            <van-divider />
            <div class="bottom-info">
              <div class="total">
                total:
                <span>{{$store.state.currency}}{{item.total_price}}</span>
              </div>
              <div class="text" v-if="item.status==0 && item.paid==0">
                <span>Expire after</span> 12:20:36
              </div>
            </div>
          </div>
        </div>
      </van-list>

      <password-box @onSuccess="submit" ref="passwordBox" />
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import passwordBox from "@/components/operation/passwordBox.vue";
export default {
  name: "",
  data() {
    return {
      activeType: 0,
      list: [],
      page: 1,
      loading: false,
      finished: false,
      tabs: [
        { name: "ALL", type: 5 },
        { name: "TO BE PAID", type: 0 },
        { name: "TO BE DELIVERED", type: 1 },
        { name: "TO BE REPURCHASED", type: 2 },
        { name: "COMPLETED", type: 4 }
      ]
    };
  },
  components: {
    navBar,
    passwordBox
  },
  methods: {
    getList(isClear) {
      if (isClear) {
        this.page = 1;
        this.finished = false;
      }
      this.$SERVER
        .orderList({
          type: this.activeType,
          page: this.page
        })
        .then(res => {
          this.loading = false;
          if (res.data.length == 0) {
            this.finished = true;
          }
          this.page++;
          if (isClear) {
            this.list = res.data;
          } else {
            this.list = [...this.list, ...res.data];
          }
        });
    },

    orderchase(id) {
      this.$refs.passwordBox.showFn();
      this.id = id;
    },

    submit(pwd) {
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
    }
  }
};
</script>
<style lang="less">
.order-tabs {
  .van-tabs__wrap {
    height: 30px !important;
  }
  .van-tab {
    padding: 0 15px;
    font-size: 15px;
    line-height: 30px !important;
    border: solid 1px #fff;
    &.van-tab--active {
      border-radius: 36px;
      border: solid 1px #1ac0a8;
    }
    span {
      font-weight: bold !important;
    }
  }
}
</style>

<style lang="less" scoped>
.goods-items {
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  margin-top: 16px;
  .goods-type {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .text {
      color: #999999;
      span {
        display: inline-block;
        height: 22px;
        line-height: 22px;
        padding: 0 10px;
        background-color: #1ac0a8;
        border-radius: 11px;
        font-size: 13px;
        font-weight: bold;
        color: #ffffff;
        margin-right: 5px;
      }
    }
  }
  .goods-info {
    display: flex;
    flex-wrap: wrap;
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
      p {
        font-size: 15px;
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
  .bottom-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    .text {
      font-size: 15px;
      font-weight: bold;
      span {
        font-weight: bold;
        color: #999999;
      }
    }
    .total {
      font-size: 15px;
      span {
        font-size: 20px;
        font-weight: bold;
        color: #fb581d;
      }
    }
  }
}

.btn {
  height: 35px;
  line-height: 35px;
  padding: 0 26px;
  margin-top: 10px;
}
.info {
  width: 100%;
  text-align: right;
  p {
    font-size: 13px;
    color: #999;
    padding: 3px 0;
    span {
      font-size: 20px;
      font-weight: bold;
      color: #fb581d;
    }
  }

  .p1 {
    font-weight: bold;
    color: #333;
  }
}
.repo {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
</style>