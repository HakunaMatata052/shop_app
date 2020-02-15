<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-dropdown-menu class="dropdown" get-container="body">
        <van-dropdown-item v-model="type" :options="typeList" @change="getList(true)"></van-dropdown-item>
      </van-dropdown-menu>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="no more"
        @load="getList"
        :offset="0"
      >
        <div class="list">
          <div class="item" v-for="(item,i) in list" :key="i">
            <div class="left">
              <h3>{{item.title}}</h3>
              <p>{{item.add_time}}</p>
            </div>
            <div :class="item.pm==0?'right':'right j'">
              <span v-if="item.pm==0">-</span>
              <span v-else>+</span>
              {{item.number}}
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "bill",
  data() {
    return {
      type: 0,
      list: [],
      page: 1,
      loading: false,
      finished: false,
      typeList: [
        {
          text: "All",
          value: 0
        },
        {
          text: "Income",
          value: 9
        },
        {
          text: "Expenditure",
          value: 8
        },
        {
          text: "Buy",
          value: 1
        },
        {
          text: "Handling fee",
          value: 5
        },
        {
          text: "Withdraw",
          value: 2
        },
        {
          text: "Repurchase",
          value: 6
        },
        {
          text: "Invitation commission",
          value: 3
        },
        {
          text: "Refund",
          value: 7
        }
      ]
    };
  },
  components: {
    navBar
  },
  methods: {
    getList(isClear) {
      if (isClear) {
        this.page = 1;
        this.finished = false;
      }
      this.$SERVER
        .bill({
          type: this.type,
          page: this.page
        })
        .then(res => {
          this.loading = false;
          if (res.data.length == 0) {
            this.finished = true;
            return;
          }
          this.page++;
          if (isClear) {
            this.list = res.data;
          } else {
            this.list = [...this.list, ...res.data];
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.dropdown {
  position: relative;
  margin-bottom: 10px;
  margin-top: 20px;
  width: 200px;
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
  &:after {
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
.list {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ededed;
    .left {
      h3 {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p {
        font-size: 13px;
        color: #999;
      }
    }
    .right {
      font-size: 15px;
      font-weight: bold;
      &.j {
        color: #fb581d;
      }
    }
  }
}
</style>