<template>
  <div class="list">
    <h4>领取成功</h4>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
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
          width: 80
        },
        {
          title: "物品名称",
          key: "lose_name",
          width: 100
        },
        {
          title: "类别",
          key: "category",
          width: 100
        },
        {
          title: "状态",
          key: "goods_status",
          width: 100
        },
        {
          title: "捡拾地点",
          key: "place",
          width: 100
        },
        {
          title: "发布者id",
          key: "loser_id",
          width: 100
        },
        {
          title: "发布者姓名",
          key: "loser_name",
          width: 120
        },
        {
          title: "联系方式",
          key: "contact_way",
          width: 130
        },
        {
          title: "发布时间",
          key: "publish_time"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data6: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park fsfdsf fdsfs fsafds",
          id: 100
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
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
      this.data6.splice(index, 1);
    },
    get_succese(){
       this.$axios({
        method: "get",
        url: "api/admin/get_success_list"
      }).then(res => {
        console.log(res.data)
      }); 
    }
  },
  mounted(){
      this.get_succese();
  }
};
</script>

<style scoped>
.list {
  width: 100%;
}
</style>
