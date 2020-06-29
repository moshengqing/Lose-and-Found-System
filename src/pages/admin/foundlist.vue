<template>
  <div class="list">
    <h3 style="text-align:center;">失物列表</h3>
    <Table border :columns="columns12" :data="lose_list">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(lose_list[index].goods_id)">查看</Button>
        <Button type="error" size="small" @click="remove(lose_list[index].goods_id)">删除</Button>
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
          key: "lose_name",
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
          title: "发布者id",
          key:"loser_id"

        },
        {
          title: "发布者姓名",
          key: "loser_name",
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
      lose_list: [
        {
          goods_id: "",
          lose_name: "",
          category: "",
          goods_status: "",
          publish_time: "",
          loser_id: "",
          loser_name: "",
          contact_way: "",
          place: ""
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      var isremove = confirm("是否要删除");
      if(isremove){
        this.$axios({
        method: "get",
        url: "api/admin/ad_delete_lose?id="+index+""
      }).then(res => {
          console.log(res.data)
      });
        this.get_lose_list();
        this.$Message.info('删除成功');
      }
      else{
         this.$Message.info('删除失败');
      }

    },
    get_lose_list() {
      this.$axios({
        method: "get",
        url: "api/users/lose_list"
      }).then(res => {
        console.log(res.data);
        this.lose_list=res.data
      });
    }
  },
  mounted() {
    this.get_lose_list();
  }
};
</script>

<style scoped>
.list {
  width: 100%;
}
</style>
