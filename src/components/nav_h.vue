<template>
  <div class="box">
    <div class="nav_box index_container">
      <div class="nav_list clearfix">
        <img class="h_img" src="../assets/logo1.jpg" alt>
        <p class="welcome"> &nbsp;欢迎您!</p>
        <ul class="clearfix">
          
            <li><router-link class="rlink" to="/user/index" :class="{active:'/user/index'===$route.path}">首页</router-link></li>

            <li><router-link class="rlink" to="/user/lose">失物招领 </router-link></li>
         
            <li> <router-link class="rlink" to="/user/found">寻物启事</router-link></li>
        
          <li>
            <updata> 物品发布 </updata>
          </li>
          <!-- <router-link class='router-link' to="/user/me"><li>用户中心</li></router-link> -->
        </ul>
         <!-- <Input class="search" search enter-button placeholder="猜你想要的。。" /> -->
         <!-- <div class="search"><Input  search @on-search="onsearch" :enter-button="true" placeholder="Enter something..." /></div> -->
        <img
          :src="src+head_img"
          class="icon"
          icon="ios-person"
          @click="modal2 = true"
        >
        <Modal v-model="modal2" title="头像修改" @on-ok="up_img" @on-cancel="cancel">
          <Upload action="api/users/update_headimg"
          :data="data"
          :format="['jpg','jpeg','png','gif']"
          :on-success='success'>
          <Button icon="ios-cloud-upload-outline">选择要上传的图片</Button>
           </Upload>
        </Modal>
        <Dropdown :transfer="true" trigger="click" class="loginout" style="margin-left:20px;">
          <a href="javascript:void(0)">
            <span style="color:#fff;">{{u_name}}</span>
            <Icon style="color:#fff;" type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem :divided="true">
              <p >积分：{{Credit_score}}</p>
            </DropdownItem>
            <DropdownItem :divided="true">
              <p @click="to_me">用户中心</p>
            </DropdownItem>
            <DropdownItem :divided="true">
              <p @click="modal1 = true">密码修改</p>
            </DropdownItem>
            <DropdownItem :divided="true">
              <p @click="loginOut">退出系统</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!-- <span @click="loginOut"  href="javascript::">LoginOut</span> -->
      </div>
      <div class="nav_mobile" style="display:none;">
        <ul class="clearfix">
            <li><router-link class="router-link" to="/user/index">首页 </router-link></li>
            <li> <router-link class="router-link" to="/user/lose">失物招领 </router-link></li>
            <li><router-link class="router-link" to="/user/found">寻物启事 </router-link></li>
            <li><router-link class="router-link" to="/user/me">用户中心  </router-link></li>
        
        </ul>
      </div>
    </div>
    <!-- 用户中心 -->
    <!-- <Drawer title="个人中心" placement="left" :closable="false" v-model="value2" :scrollable="true">
      <p>学生</p>
      <p>20160107000849</p>
      <p>莫盛清</p>
      <p>学生</p>
      <p>20160107000849</p>
      <p>莫盛清</p>
      <p>学生</p>
      <p>20160107000849</p>
      <p>积分：208</p>
      <Button @click="loginOut" type="success">Success</Button>
    </Drawer>-->
    <Modal v-model="modal1" title="密码修改" @on-ok="up_pass" @on-cancel="cancel">
      <span>新密码：</span>
      <Input v-model="newpasswords" placeholder="请输入新密码" style="width: 300px"/>
    </Modal>
  </div>
</template>

<script>
import updata from "./updata";
import "../base.css";
export default {
  name: "nav_h",
  data() {
    return {
      theme1: "dark",
      modal1: false,
      modal2: false,
      value2: false,
      visible: false,
      modal10: false,
      newpasswords: "",
      Credit_score:0,
      head_img:'',
      src:"api/static/upload/",
      formItem: {
        input: "",
        select: ""
      },
      u_name: sessionStorage.u_name,
      u_id: sessionStorage.u_id,
      data:{
        u_id:sessionStorage.u_id,
      }
    };
  },
  methods: {
    loginOut() {
      sessionStorage.removeItem("u_id");
      sessionStorage.removeItem("u_name");
       sessionStorage.removeItem("class");
      this.$router.push({ path: "/" });
    },
    onsearch(){
      alert('ok')
    },
    to_me() {
      this.$router.push({ path: "/user/me" });
    },
    success(res,files){
       console.log(files)
    },
    up_pass() {
      if (this.newpasswords != "") {
        this.$Message.info("密码已修改");
        this.$axios({
          method: "post",
          url: "api/users/update_pass",
          data: {
            newpasswords: this.newpasswords,
            u_id: this.u_id
          }
        }).then(res => {
          // console.log(res.data);
          // this.commentData = res.data;
          // this.details=res.data;
        });
        this.newpasswords = "";
      } else {
        this.$Message.info("密码不能为空");
      }
    },
    cancel() {
      this.$Message.info("已取消该操作");
    },
    up_img() {
      this.$Message.info("修改头像");
      this.person_info()
    },
    person_info() {
      this.$axios({
        method: "get",
        url:
          "api/users/me_info?u_id=" + sessionStorage.u_id + ""
      }).then(res => {
        // console.log(res.data[0]);
        this.head_img = res.data[0].headImg;
        this.Credit_score=res.data[0].Credit_score;
      });
    },
  },
  
  mounted() {
    this.person_info();
  },
  components: {
    updata
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.router-link-active{
  background-color:  #fff;
  color: #000  !important;
}
.box {
  width: 100%;
  height: 60px;
  position: relative;
  background-color: rgb(228, 75, 4);
}
.welcome {
  display: none;
  line-height: 60px;
}
.h_img {
  float: left;
  width: 100px;
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 18px;
}
.search{
  float: left;
  width: 35%;
  margin-left: 20px;
  margin-top: 12px;
}
.icon {
  float: right;
  height: 50px;
  width: 50px;
  margin-top: 5px;
  cursor: pointer;
  display: block;
  margin-right: 3px;
  border-radius: 50%;
}
.nav_list {
  height: 60px;
}
.nav_list .loginout {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #fff;
  line-height: 60px;
  float: right;
  margin-right: 20px;
  cursor: pointer;
}
.nav_list ul {
  float: left;
  list-style: none;
  margin-left: 0px;
}
.nav_list ul li {
  font-size: 14px;
  width: 80px;
  float: left;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  color: #fff;
}
.nav_list ul li .rlink{
    display: block;
    color: #fff;
    margin-left: 1px;
}
.nav_list ul li:hover .rlink{
  background-color: #FFF;
  color: #000 ;
}
@media screen and (max-width: 640px) {
  .box {
    width: 100%;
    margin-bottom: 1px;
  }
  .search{
    display: none;
  }
  .welcome {
    display: block;
    float: left;
    line-height: 60px;
    color: #fff;
    font-size: 15px;
  }
  .nav_list ul {
    display: none;
  }
  .h_img {
    display: none;
  }
  .nav_mobile {
    width: 100%;
    height: 60px;
    display: block !important;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    line-height: 60px;
  }
 
  @media screen and (min-width: 640px) {
  }
}
.nav_mobile {
  height: 60px;
  width: 100%;
  background-color: rgb(255, 255, 255);
}
.nav_mobile ul {
  list-style: none;
}
.nav_mobile ul li {
  font-size: 14px;
  width: 25%;
  float: left;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  color: rgb(139, 136, 136);
  border-top: 1px solid #ccc;
}
</style>
