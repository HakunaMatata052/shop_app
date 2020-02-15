<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="top">Total People : {{total}}</div>
      <table class="table">
        <tr v-for="(item,i) in list" :key="i">
          <td>
            <span>{{item.phone}}</span>
          </td>
          <td>
            <span>{{item.nickname}}</span>
          </td>
          <td>{{item.time}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "inviteList",
  data() {
    return {
        list:[],
        total:0
    };
  },
  components: {
    navBar
  },
  created(){
      this.getList()
  }
  ,
  methods:{
      getList(){
          this.$SERVER.spreadPeople({
              page:1,
              limit:99999
          }).then(res=>{
              this.list = res.data.list
              this.total = res.data.total
          })
      }
  }
};
</script>

<style lang="less" scoped>
.top {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background-color: #f5f6f7;
  border-radius: 20px;
  padding: 0 25px;
  margin-bottom: 15px;
  font-size: 17px;
  font-weight: bold;
  color: #1ac0a8;
}
.table {
    width: 100%;
    tr{
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ededed;
        td{
            font-size: 13px;
            color:#999;
            span{
                font-size: 15px;
                font-weight: bold;
                color:#333;
            }
        }
    }
}
</style>