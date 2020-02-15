<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="info">
        <h3>
          My invitation code :
          <span>{{data.spread}}</span>
        </h3>
        <div class="invite-info">
          <dl>
            <dt>{{data.count}}</dt>
            <dd>Invited</dd>
          </dl>
          <dl>
            <dt>286</dt>
            <dd>Invitation income</dd>
          </dl>
          <dl v-if="data.status==1">
            <dt>{{data.total_count}}</dt>
            <dd>Indirect invitation</dd>
          </dl>
        </div>
      </div>
      <van-button
        plain
        type="primary"
        size="small"
        block
        round
        class="btn"
        @click="copyFn(data.share_url)"
      >Click to copy my share link</van-button>
      <div class="content">
        <img :src="data.content" >
      </div>
      <van-button type="primary" block round class="buyvip" to="/vip">Become VIP</van-button>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "invite",
  data() {
    return {
      data: {}
    };
  },
  components: {
    navBar
  },
  created() {
    this.$SERVER.invite().then(res => {
      this.data = res.data;
    });
  },
  methods:{
    
    copyFn(val) {
      var that = this
      if (window.navigator.userAgent.match(/APICloud/i)) {
        var clipBoard = api.require("clipBoard");
        clipBoard.set(
          {
            value: val
          },
          function(ret, err) {
            if (ret) {
              that.$toast.success("Replication success!");
            } else {
            }
          }
        );
      } 
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 25px;
  margin-top: 20px;
  h3 {
    font-weight: bold;
    font-size: 17px;
    span {
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  .invite-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 15px 0 0;
    dl {
      position: relative;
      dt {
        font-size: 24px;
        font-weight: bold;
        color: #1ac0a8;
      }
      dd {
        color: #999999;
        font-size: 13px;
      }

      &:first-child {
        border-left: 0;
      }
    }
  }
}
.btn {
  margin: 20px auto;
}
.content {
  background-color: #f5f6f7;
  border-radius: 15px;
  padding: 20px;
  img {
    max-width: 100%;
  }
}
.buyvip {
  width: 150px;
  margin: 20px auto;
  font-size: 15px;
}
</style>