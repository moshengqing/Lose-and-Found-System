<template>
    <div>
      <nav_h></nav_h>
         <div class="index_container">
             <div class="class_box">
               <div class="content">
                 <h3 style="font-size:16px; padding:10px;border-bottom:1px solid #ccc;text-align:center;">寻物启事</h3>
                 <ul v-for=" (item,index) in lose_goods " :key=index>
                   <li>
                     <div class="img_box" >
                      <p class="noneImg" v-show="!item.goods_img">无图</p> 
                      <img v-show="item.goods_img" @click="jup(item.goods_id,item.category)" :src="img_src+item.goods_img" alt="">
                     </div>
                     <div class="detail">
                       <p class="title">
                      <a href="javascript:void(0)" @click="jup(item.goods_id,item.category)">物品详细：{{item.lose_desc}}</a></p>
                       <p>名称：{{item.lose_name}}</p>
                       <p>地点：{{item.place}}</p>
                       <p style="color:red;">状态：{{item.goods_status}}</p>
                       <p>发布时间：{{item.publish_time}}</p>
                       <p>信息类型：{{item.category}}</p>
                     </div>
                   </li>
                 </ul>
                 <div v-if="!length">暂无数据</div>
                 <div v-if="length" style="text-align:center;padding:10px;font-size:14px;">
                    <Page :total="10"  /></div>
               </div>
             </div>
         </div>
         <foot></foot>
    </div>
</template>

<script>
import nav_h from '../../components/nav_h'
import foot from '../../components/footer'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lose_goods:'',
      length:0,
      img_src:'api/static/upload/'
    }
  },  
  components:{
      nav_h,
      foot,
  },
  methods:{
    jup(key,classify){
       this.$router.push({
         path:'/user/detail',
         query: {
           id:key,
           classify:classify}
           })
       console.log(key,classify);
    },
   lose_render(){
        this.$axios({
          method:'get',
          url:'api/users/lose_list'
        }).then((res)=>{
          this.lose_goods=res.data;
          this.length=this.lose_goods.length;
          console.log(this.lose_goods)
        })
      }
  },
  mounted(){
     this.lose_render();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.class_box{
  width: 100%;
  background-color: #fff;
}
.noneImg{
  text-align: center;
  line-height: 96.8px;
  border: 1px solid #ccc;
}
.w{
  width: 50%;
  height: 100%;
}
.class_box .content{
  width: 100%;
  margin-bottom: 5px;
}
.content ul{
  list-style: none;
  
}

.content{
  min-height: 400px;
}


.content ul li{
    width: 100%;
    display: flex;
    max-height: 170px;
    border-bottom: 1px solid #ccc;
    
   
  }
.content ul li .img_box{
    flex: 1;
    background-color: #fff;
}
.content ul li .img_box img{
  width: 200px;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  min-width: 120px;
  min-height: 100px;
  display: block;
  padding: 5px;

}
.content ul li .detail{
    flex: 4;
    width: 100%;
    padding: 10px;
}
.detail .title{
  font-size: 13px;
}
.detail p{
  font-size: 13px;
}
</style>
