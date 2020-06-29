<template>
  <div>
    <nav_h></nav_h>
    <div class="index_container">
      <div class="class_box">
        <div class="content">
          <h3
            style="font-size:16px; padding:10px;border-bottom:1px solid #ccc;text-align:center;"
          >失物招领</h3>
          <ul v-for=" (item,key) in pick_goods" :key="key">
            <li>
              <div class="img_box">
                <img @click="jup(item.goods_id,item.category)" :src="img_src+item.goods_img" alt>
              </div>
              <div class="detail">
                <p class="title">
                  <a
                    href="javascript:void(0)"
                    @click="jup(item.goods_id,item.category)"
                  >描述详细: {{item.pick_desc}}</a>
                </p>
                <p>物品id： {{item.goods_id}}</p>
                <p>名称： {{item.pick_name}}</p>
                <p style="color:red;">状态：{{item.goods_status}}</p>
                <p>地点：{{item.place}}</p>
                <p>发布时间：{{item.publish_time}}</p>
                <p>信息类型：{{item.category}}</p>
              </div>
            </li>
          </ul>
          <div style="text-align:center;padding:10px;font-size:14px;">
            <Page   :page-size='1' 	 :total="1"/>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import nav_h from "../../components/nav_h";
import foot from "../../components/footer";
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      value1: "1",
      onepage:"",
      pick_goods: "", // 所有数据
      total:0,//共几页
      pageNum:3 ,//一页5条
      pso:[10, 20, 30, 40],
      img_src: "api/static/upload/"
    };
  },
  components: {
    nav_h,
    foot
  },
  methods: {
    jup(key, classify) {
      this.$router.push({
        path: "/user/detail",
        query: {
          id: key,
          classify: classify
        }
      });
      console.log(key, classify);
    },

    isLogin() {
      if (sessionStorage.u_id == undefined) {
        this.$router.replace("./");
        alert("未登录");
      }
    },
    //物品渲染
    pick_render() {
      this.$axios({
        method: "get",
        url: "api/users/pick_list"
      }).then(res => {
        console.log(res.data);
        this.pick_goods = res.data;
        this.total=this.pick_goods.length;
        console.log("总共"+this.total);
        console.log("页数"+Math.ceil(this.total/this.pageNum));
      });
    },
    // page(index){
    //    alert(index);
    //    this.onepage = this.pick_goodsthis[index]
    // }
  },
  mounted() {
    this.isLogin();
    this.pick_render();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.class_box {
  width: 100%;
  background-color: #fff;
}
.w {
  width: 50%;
  height: 100%;
}
.class_box .content {
  width: 100%;
  margin-bottom: 5px;
}
.content ul {
  list-style: none;
}
.content ul li {
  width: 100%;
  padding: 10px;
  max-height: 170px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.content ul li .img_box {
  flex: 1;
  background-color: #fff;
}
.content ul li .img_box img {
  width: 200px;
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
  padding: 10px;
  overflow: hidden;
}
.detail .title {
  font-size: 13px;
}
.detail p {
  font-size: 13px;
}
</style>
