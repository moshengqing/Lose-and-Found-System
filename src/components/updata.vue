<template>
  <div>
    <span @click="modal = true" type="primary">
      <slot></slot>
    </span>
    <Modal
      title="物品发布"
      v-model="modal"
      :styles="{top: '20px'}"
      :mask-closable="false"
      :closable="false"
      ok-text="关闭"
      @on-ok="close"
    >
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
        <FormItem label="所属类别" class="input" prop="classify">
          <Select v-model="formItem.classify">
            <Option value="失物招领">失物招领</Option>
            <Option value="寻物启事">寻物启事</Option>
          </Select>
        </FormItem>
        <FormItem label="物品名称" class="input" prop="name">
          <Input v-model="formItem.name" placeholder="请输入具体名称"></Input>
        </FormItem>
        <FormItem label="发布地点" class="input" prop="place">
          <Input v-model="formItem.place" placeholder="地点"></Input>
        </FormItem>
        <FormItem label="联系电话" class="input" prop="user_tel">
          <Input v-model="formItem.tel" placeholder="请输入联系电话"></Input>
        </FormItem>
        <FormItem label="描述" class="input" prop="desc">
          <Input v-model="formItem.desc" placeholder="请输入具体描述"></Input>
        </FormItem>
        <Upload
          :show-upload-list="isList"
           type="drag"
           action="api/users/updatawithimg"
          :on-success="handleSuccess"
          :on-error="error"
          :multiple="false"
          :format="['jpg','jpeg','png','gif']"
          :data="this.formItem"
        >
          <div style="padding:10px;">
            <Icon type="ios-cloud-upload" style="color:#3399ff"></Icon>
            <p>点击上传物品图片(仅支持一张)</p>
          </div>
        </Upload>
        <Button type="success" :disabled="dispaly" @click="Submit" long>提交</Button>
      </Form>
    </Modal>
  </div>
</template>
<script>
import "../base.css";
export default {
  name: "updata",
  data() {
    return {
      isimg:false,
      isList: true,
      test: "",
      modal: false,
      dispaly:  true,
      img: "",
      formItem: {
        name: "",
        place: "",
        tel: "",
        desc: "",
        classify: "",
        u_id: sessionStorage.u_id,
        u_name: sessionStorage.u_name
      },
      ruleValidate: {
        name: [{ required: true, message: "不能为空！！", trigger: "blur" }],
        place: [{ required: true, message: "不能为空！！", trigger: "blur" }],
        user_tel: [
          { required: true, message: "不能为空！！", trigger: "blur" }
        ],
        desc: [{ required: true, message: "不能为空！！", trigger: "blur" }],
        classify: [{ required: true, message: "请选择类别", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.person_info();
  },
  computed: {},
  methods: {
    handleSuccess(res, file) {
      this.img = file;
      setTimeout(() => {
        this.$Message.success("图片加载成功");
        this.dispaly = false;
        this.isimg = true;
      }, 1500);
    },
    error() {
       this.$Message.error("格式错误");
    },
    Submit() {
      if (
        this.formItem.name == "" ||
        this.formItem.place == "" ||
        this.formItem.classify == ""
      ) {
        this.$Message.success("数据不能为空");
        return;
      }
      else{
        setTimeout(() => {
        this.$Message.success("发布成功");
        (this.list = null), (this.modal = true);
        this.dispaly = true;
        this.formItem = {};
        this.isList = false;
      }, 600);
      }
     
    },
    // 个人信息
    person_info() {
      this.$axios({
        method: "get",
        url:
          "api/users/me_info?u_id=" + sessionStorage.u_id + ""
      }).then(res => {
        // console.log(res.data);
        this.formItem.tel = res.data[0].tel;
        // console.log(this.tel);
      });
    },
    close() {
      this.formItem = {};
      this.isList = false;
    }
  }
};
</script>

<style lang="">
@media screen and (max-width: 600px) {
  .input {
    margin: 17px;
  }
}
.input {
}
</style>