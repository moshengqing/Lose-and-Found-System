<template>
<div>
  <nav_h></nav_h>
  <div class="index index_container">
    <updata class="updata"><Icon :size="50" type="ios-add-circle-outline" /></updata>
    <div class="infoCenter">
       <Collapse v-model="value1">
        <Panel name="1">
            消息中心<Badge text="hot"></Badge>
            <h4 v-if="display">暂无数据</h4>
            <p slot="content">
              <ul>
                <li v-for="(note,index) in notice" :key=index><span>系统公告 : </span>{{note.publish_content}}
                <p>{{note.publish_time}}  {{note.publish_name}}  </p>
                </li>
              </ul>
            </p>
        </Panel>
       </Collapse>
    </div>
    <div class="goods index_container">
      <div class="lose content">
        <p style="border-bottom:1px solid #ddd; padding:5px;font-size:14px;"><Badge text="最新"></Badge>失物招领</p>
        <ul >
          <li v-for="(i,index) in new_pick" :key=index>
            <div  class="img_box" @click="jupPick(i.goods_id,i.category)">
              <img  :src="img_src+i.goods_img" alt>
            </div>
            <div class="detail">
              <p class="title">
                <a href="javascript:void(0)" >{{i.pick_desc}}</a>
              </p>
              <p>地点：{{i.place}}</p>
              <p>发布时间：{{i.publish_time}}</p>
              <p>信息类型：{{i.category}}</p>
              <p style="color:red;">状态：{{i.goods_status}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="lose content">
        <p style="border-bottom:1px solid #ddd; padding:5px;font-size:14px;"><Badge text="最新"></Badge>寻物启事</p>
         <ul >
          <li v-for="(i,index) in new_lose" :key=index>
            <div  class="img_box" @click="jupLose(i.goods_id,i.category)">
              <img :src="img_src+i.goods_img" alt>
            </div>
            <div class="detail">
              <p class="title">
                <a href="javascript:void(0)" >{{i.lose_desc}}</a>
              </p>
              <p>地点：{{i.place}}</p>
              <p>发布时间：{{i.publish_time}}</p>
              <p>信息类型：{{i.category}}</p>
              <p style="color:red;">状态：{{i.goods_status}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <foot></foot>
</div>
</template>

<script>
import nav_h from "../../components/nav_h";
import add from "../../components/add";
import foot from "../../components/footer";
import updata from '../../components/updata'
export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      value1: "1",
      notice:'',
      display:false,
      new_pick:[],
      new_lose:[],
      img_new:[{
         lose_title:'shshh',
         place:'dhdh'
      }],
      img_src:'api/static/upload/'
    };
  },
  methods:{
     pick(){
      this.$axios({
          method:'get',
          url:'api/users/pick_list',
        }).then((res)=>{
          console.log(res.data)
          this.new_pick=res.data.slice(0,3);
          console.log(this.new_pick)
        })
     },
      jupPick(key, classify) {
      this.$router.push({
        path: "api/user/detail",
        query: {
          id: key,
          classify: classify
        }
      });
      console.log(key, classify);
    },
    jupLose(key,classify){
       this.$router.push({
         path:'api/user/detail',
         query: {
           id:key,
           classify:classify}
           })
       console.log(key,classify);
    },
     lose(){
        this.$axios({
         method:'get',
         url:'api/users/lose_list'
       }).then((res)=>{
         this.new_lose=res.data.slice(0,3); // 6,7,8,9,10;
         console.log(this.new_lose)
       })
     },
     get_notice(){
        this.$axios({
         method:'get',
         url:'api/users/get_notice'
       }).then((res)=>{
         this.notice=res.data;

         
       })
     
     }
  },
  mounted(){
    this.lose();
    this.pick();
    this.get_notice();
  },
  components: {
    add,
    nav_h,
    foot,
    updata
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
  width: 100%;
  overflow:hidden;
}
.infoCenter {
  max-height: 200px;
  font-size: 14px;
  background-color: #fff;
  
}
.infoCenter ul{
  height: 100px;
  list-style: none;
 overflow: auto;
}
.infoCenter ul li{
    padding: 5px;
}
.infoCenter ul li span{
   color: red;
  font-size: 14px;
}
.infoCenter ul li p{
  font-size: 13px;
}
.goods {
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  min-height: 450px;
}

.lose {
  background-color: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
  flex: 1;
}
.content ul {
  list-style: none;
}
.content ul li {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.content ul li:last-child {
  border-bottom: none;
}
.content ul li .img_box {
  flex: 1;
  background-color: #fff;
}
.content ul li .img_box img {
  width: 220px;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  min-width: 120px;
  min-height: 100px;
  display: block;
  padding: 5px;
  cursor: pointer;
}
.content ul li .detail {
  flex: 4;
  width: 100%;
  padding-top: 5px;
  padding-left: 10px;
}
.detail .title {
  font-size: 13px;
}
.detail p {
  font-size: 13px;
}
.updata{
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
}
@media screen and (min-width: 640px){
   .updata{
     display: none;
   }

}
@media screen and (max-width: 640px) {
  .goods {
    display: block;
    min-height: 0;
  }
  .lose {
    margin-top: 0;
  }
  .lunbo{
   display: none;
}
}
</style>
