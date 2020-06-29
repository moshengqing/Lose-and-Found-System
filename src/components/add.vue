<template>
    <div class="index_container">
      <div class="add">
         <ul>
          <li @click="modal10 = true">发布拾物</li>
          <li @click="modal10 = true">发布失物</li>
          <li @click="info">发布寻人</li>
          <li @click="info">发布寻宠</li>
         </ul>
      </div>
      <!-- 模态框 -->
       <Modal
        title="失物发布"
        v-model="modal10"
        :styles="{top: '20px'}">
        <Form :model="formItem" :label-width="80" >
        <FormItem label="物品名称">
            <Input v-model="formItem.input" placeholder="请输入具体名称"></Input>
        </FormItem>
        <FormItem label="发布地点">
             <Input v-model="formItem.input" placeholder="地点"></Input>
        </FormItem>
        <FormItem label="联系电话">
              <Input v-model="formItem.input" placeholder="请输入联系电话"></Input>
        </FormItem>
         <FormItem label="描述">
            <Input v-model="formItem.input" placeholder="请输入具体描述"></Input>
        </FormItem>
        <FormItem label="所属类别">
            <Select v-model="formItem.select">
                <Option value="beijing">失物招领</Option>
                <Option value="shanghai">寻物启事</Option>
                <Option value="shenzhen">其他</Option>
            </Select>
        </FormItem>
        <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding:10px;">
            <Icon type="ios-cloud-upload"  style="color: #3399ff"></Icon>
            <p>点击上传物品图片</p>
        </div>
    </Upload>
        </Form>
    </Modal>
    </div>
</template>

<script>
import '../base.css'
export default {
  name: 'nav_box',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      modal10: false,
       formItem: {
        input: '',
        select: '',
       }
    }
  },
  methods:{
     info () { this.$Message.info('功能暂未开通!'); }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add{
   margin:0 auto;
   width: 100%;
   height: 0.833rem;
}
.add ul{
  list-style: none;
   display: flex;
   justify-content:space-around;
   flex-wrap: wrap;
}
.add ul li{
  width: 20%;
  font-size: 0.28333rem;
  text-align: center;
  line-height: 0.83333rem;
  background-color: cadetblue;
  color: #FFF;
  cursor: pointer;
  border-radius: 3px;
}
.add ul li:hover{
    -webkit-tap-highlight-color:rgba(2.255.255.0.5);
}
</style>
