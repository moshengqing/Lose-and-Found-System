<template>
     <div>
       <router-view name="lose"></router-view>
       <router-view name="found"></router-view>
       <router-view name="me"></router-view>
       <router-view name="index"></router-view>
       <router-view name="detail"></router-view>
     </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components:{

  },
  mounted(){
    if(sessionStorage.u_id==undefined){
      alert('未登录');
      this.$router.push({path:'/'})
    }
  }
    
}
</script>
<style scoped>

</style>
