<template>
  <div id="register">
    <navBar />
    <div class="register">
      <div class="main">
        <van-cell-group class="cell-group" :border="false">
          <div class="cell-group">
            <van-icon class-prefix="icon" name="mima" class="phoneIcon" />
            <van-field
              v-model="$store.state.register.password"
              clearable
              placeholder="Please enter 6-11 digit login password"
              class="field"
              :type="pwdShow?'text':'password'"
              :border="false"
              :right-icon="pwdShow?'eye-o':'closed-eye'"
              @click-right-icon="pwdShow = !pwdShow"
            ></van-field>
          </div>
          <div class="cell-group">
            <van-icon class-prefix="icon" name="mima" class="phoneIcon" />
            <van-field
              v-model="password"
              clearable
              placeholder="Please enter 6-11 digit login password"
              class="field"
              :type="pwdShow?'text':'password'"
              :border="false"
              :right-icon="pwdShow?'eye-o':'closed-eye'"
              @click-right-icon="pwdShow = !pwdShow"
            ></van-field>
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
        >确认</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "registerPassword",
  components: {
    navBar
  },
  data() {
    return {
      regLoading: false,
      password: "",
      pwdShow: false
    };
  },
  // created() {
  //   if (this.$METHOD.getStore("token")) {
  //     this.$router.push("/");
  //   }
  // },
  methods: {
    regFn() {
      var that = this;
      if (!this.$METHOD.isPassword(this.$store.state.register.password)) {
        this.$toast.fail("Please enter 6-11 alphanumeric combination password");
        return;
      }
      if (this.$store.state.register.password != this.password) {
        this.$toast.fail("Two passwords are inconsistent");
        return;
      }

      this.regLoading = true;
      this.$SERVER
        .register(this.$store.state.register)
        .then(res => {
          that.regLoading = false;
          that.$toast.success(res.msg);
          that.$router.push("/login");
          return;
          if (window.isApp) {
            that.$METHOD.setStore("token", res.data.userinfo.token);
            that.$store.state.token = res.data.userinfo.token;
            that.$store.state.userInfo = res.data.userinfo_first;
            that.$toast.success(res.msg);
            var push = api.require("push");
            push.bind(
              {
                userName: res.data.userinfo_first.user_nickname,
                userId: res.data.userinfo_first.use_rid
              },
              function(ret, err) {}
            );
            that.$router.push("/");
          } else {
            window.location.href = that.$store.state.resUrl;
          }
        })
        .catch(err => {
          that.regLoading = false;
          that.$toast.fail(err.msg);
        });
    }
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
        .van-cell {
          padding-left: 30px;
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
  .regbtn {
    border-radius: 100px;
    margin-top: 90px;
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
