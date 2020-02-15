<template>
  <div class="container">
    <navBar />
    <div class="main">
      <h3>VIP amount : {{$store.state.currency}}{{data.money}}</h3>
      <div class="use-balance">
        <p>
          Pay with your account balance
          <br />
          (Available Balance : {{$store.state.currency}}{{userInfo.now_money}})
        </p>
        <van-checkbox v-model="checked" class="checked" :label-disabled="true"></van-checkbox>
      </div>
      <h3>order amount : {{$store.state.currency}}{{data.money}}</h3>

      <van-button type="warning" round block class="btn" @click="buy">PAY</van-button>
      <div class="info">
        <img :src="data.image" />
      </div>
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
      data: {},
      userInfo: {},
      checked: true
    };
  },
  components: {
    navBar,

    passwordBox
  },
  created() {
    this.$SERVER
      .vip_first({
        id: this.$route.params.id
      })
      .then(res => {
        this.data = res.data;
      });
    this.$SERVER.getUserInfo().then(res => {
      this.userInfo = res.data;
    });
  },
  methods: {
    buy() {
      if (this.data.money > this.userInfo.now_money) {
        this.$toast.fail("Sorry, your credit is running low.");
        return;
      }
      this.$dialog
        .confirm({
          message: "Confirm purchase?",
          confirmButtonText: "confirm",
          cancelButtonText: "cancel"
        })
        .then(() => {
          this.$refs.passwordBox.showFn();
        })
        .catch(() => {
          // on cancel
        });
    },
    submit(pwd) {
      this.$SERVER.vip_buy({
        id: this.$route.params.id,
        money: this.data.money,
        paypwd: pwd
      }).then(res=>{
          this.$store.state.userInfo.vip = this.$route.params.id
          this.$refs.passwordBox.hideFn();
          this.$router.push('/personal')
          this.$toast.success(res.msg)
      })
    }
  }
};
</script>

<style lang="less" scoped>
h3 {
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
  padding: 15px 25px;
}
.use-balance {
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 25px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    flex-grow: 1;
    font-size: 15px;
    font-weight: bold;
  }
  .checked {
    flex-shrink: 0;
  }
}
.info {
  background-color: #f5f6f7;
  border-radius: 15px;
  padding: 20px;
  img {
    max-width: 100%;
  }
}
.btn {
  width: 230px;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  font-size: 17px;
  color: #fff;
  margin: 30px auto 20px;
}
</style>