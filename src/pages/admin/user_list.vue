<template>
  <div class="list">
    <h3 style="text-align:center;">用户列表</h3>
    <Table border :columns="columns12" :data="userlist">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <!-- <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="show(userlist[index].id)"
        >禁用</Button> -->
        <Button type="primary" size="small" @click="edit(index)" >编辑</Button>
        <Button type="error" size="small" @click="remove(userlist[index].id)">删除</Button>
      </template>
    </Table>
    <!-- <Button type="primary" @click="modal1 = true">Display dialog box</Button> -->
        <Modal
          v-model="modal1"
          title="学生信息修改"
          @on-ok="ok()"
          @on-cancel="cancel"
        >
        <Form v-model="list" label-position="right" :label-width="100">
        <FormItem label="姓名">
            <Input disabled v-model="list.stu_name"></Input>
        </FormItem>
        <FormItem label="学号">
            <Input disabled v-model="list.stu_id"></Input>
        </FormItem>
        <FormItem label="联系方式">
            <Input v-model="list.tel"></Input>
        </FormItem>
         <FormItem label="密码">
            <Input v-model="list.passwords"></Input>
        </FormItem>
        <FormItem label="专业">
            <Input v-model="list.major"></Input>
        </FormItem>
         <FormItem label="班级">
            <Input v-model="list.class"></Input>
        </FormItem>
        
    </Form>
        </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      id:"",
      columns12: [
        {
          title: "姓名",
          key: "stu_name"
        },
        {
          title: "学号",
          key: "stu_id"
        },
        {
          title: "性别",
          key: "stu_sex"
        },
        {
          title: "联系方式",
          key: "tel",
          width: 150
        },
        {
          title: "学校",
          key: "school"
        },
        {
          title: "专业",
          key: "major"
        },
        {
          title: "班级",
          key: "class"
        },
        {
          title: "民族",
          key: "nation"
        },
        {
          title: "积分",
          key: "Credit_score"
        },
        {
          title: "Action",
          slot: "action",
          width: 190,
          align: "center"
        }
      ],
      userlist: [
        {
          stu_name: "",
          stu_id: "",
          stu_sex: "",
          tel: "",
          school: "",
          major: "",
          class: "",
          nation: "",
          Credit_score: "",
          id:""
        }],
        list:{

        }
    };
  },
  methods: {
    show(index) { //展示用户信息
      this.$Modal.info({
        title: "用户信息",
        content: `姓名：${this.userlist[index].stu_name}<br>学号：${
          this.userlist[index].stu_id
        }<br>联系方式：${this.userlist[index].tel}`
      });
    },
    remove(index) { //删除用户
    var isremove = confirm("是否要删除");
    if(isremove){
       this.$axios({
        method: "get",
        url: "api/admin/ad_delete_user?id=" + index + ""
      }).then(res => {
        console.log(res.data);
      });
      this.getuserlist();
      this.$Message.info("删除成功");
    }else{
       this.$Message.info("删除失败");
    }
      
    },
    edit(index) {  //编辑用户信息
      console.log(index)
      this.modal1=true;
      this.list=this.userlist[index]
      console.log(this.list)
    },
    getuserlist() {
       this.$axios({
        method: "get",
        url: "api/admin/ad_get_userlist"
      }).then(res => {
        // console.log(res.data);
        this.userlist = res.data;
        // this.list=res.data;
      });
    },
    ok() {
       console.log(this.id)
       this.$axios({
        method: "post",
        url: "api/admin/ad_update_user",
        data:this.list,
      }).then(res => {
        console.log(res.data);
        // this.userlist = res.data;
      });
      this.$Message.info("编辑成功");
    },
    cancel() {
      this.$Message.info("取消操作");
    }
  },
  mounted() {
    this.getuserlist();
    this.list=this.userlist
  }
};
</script>

<style scoped>
.list {
  width: 100%;
}
</style>
