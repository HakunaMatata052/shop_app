
<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        add-button-text="add new address"
        class="address-list"
        default-tag-text="default"
      >
        <van-button
          type="primary"
          block
          round
          slot="default"
          class="btn"
          @click="defaultFn"
        >Set as default</van-button>
      </van-address-list>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "addressList",
  data() {
    return {
      chosenAddressId: "",
      list: []
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
      this.$SERVER.addressList().then(res => {
        let list = [];
        for (let i = 0; i < res.data.length; i++) {
          let json = {
            id: res.data[i].id,
            name: res.data[i].real_name,
            tel: res.data[i].phone,
            address:
              res.data[i].province +
              res.data[i].city +
              res.data[i].district +
              res.data[i].detail,
            isDefault: res.data[i].is_default
          };
          if (res.data[i].is_default == 1) {
            this.chosenAddressId = res.data[i].id;
          }
          list.push(json);
        }
        this.list = list;
      });
    },
    onEdit(item) {
      this.$router.push("/addAddress/" + item.id);
    },
    onAdd() {
      this.$router.push("/addAddress");
    },
    select(item) {},
    defaultFn() {
      this.$SERVER
        .addressDefaultSet({
          id: this.chosenAddressId
        })
        .then(res => {
          this.$toast.success(res.msg);
          this.getList();
        });
    }
  }
};
</script>

<style lang="less">
.address-list {
  .van-cell {
    background-color: #f5f6f7;
  }
}
</style>
<style lang="less" scoped>
.btn {
  margin-top: 20px;
}
</style>