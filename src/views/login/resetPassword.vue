<template>
  <div id="register">
    <navBar />
    <div class="register">
      <div class="main">
        <van-cell-group class="cell-group" :border="false">
          <van-field
            v-model="form.telephone"
            clearable
            placeholder="Please enter your mobile number"
            class="field"
            type="tel"
            :border="false"
            :readonly="readonly"
          ></van-field>
          <van-cell-group>
            <van-field
              v-model="form.checknum"
              center
              clearable
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
          </van-cell-group>
          <van-field v-model="form.password" type="password" placeholder="Please enter a new password" class="field"></van-field>
          <van-field v-model="form.password2" type="password" placeholder="Please enter the new password again" class="field"></van-field>
        </van-cell-group>
        <van-button
          type="primary"
          size="large"
          :loading="regLoading"
          loading-type="spinner"
          @click="regFn"
          class="regbtn"
          :hairline="false"
        >Confirm revision</van-button>
        <div class="gologin" v-if="!$METHOD.getStore('token')">
          Already have an account?
          <span @click="$router.push('/login')">Login immediately</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "resetPassword",
  components: {
    navBar
  },
  data() {
    return {
      regLoading: false,
      checkNumDisabled: false,
      readonly: false,
      form: {
        telephone: "",
        password: "",
        checknum: ""
      },
      countDown: 60,
      checked: true,
      timer: null
    };
  },
  methods: {
    sendchecknum() {
      if (this.form.telephone.length > 0) {
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
            phone: this.form.telephone,
            type:"login"
          })
          .then(res => {
            this.$toast.success("Verification code sent successfully!");
          })
          .catch(res => {
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$toast.fail("Please enter your mobile number");
      }
    },
    regFn() {
      if (this.form.telephone.length<=0) {
        this.$toast.fail("Please enter the correct mobile number");
        return;
      }
      if (this.form.checknum == "") {
        this.$toast.fail("Please enter the verification code");
        return;
      }

      if (!this.$METHOD.isPassword(this.form.password)) {
        this.$toast.fail("Please enter 6-11 digit login password");
        return;
      }
      if (this.form.password !== this.form.password2) {
        this.$toast.fail("Two passwords are inconsistent");
        return;
      }
      this.regLoading = true;
      this.$SERVER
        .pwdup({
          phone: this.form.telephone,
          captcha: this.form.checknum,
          password: this.form.password
        })
        .then(res => {
          this.$toast.success(res.msg);
          this.regLoading = false;
          this.$router.go(-1);
        })
        .catch(res => {
          this.regLoading = false;
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
  background-color: #fff;
  .register {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .main {
    width: 90%;
  }
  .checknumbtn {
    border: 0;
  }
  .regbtn {
    border-radius: 100px;
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
    color: #fff;
    border: 0;
  }
  .right-text {
    font-size: 14px;
    text-align: right;
    color: #999;
    span {
      color: #1ac0a8;
      margin-left: 5px;
    }
  }
  .gologin {
    text-align: center;
    margin-top: 50px;
    color: #999;
    span {
      text-decoration: underline;
    }
  }
}
</style>
