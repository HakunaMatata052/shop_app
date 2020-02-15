<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="content">
        <van-dropdown-menu class="dropdown" get-container="body">
          <van-dropdown-item v-model="form.bank_id" :options="bankList"></van-dropdown-item>
        </van-dropdown-menu>
        <input type="text" v-model="form.bank_code" placeholder="Card number" class="input" />
        <input type="text" v-model="form.realname" placeholder="Account name" class="input" />
        <van-button type="primary" round block class="btn" :loading="loading" @click="add">SAVE</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "addBankCard",
  data() {
    return {
      currentBank: "",
      form: {
        bank_id: null,
        realname: "",
        bank_code: ""
      },
      bankList: [],
      loading: false
    };
  },
  components: {
    navBar
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$SERVER.bankList().then(res => {
        this.form.bank_id = res.data[0].id;
        res.data.forEach(e => {
          this.bankList.push({
            text: e.bank_name,
            value: e.id
          });
        });
      });
    },
    add() {
      if (!/^[1-9]\d*$/.test(this.form.bank_code)) {
        this.$toast.fail("Please enter the correct card number");
        return;
      }
      if (this.form.realname.length == 0) {
        this.$toast.fail("Please enter the realname");
        return;
      }
      this.loading = true;
      this.$SERVER
        .bankEdit(this.form)
        .then(res => {
          this.loading = false;
          this.$router.go(-1);
          this.$toast.success(res.msg);
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 20px 0;
  .dropdown {
    position: relative;
    margin-bottom: 10px;
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      background-color: #f5f6f7;
      border-radius: 25px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 11;
    }
    &:after{
        border: 0;
    }

    .title {
      width: 300px;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
  .input {
    width: 100%;
    height: 55px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
    padding: 0 20px;
    color: #333;
    box-sizing: border-box;
  }
  .btn {
    width: 230px;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    font-size: 17px;
    color: #fff;
    margin: 100px auto 20px;
    span {
      font-weight: bold !important;
    }
  }
}
</style>