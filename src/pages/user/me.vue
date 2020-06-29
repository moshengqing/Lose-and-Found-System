<template>
  <div>
    <nav_h></nav_h>
    <div class="index_container me_box">
      <h3 style="font-size:16px; padding:10px;border-bottom:1px solid #ccc;text-align:center;">个人中心</h3>
      <Collapse v-model="value2" accordion style="font-size:14px; padding:0;">
      <Panel name="1" style="padding:10px;">
        个人信息
      <div slot="content" class="me_info clearfix">
        <ul class="clearfix" v-for="(info,index) in userinfo" :key="index">
          <li>学号：{{info.stu_id||null}}</li>
          <li>姓名：{{info.stu_name}}</li>
          <li>性别：{{info.stu_sex}}</li>
          <li>民族：{{info.nation}}</li>
          <li>学校：{{info.school}}</li>
          <li>学院：{{info.academy}}</li>
          <li>专业：{{info.major}}</li>
          <li>班级：{{info.class}}</li>
          <li>年级：{{info.grade}}</li>
          <li>信誉积分：{{info.Credit_score}}</li>
          <li>联系方式：{{info.tel||nulldata}}</li>
        </ul>
        <div class="edit">
          <Button @click="modal1 = true" type="primary">编辑</Button>
        </div>
        <Modal v-model="modal1" title="个人信息修改" @on-ok="ok" @on-cancel="cancel">
          <span>修改电话号码：</span>
          <Input v-model="newtel" placeholder="请输入新号码" style="width: 300px"/>
        </Modal>
      </div>
       </Panel>
    
        <Panel name="2" style="padding:10px;">
          待认领列表
          <Badge :count="w_num"></Badge>
          <div slot="content" class="history">
            <p v-if="w_num==0">暂无数据</p>
            <ul class="clearfix">
              <li v-for="(w,index) in w_list" :key="index">
                <p class="num">{{index+1}}</p>
                <p>物品id：{{w.goods_id}}</p>
                <p>名称：{{w.pick_name}}</p>
                <p style="color:red;">状态: {{w.goods_status}}</p>
                <p>发布者id:{{w.picker_id}}</p>
                <p style="color:red">联系方式{{w.contact_way}}</p>
                <p>地点：{{w.place}}</p>
                <p>时间：{{w.publish_time}}</p>
              </li>
            </ul>
          </div>
        </Panel>

        <Panel name="3" style="padding:10px;">
          拾物发布历史
          <Badge :count="p_num"></Badge>
          <div slot="content" class="history">
            <p v-if="p_num==0">暂无数据</p>
            <ul class="clearfix">
              <li v-for="(p,index) in p_history" :key="index">
                <p class="num">{{index+1}}</p>
                <p>物品id：{{p.goods_id}}</p>
                <p>名称：{{p.pick_name}}</p>
                <p style="color:red;">状态: {{p.goods_status}}</p>
                <p>地点：{{p.place}}</p>
                <p>时间：{{p.publish_time}}</p>
                <Button style="font-size: 13px;"
                  :disabled="p.goods_status=='已认领'? true:false"
                  @click="confirm(p.goods_id)"
                  long
                  type="primary"
                >确认物品已认领</Button>
              </li>
            </ul>
          </div>
        </Panel>
        <Panel name="4" style="padding:10px;">
          寻物发布历史
          <Badge :count="l_num"></Badge>
          <div slot="content" class="history">
            <p v-if="l_num==0">暂无数据</p>
            <ul class="clearfix">
              <li v-for="(l,index) in l_history" :key="index">
                <p class="num">{{index+1}}</p>
                <p>名称：{{l.lose_name}}</p>
                <p style="color:red;">状态: {{l.goods_status}}</p>
                <p>地点：{{l.place}}</p>
                <p>时间：{{l.publish_time}}</p>
                <Button
                  :disabled="l.goods_status=='已找到'? true:false"
                  long
                  @click="find(l.goods_id)"
                  type="primary"
                >确认已找到</Button>
              </li>
            </ul>
          </div>
        </Panel>

        <Panel name="5" style="padding:10px;">
          班级成员
          <Badge :count="cl_num"></Badge>
          <div slot="content" class="classMate">
            <span
              v-for="(mates,index) in class_mates"
              :key="index"
            >{{mates.stu_name}}{{mates.stu_id}}</span>
          </div>
        </Panel>
      </Collapse>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import nav_h from "../../components/nav_h";
