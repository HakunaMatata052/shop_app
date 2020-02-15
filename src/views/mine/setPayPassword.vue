<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="transaction">
        <h1>{{tip}}</h1>
        <van-password-input :value="value" :length="6" @focus="showKeyboard = true" />
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
          delete-button-text="delete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "transaction",
  components: {
    navBar
  },
  computed: {
    tip() {
      if (this.step == 1) {
        return "Please enter the old payment password";
      } else if (this.step == 2) {
        return "Please enter the new password";
      } else if (this.step == 3) {
        return "Please enter the new password again";
      }
    }
  },
  watch: {
    value(val) {
      if (val.length == 6) {
        this.value = "";
        if (this.step == 1) {
          this.step = 2;
          this.oldpwd = val;
          this.$toast(this.tip); //提示输入新密码
        } else if (this.step == 2) {
          this.step = 3;
          this.pwd = val;
          this.$toast(this.tip); //提示再次输入新密码
        } else if (this.step == 3) {
          if(this.pwd==val){            
            this.submit(val);
          }else{
            this.step = 2
            this.pwd = ""
            this.$toast.fail(
                "The two passwords are inconsistent, please re-enter"
              );
          }
        }
      }
    }
  },
  data() {
    return {
      oldpwd: "",
      pwd: "",
      value: "",
      showKeyboard: true,
      step: 1
    };
  },
  created() {},
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    submit(val) {
      this.$SERVER
        .tradepwdup({
          newtradepwdup: val,
          lowtradepwdup: this.oldpwd
        })
        .then(res => {
          this.$toast.success(res.msg);
          this.$router.push("/personal");
        })
        .catch(err => {
          this.$toast.fail("Password setting failed!");
          this.step = 1
          this.oldpwd = "";
          this.pwd = "";
          this.value = "";
        });
    }
  }
};
</script>

<style lang="less" scoped>
.transaction {
  h1 {
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin: 111px 0 43px 0;
    text-align: center;
  }
}
</style>

