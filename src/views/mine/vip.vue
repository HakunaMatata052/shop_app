<template>
  <div class="container">
    <navBar />
    <div class="main">
      <h3>Offline signing,Visit the company</h3>
      <div class="info">
        <dl>
          <dt>company address:</dt>
          <dd>{{data.gongsi_dizhi}}</dd>
        </dl>
        <dl>
          <dt>Business hours:</dt>
          <dd>Monday to Friday 9:00-17:00</dd>
          <dd>Saturday to Sunday 9:00-17:00</dd>
        </dl>
        <dl>
          <dt>Consulting Appointment:</dt>
          <dd @click="$router.push('/chat')">whatsapp {{data.zixunlianjie}}  <van-icon class-prefix="icon" name="whatsapp" size="23px" color="#1ac0a8" /></dd>
        </dl>
      </div>
      <h3>Online payments</h3>
      <div class="info">
        <van-button
          type="primary"
          class="btn"
          plain
          round
          block
          v-for="(item,i) in data.vip_list"
          :key="i"
          @click="go(item.id)"
        >{{item.name}} {{$store.state.currency}}{{item.money}}</van-button>
      </div>
      <h3></h3>
      <div class="info">
        <img :src="data.vip_changtu.content" v-if="data.vip_changtu"/>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "vip",
  data() {
    return {
      data: {},
      userInfo:{}
    };
  },
  components: {
    navBar
  },
  created() {
    this.$SERVER.getUserInfo().then(res => {
      this.userInfo = res.data;
    });
    this.getList();
  },
  methods: {
    getList() {
      this.$SERVER.levelGrade().then(res => {
        this.data = res.data;
      });
    },
    go(id){
      if(id<=this.userInfo.vip){
        this.$toast.fail('You are already a senior member '+this.userInfo.vip_name)
      }else{
        this.$router.push('/buyVip/'+id)
      }
    }
  }
};
</script>

<style lang="less" scoped>
h3 {
  font-size: 15px;
  font-weight: bold;
  color: #1ac0a8;
  margin: 25px 0 15px;
}
.info {
  background-color: #f5f6f7;
  border-radius: 15px;
  padding: 20px;
  dl {
    margin-bottom: 15px;
    dt {
      color: #999;
    }
    dd {
      font-size: 15px;
      line-height: 25px;
    }
  }
  .btn {
    margin-bottom: 10px;
  }
  img {
    max-width: 100%;
  }
}
</style>