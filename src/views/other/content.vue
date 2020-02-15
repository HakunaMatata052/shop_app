<template>
  <div class="container">
      <navBar :title="content.title" />
      <div class="main">
          <div id="content" v-html="content.content"></div>
      </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
    name:"",
    data(){
        return{
content:{}
        }
    },
    components:{
        navBar
    },
    created(){
        this.getContent()
    },
    methods:{
        getContent(){
            this.$SERVER.about({
                nid:this.$route.params.id
            }).then(res=>{
                this.content = res.data
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>