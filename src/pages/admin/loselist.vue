<template>
  <div class="list">
    <h3 style="text-align:center;">拾物列表</h3>
    <Table border :columns="columns12" :data="pick_list">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(pick_list[index].goods-id)">查看</Button>
        <Button type="error" size="small" @click="remove(pick_list[index].goods_id)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns12: [
        {
          title: "物品id",
          key: "goods_id",
          
        },
        {
          title: "物品名称",
          key: "pick_name",
          
        },
        {
          title: "类别",
          key: "category",
          
        },
        {
          title: "状态",
          key: "goods_status",
          
        },
        {
          title: "捡拾地点",
          key: "place",
        },
        {
          title: "捡拾者id",
          key: "picker_id",
          
        },
        {
          title: "捡拾姓名",
          key: "picker_name",
          
        },
         {
          title: "联系方式",
          key: "contact_way",
        },
        {
          title: "发布时间",
          key: "publish_time",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      pick_list: [
        {
          goods_id: "",
          pick_name: "",
          category: "",
          goods_status: "",
          picker_id: "",
          picker_name: "",
          picker_name: "",
          place:"",
          contact_way:"",
          publish_time:''
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.pick_list[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.pick_list[index].address}`
      });
    },
    remove(index) {
      var isremove = confirm("是否要删除");
      if(isremove){
        this.$axios({
        method: "get",
        url: "api/admin/ad_delete_pick?id="+index+""
      }).then(res => {
          console.log(res.data)
      });
      this.get_pick_list();
      this.$Message.info('删除成功');
      }else{
        this.$Message.info('删除失败');
      }

    },
    get_pick_list() {
      this.$axios({
        method: "get",
        url: "api/users/pick_list"
      }).then(res => {
          console.log(res.data)
          this.pick_list=res.data;
      });
    }
  },
  mounted(){
      this.get_pick_list()
  }
};
</script>

<style scoped>
.list {
  width: 100%;
}
</style>
