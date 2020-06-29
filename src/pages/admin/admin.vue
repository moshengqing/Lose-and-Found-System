<template>
  <div class="admin">
    <div class="head">
      <h3>失物招领在线管理系统</h3>
       <span href="#" class="adname">{{ad_name}},你好！</span>
      <Avatar class="icon" icon="ios-person" size="large"/>
      <a @click="loginOut" class="out" href="#">Login out</a>
    </div>
    <div class="main">
      <div class="aside">
        <Menu active-name="1-1" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-people"/>用户管理
            </template>
            <MenuItem name="1-1">
              <p @click="list">用户列表</p>
            </MenuItem>
            <MenuItem name="1-2">
              <p @click="add_user">添加用户</p>
            </MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats"/>统计分析
            </template>
            <MenuItem name="3-1">
              <p @click="lose">捡拾物品列表</p>
            </MenuItem>
            <MenuItem name="3-2">
              <p @click="found">遗失物品列表</p>
            </MenuItem>
            <MenuItem name="3-3">
              <p @click="chart">Chart分析</p>
            </MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-paper"/>管理员功能
            </template>
            <MenuItem name="2-1">
              <p @click="modal1=true">发布系统公告</p>
            </MenuItem>
            <MenuItem name="2-2"> <updata>物品发布</updata></MenuItem>
            <MenuItem name="2-3">修改资料</MenuItem>
          </Submenu>
        </Menu>
        <!-- 通知模板框 -->
        <div>
          <Modal
            v-model="modal1"
            title="系统公告发布"
            @on-ok="push_notice"
            @on-cancel="cancel"
          >
             <Input  :autofocus="true" v-model="notice" maxlength="100" show-word-limit type="textarea" placeholder="请写入要发布的通知信息"  />
          </Modal>
        </div>
      </div>
      <div class="left">
        <router-view name="user_list"></router-view>
        <router-view name="add_user"></router-view>
        <router-view name="loselist"></router-view>
        <router-view name="foundlist"></router-view>
        <!-- <router-view name="sucesse"></router-view> -->
        <router-view name="chart"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import updata from "../../components/updata";
export default {
  name: "admin",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      transitionName: "",
      modal1:false,
      notice:'',
      ad_name:sessionStorage.ad_name
    };
  },
  components:{
      updata,
  },
  methods: {
    list() {
      this.$router.push({ path: "/admin/user_list" });
    },
    add_user() {
      this.$router.replace({ path: "/admin/add_user" });
    },
    lose() {
      this.$router.replace({ path: "/admin/loselist" });
    },
    found() {
      this.$router.replace({ path: "/admin/foundlist" });
    },
    // sucesse() {
    //   this.$router.replace({ path: "/admin/sucesse" });
    // },
    chart() {
      this.$router.replace({ path: "/admin/chart" });
    },
    loginOut() {
      sessionStorage.removeItem("ad_id");
      this.$router.push({ path: "/" });
    },
    push_notice() {
       if(this.notice==''){
         this.$Message.error('数据不能为空');
         return; } this.$axios({ method: "post",
        url:"api/admin/push_notice",
        data:{
           notice:this.notice,ad_id:sessionStorage.ad_id,ad_name:sessionStorage.ad_name
        }
        }).then(res => {
            console.log(res.data);
        }); this.notice=''; this.$Message.info('发布成功');
    },
    cancel(){
       this.$Message.info('取消操作');
    }
  },
  mounted() {
    this.list();
    if (sessionStorage.ad_id == undefined) {
      alert("未登录");
      this.$router.push({ path: "/" });
    }
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  width: 100%;
  height: 60px;
  background-color: rgb(228, 75, 4);
}
.head h3 {
  float: left;
  line-height: 60px;
  margin-left: 40px;
  color: #fff;
}
.head .icon {
  float: right;
  cursor: pointer;
  margin-right: 60px;
  margin-top: 10px;
}
.adname{
  line-height: 60px;
  color: #fff;
  margin-left: 30px;
}
.head .out {
  float: right;
  margin-right: 15px;
  color: #fff;
  line-height: 60px;
}
.main {
  display: flex;
}
.main .aside {
  flex: 1;
  height: 600px;
  background-color: #fff;
}
.main .left {
  flex: 6;
  width: 1000px;
  background-color: #fff;
}
/* .slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {

  transform: translate3d(-100%, 0, 0);
}
.slide-left-enter {

  transform: translate3d(-100%, 0, 0);
}
.slide-left-leave-active {

  transform: translate3d(-100%, 0, 0);
} */
</style>
