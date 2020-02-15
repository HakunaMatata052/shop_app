

<template>
  <div class="container">
    <navBar :title="state+' SHIPPING ADDRESS'" />
    <div class="main">
      <div class="form">
        <dl>
          <dt>Address</dt>
          <dd>
            <input type="text" v-model="form.detail" :placeholder="Address" />
          </dd>
        </dl>
        <dl>
          <dt>Receiver</dt>
          <dd>
            <input type="text" v-model="form.real_name" :placeholder="Receiver" />
          </dd>
        </dl>
        <dl>
          <dt>Phone number</dt>
          <dd>
            <input type="text" v-model="form.phone" :placeholder="Phone" />
          </dd>
        </dl>
        <van-button type="primary" round block class="btn" :loading="loading" @click="add">SAVE</van-button>
        <van-button
          type="warning"
          round
          block
          class="btn del"
          :loading="loading"
          @click="del"
          v-if="state=='EDIT'"
        >DELETE</van-button>
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
      state: "ADD",
      Address: "enter the address",
      Receiver: "enter the receiver",
      Phone: "enter the phone number",
      form: {},
      loading: false
    };
  },
  components: {
    navBar
  },
  created() {
    if (this.$route.params.id) {
      this.state = "EDIT";
      this.form.id = this.$route.params.id;
      this.$SERVER.addressDetail(this.$route.params.id).then(res => {
        this.form.real_name = res.data.real_name;
        this.form.detail = res.data.detail;
        this.form.phone = res.data.phone;

        this.Receiver = res.data.real_name;
        this.Address = res.data.detail;
        this.Phone = res.data.phone;
      });
    }
  },
  methods: {
    add() {
      if (this.form.real_name.length == 0) {
        this.$toast.fail("Please enter the realname");
        return;
      }
      if (this.form.detail.length == 0) {
        this.$toast.fail("Please enter the detail");
        return;
      }
      if (this.form.phone.length == 0) {
        this.$toast.fail("Please enter the phone number");
        return;
      }
      this.loading = true;
      this.$SERVER
        .addressEdit(this.form)
        .then(res => {
          this.loading = false;
          this.$router.go(-1);
          this.$toast.success(res.msg);
        })
        .catch(err => {
          this.loading = false;
        });
    },
    del() {
      this.loading = true;
      this.$dialog
        .confirm({
          message: "Are you sure to delete?",
          confirmButtonText: "confirm",
          cancelButtonText: "cancel"
        })
        .then(() => {
          this.$SERVER
            .addressDel({
              id: this.$route.params.id
            })
            .then(res => {
              this.loading = false;
              this.$router.go(-1);
              this.$toast.success(res.msg);
            })
            .catch(err => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 30px 15px;
  dl {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 15px;
    dt {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    dd {
      input {
        font-size: 15px;
        color: #999;
        width: 100%;
        padding: 10px 0;
        border: 0;
      }
    }
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
    &.del {
      margin: 0 auto;
    }
  }
}
</style>