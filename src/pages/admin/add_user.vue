<template>
  <div class="add">
      <h3 style="text-align:center;">添加用户</h3>
    <div >
     <Form class="add_user" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="学号" prop="stu_id">
            <Input v-model="formValidate.stu_id"  placeholder="请输入学号"></Input>
        </FormItem>
       <FormItem label="姓名" prop="stu_name">
            <Input v-model="formValidate.stu_name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="性别" prop="gender">
            <Select v-model="formValidate.gender" placeholder="请选择性别">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
            </Select>
        </FormItem>
        <FormItem label="登陆密码" prop="passwords">
            <Input v-model="formValidate.passwords" placeholder="请输入登陆密码"></Input>
        </FormItem>
        <FormItem label="联系方式" prop="tel">
            <Input v-model="formValidate.tel" placeholder="请输入电话号码"></Input>
        </FormItem>
        <FormItem label="专业" prop="major">
            <Input v-model="formValidate.major" placeholder="请输入专业"></Input>
        </FormItem>
        <FormItem label="班级" prop="class">
            <Input v-model="formValidate.class" placeholder="请输入班级"></Input>
        </FormItem>
         <FormItem>
            <Button long type="primary" @click="handleSubmit('formCustom')">添加</Button>
        </FormItem>
       </form>
       </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                 stu_id:'',
                 stu_name:'',
                 passwords:'',
                 class:'',
                 tel:'',
                 major:'',
                 gender:[]
                },
                ruleValidate: {
                    stu_id: [
                        { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    stu_name: [
                        { required: true, message: '不能为空！', trigger: 'blur' },
                    ],
                    passwords: [
                        { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    class: [
                        { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    tel:[
                        { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    major:[
                        { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                     gender:[
                        { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
        handleSubmit (){
        if(this.formValidate.stu_id =='' || this.formValidate.stu_name =='' || this.formValidate.passwords==''||this.formValidate.gender==''){
            this.$Message.error('数据不能为空');
            return;
        }
        this.$axios({
        method: "post",
        url:"api/admin/ad_add_user",
        data:this.formValidate
        }).then(res => {
            console.log(res.data);
        });
        this.$Message.info('添加成功');
        setTimeout(() => {
            this.formValidate={}
        }, 1000);
    },
           
}
}
</script>
<style scoped>
.add_user{
  width: 60%;
  margin: 0 auto;
}
.add{
    width: 95%;
}
</style>
