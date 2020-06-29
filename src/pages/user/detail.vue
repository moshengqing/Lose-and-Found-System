<template>
  <div class>
    <nav_h></nav_h>
    <div class="detail_box index_container">
      <h3 style="font-size:16px; padding:10px;border-bottom:1px solid #ccc;text-align:center;"> <a href="javascript::" @click="goback" style="float:left;font-size:16px;">返回</a> 物品详情</h3>
      <p class="title">物品描述：{{de.pick_desc || de.lose_desc}}</p>
      <p class="statu">状态:【{{de.goods_status}}】</p>
      <div class="class">所属分类：{{de.category}}</div>
      <div class="detail">
        <ul>
          <li>
            <Icon type="md-photos"/>物品图片
            <img :src="img_src+ (de.goods_img || de.goods_img)" alt>
          </li>
          <li>
            <Button  :disabled="dispaly" @click="accept"  v-if="de.category =='失物招领'" type="success">去领取</Button>
             <Modal
        v-model="modal1"
        cancel-text=''
        title="请牢记该联系方式" @on-ok="ok">
          <p> 联系方式：{{de.contact_way}}</p>
        </Modal>

          </li>
          <li v-if="de.category =='失物招领' ? false :true">
            <Icon type="md-call"/>
            联系方式：{{de.contact_way}}
          </li>
          <li>
            <Icon type="md-copy"/>
            物品种类：{{de.category}}
          </li>
          <li>
            <Icon type="md-speedometer"/>
            时间：{{de.publish_time}}
          </li>
          <li>
            <Icon type="ios-contact"/>
            联系人：{{de.loser_name ||de.picker_name}}
          </li>
          <li>
            <Icon type="ios-information-circle"/>备注：
          </li>
          <li>
            <Icon type="ios-create-outline" size="30"/>
            <input v-if="de.category =='失物招领'" class="input" type="text" placeholder="说点什么....." v-model="commentinput">
             <input v-if="de.category =='寻物启事'" class="input" type="text" placeholder="留下线索，帮助他....." v-model="commentinput">
          </li>
          <li>
            <Button v-if="de.category =='失物招领'" type="success" @click="comment" long>评论</Button>
            <Button v-if="de.category =='寻物启事'"  type="success" @click="comment" long>留下线索</Button>
          </li>
        </ul>
      </div>
      <div class="pinglun">
        <List v-if="de.category=='失物招领'" header="评论/留言">
          <ListItem v-for="comm in commentData" :key="comm">
            <ListItemMeta
              
              :title="comm.remark_name +' : '+comm.remark_content"
              :description="comm.remark_time"
            />
          </ListItem>
        </List>
         <List v-if="de.category =='寻物启事'" header="线索信息">
          <ListItem v-for="comm in commentData" :key="comm">
            <ListItemMeta
             
              :title="comm.remark_name +' : '+comm.remark_content"
              :description="comm.remark_time"
            />
          </ListItem>
        </List>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import nav_h from "../../components/nav_h";
import foot from "../../components/footer";
export default {
  name: "nav_box",
  data() {
    return {
      modal1:false,
      dispaly:false,
      msg: "Welcome to Your Vue.js App",
      id: this.$route.query.id,
      classify: this.$route.query.classify,
      de:"",
      img_src: "api/static/upload/",
      commentData: "",
      commentinput: ""
    };
  },
  computed: {
  },
  components: {
    nav_h,
    foot
  },
  mounted() {
    this.detail();
    this.getComments();
    console.log(this.$route.query.id);
    console.log(this.$route.query.classify);
  },
  beforeUpdate(){
      if(this.de.goods_status =="认领中" ||this.de.goods_status =="已认领"){
       this.dispaly=true;
    }
  },
  methods: {
    detail() {
      this.$axios({
        method: "get",
        url:
          "api/users/detail?id=" +
          this.id +
          "&classify=" +
          this.classify +
          ""
      }).then(res => {
        console.log(res.data[0]);
        this.de = res.data[0];
      });
    },
    comment() {
      if(this.commentinput==""){
        this.$Message.error("数据不能为空");
        return;
      }
      this.$axios({
        method: "post",
        url: "api/users/add_comments",
        data: {
          comments: this.commentinput,
          goods_id: this.$route.query.id,
          class: this.$route.query.classify,
          u_id: sessionStorage.u_id,
          u_name: sessionStorage.u_name
        }
      }).then(res => {
        console.log(res.data)
        if(res.data.state==200){
           this.$Message.info("评论成功");
        }else{
           this.$Message.info("评论失败");
        }
      });
      this.commentinput = "";
      setTimeout(() => {this.getComments();}, 2000);
      
    },
    getComments() {
      this.$axios({
        method: "get",
        url:
          "api/users/get_comments?id=" + this.id +"&classify=" +this.classify +""
      }).then(res => {
        console.log(res.data);
        this.commentData = res.data;
        // this.details=res.data;
      });
    },
    goback(){
      this.$router.go(-1)
    },
    accept(){
      if(localStorage.u_id == this.de.picker_id){
        this.$Message.error("认领错误，该用户不能认领");
        return;
      }
      this.modal1=true;
      this.$axios({
        method: "get",
        url:"api/users/to_claim?id="+this.id+"&u_id="+sessionStorage.u_id+"",
      }).then((res)=>{
         
      })
      
    },
    ok(){
      this.$Message.success("进入认领状态");
      this.dispaly=true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail_box {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.title {
  border-bottom: 1px #ccc dotted;
  font-size: 14px;
  padding: 10px;
}
.statu {
  padding: 10px;
  font-size: 17px;
  height: 40px;
  color: rgb(236, 40, 40);
}
.de {
  font-size: 14px;
  padding-left: 10px;
  border-bottom: 1px #ccc dotted;
}
.class {
  font-size: 14px;
  border: 1px #ccc dotted;
  padding: 10px;
}
.detail {
  margin-top: 10px;
}
.detail ul {
  list-style: none;
}
.detail ul li {
  border-bottom: 1px #ccc dotted;
  padding: 10px;
  font-size: 14px;
}
.detail ul li .input {
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  padding-left: 5px;
  font-size: 16px;
  margin-bottom: 3px;
}
.detail ul li:first-child img {
  max-width: 7rem;
  max-height: 5rem;
  width: auto;
  height: auto;
  display: block;
}
.detail ul li:last-child {
  border: none;
}
.pinglun {
  width: 100%;
  font-size: 14px;
  margin-bottom: 10px;
}
.pinglun ul {
  list-style: none;
}
.pinglun ul li {
  padding: 5px;
}
@media screen and (max-width: 640px) {
  .detail ul li:first-child img {
    width: 100%;
    max-height: 5rem;
    width: auto;
    height: auto;
  }
}
</style>