import foot from "../../components/footer";
export default {
  name: "",
  data() {
    return {
      value2: "1",
      modal1:false,
      newtel:'',
      nulldata: "暂无数据",
      com_display: false,
      find_display: false,
      p_history: "",
      l_history: "",
      w_list: "",
      p_num: 0,
      l_num: 0,
      w_num: 0,
      userinfo: {},
      class_mates: "",
      cl_num: 0,
    };
  },
  components: {
    nav_h,
    foot
  },
  mounted() {
    this.isLogin();
    this.pick_history();
    this.lose_history();
    this.wait();
    this.person_info();
    this.get_classmatas();
    // this.count_score();
  },
  methods: {
    isLogin() {
      if (sessionStorage.u_id == undefined) {
        this.$router.replace("./");
        alert("未登录");
      }
    },
    pick_history() {
      this.$axios({
        method: "get",
        url:
          "api/users/pick_history?id=" +
          sessionStorage.u_id +
          ""
      }).then(res => {
        //console.log(res.data)
        this.p_history = res.data;
        this.p_num = this.p_history.length;
      });
    },
    lose_history() {
      this.$axios({
        method: "get",
        url:
          "api/users/lose_history?id=" +
          sessionStorage.u_id +
          ""
      }).then(res => {
        console.log(res.data);
        this.l_history = res.data;
        this.l_num = this.l_history.length;
      });
      
    },
    //待认领
    wait() {
      this.$axios({
        method: "get",
        url:
          "api/users/wait_list?u_id=" + sessionStorage.u_id + ""
      }).then(res => {
        console.log(res.data);
        this.w_list = res.data;
        this.w_num = this.w_list.length;
        console.log(this.w_num);
      });
    },
    // 个人信息
    person_info() {
      this.$axios({
        method: "get",
        url:
          "api/users/me_info?u_id=" + sessionStorage.u_id + ""
      }).then(res => {
        console.log(res.data);
        this.userinfo = res.data;
      });
    },
    confirm(id) {
      this.$axios({
        method: "get",
        url:"api/users/comfirm?id=" +
          id +"&u_id=" +sessionStorage.u_id +""
      }).then(res => {
        console.log(res.data);
      });
      this.$Message.info('确认认领成功');
      this.pick_history()
    },
    find(id) {
      this.$axios({
        method: "get",
        url:
          "api/users/find?id=" +
          id +"&u_id=" +sessionStorage.u_id +""
      }).then(res => {
        console.log(res.data);
      });
      this.$Message.info('操作成功');
      this.lose_history()
    },
    get_classmatas() {//获取班级成员
      this.$axios({
        method: "get",
        url:
          "api/users/classmates?class=" +
          sessionStorage.class +
          "&u_id=" +
          sessionStorage.u_id +
          ""
      }).then(res => {
        this.class_mates = res.data;
        this.cl_num = this.class_mates.length;
      });
      // alert(localStorage.class);
    },
    ok(){
      if(this.newtel==''){
        this.$Message.error('数据不能为空');
        return;
      }
       this.$axios({
        method: "post",
        url:"api/users/update_tel",
        data:{
          newtel:this.newtel,
          u_id:sessionStorage.u_id
        }
      }).then(res => {
        console.log(res.data);
      });
      this.newtel='';
      this.$Message.info('修改已成功');
    },
    cancel () {
      this.$Message.info('已取消该操作');
     },
     //积分统计
     count_score(){
       this.$axios({
        method: "get",
        url:"api/users/count_score?u_id='"+sessionStorage.u_id+"'"
      }).then(res => {
        console.log(res.data);
      });
     },


  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.me_box {
  width: 100%;
  font-size: 14px;
  background-color: #fff;
  min-height: 500px;
}
.me_info {
  width: 100%;
  background-color: #fff;
  margin-bottom: 3px;
  position: relative;
}
.me_info ul {
  list-style: none;
}
.me_info ul li {
  width: 150px;
  float: left;
  margin-top: 5px;
  margin-left: 5px;
  text-align: center;
  padding: 10px;
  background-color: rgb(224, 224, 224);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 600;
}
.edit {
  position: absolute;
  bottom: 0;
  right: 10px;
}
.me_info ul li:last-child {
  width: 200px;
}
.num {
  width: 20px;
  height: 20px;
  background-color: #2d8cf0;
  float: right;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  margin-right: 10px;
}

.history {
  width: 100%;
}
.history ul {
  width: 95%;
  margin: 0 auto;
  list-style: none;
}
.history ul li {
  width: 200px;
  min-height: 100px;
  float: left;
  margin: 4px 4px;
  box-shadow: 5px 5px 5px #888888;
  padding-top: 4px;
  font-size: 12px;
}
.classMate {
  margin-left: 3px;
  font-size: 14px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 600;
}
.classMate span {
  margin-left: 8px;
  padding: 5px;
}
@media screen and (max-width: 462px) {
  .history ul li {
    width: 100%;
    margin: 4px 4px 0px 0px;
  }
}
@media screen and (max-width: 670px) {
  .history ul li {
    width: 100%;
    margin: 4px 4px 0px 0px;
    border-left: none;
    border-right: none;
    border-top: none;
  }
  .me_info ul li {
    width: 45%;
    padding: 5px;
    margin-left: 12px;
  }
  .me_info ul li:last-child {
  }
}
</style>
