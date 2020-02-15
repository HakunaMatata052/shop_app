<template>
  <div id="register">
    <navBar />
    <div class="register">
      <div class="main">
        <van-cell-group class="cell-group" :border="false">
          <div class="cell-group">
            <van-field
              v-model.number="form.phone"
              clearable
              placeholder="Please enter your new mobile number"
              class="field"
              type="number"
              :border="false"
              pattern="[0-9]*"
              autofocus="autofocus"
            ></van-field>
          </div>
          <div class="cell-group">
            <van-field
              v-model="form.captcha"
              center
              class="field"
              placeholder="Please enter SMS verification code"
            >
              <van-button
                slot="button"
                size="small"
                type="primary"
                class="checknumbtn"
                @click="sendchecknum"
                :disabled="checkNumDisabled"
                :hairline="false"
              >
                <span v-if="checkNumDisabled">Try again in {{countDown}} seconds</span>
                <span v-else>Send verification code</span>
              </van-button>
            </van-field>
          </div>
        </van-cell-group>
        <van-button
          type="primary"
          size="large"
          :loading="regLoading"
          loading-type="spinner"
          @click="regFn"
          class="regbtn"
          :hairline="false"
        >submit</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "setPhone",
  components: {
    navBar
  },
  data() {
    return {
      regLoading: false,
      checkNumDisabled: false,
      countDown: 60,
      checked: true,
      timer: null,
      tipsShow: false,
      form:{
        phone:"",
        captcha:""
      }
    };
  },
  created() {
    if (this.$route.params.val) {
      this.form.spread = this.$route.params.val;
    }
  },
  methods: {
    sendchecknum() {
      if (this.form.phone!="") {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.$SERVER
          .smscode({
            phone: this.form.phone,
            type: "register"
          })
          .then(res => {
            this.$toast.success("Verification code sent successfully!");
          })
          .catch(res => {
            this.form.captcha = "";
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$toast.fail("Please enter the correct mobile number");
      }
    },
    regFn() {
      var that = this;
      if (!this.$METHOD.isPhone(this.form.phone)) {
        this.$toast.fail("Please enter the correct mobile number");
        return;
      }
      if (this.form.captcha == "") {
        this.$toast.fail("Please enter the verification code");
        return;
      }
      
      this.$SERVER
        .editphone(this.form)
        .then(res => {
          that.regLoading = false;
          that.$toast.success(res.msg);
          that.$router.push("/personal");
        })
        .catch(err => {
          that.regLoading = false;
          that.$toast.fail(err.msg);
        });
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#register {
  width: 100%;
  height: 100%;
  .register {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    background: #fff;
    padding: 28px 0 45px 0;
  }
  .main {
    width: 90%;
    & > p {
      text-align: center;
      margin-top: 10px;
      color: #999;
      font-size: 14px;
      span {
        text-decoration: underline;
        color: rgba(249, 74, 81, 1);
      }
    }
    .cell-group {
      .cell-group {
        display: flex;
        position: relative;
        border-bottom: 1px solid #e6e6e6;
        .phoneIcon,
        .securityIcon {
          position: absolute;
          top: 10px;
          z-index: 1;
          font-size: 20px;
          color: rgba(173, 173, 173, 1);
        }
        .recommendedPhone {
          font-size: 15px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          width: 110px;
          line-height: 44px;
        }
        .choose {
          padding-left: 18px;
        }
      }
    }
  }
  .checknumbtn {
    border: 0;
    border-radius: 18px;
  }
  .regbtn {
    border-radius: 100px;
    margin-top: 30px;
    border: 0;
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
  .gologin {
    text-align: center;
    margin-top: 50px;
    color: #999;
    span {
      text-decoration: underline;
      color: #1ac0a8;
    }
  }
}
</style>
