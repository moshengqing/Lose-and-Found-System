<template>
  <div class="login_box">
    <div class="login">
      <!-- <h5>失物招领系统</h5>
      <hr>
      <Form :model="formItem" :label-width="80">
        <FormItem label="Role">
          <RadioGroup v-model="formItem.radio">
            <Radio label="学生">学生</Radio>
            <Radio label="管理员">管理员</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="登录账号">
          <Input v-model="formItem.id" placeholder="请输入学号"></Input>
        </FormItem>
        <FormItem label="登录密码">
          <Input type="password" v-model="formItem.passwords" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem>
          <Button long type="primary" @click="login">Login</Button>
        </FormItem>
      </Form> -->
      
      <img src="../assets/logo.jpg" alt="">
      <h2 style="text-align:center;margin-top:20px">贵州财经大学失物招领系统</h2>
      <hr>
      <form action="" :model="formItem">
        <div class="radio_box">
         <label for="" class="radio">普通用户<input v-model="formItem.radio" type="radio" value="学生"  name="role" id=""></label> 
         <label for="" class="radio">管理员<input v-model="formItem.radio" type="radio" value="管理员" name="role" id=""></label> 
        </div>
       <input class="input1" v-model="formItem.id" type="text" name="" id="" placeholder="请输入学号">
       <input class="input1" v-model="formItem.passwords" type="password" name="" id="" placeholder="请输入密码">
       <!-- 角色<input type="checkbox"> -->
      </form>
      <a @click="login" class="submit" href="javascript:;">登 &nbsp; 录</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formItem: {
        id: "",
        passwords: "",
        radio: "学生"
      },
    };
  },
  mounted() {
    this.formItem.id = sessionStorage.save_id;
    this.formItem.passwords = sessionStorage.passwords;
  },
  methods: {
      login() {
      if (this.formItem.id || this.formItem.passwords) {
        //this.$Message.success("可以登录");
        if (this.formItem.radio == "学生") {
          this.$axios.post('api/users/login',this.formItem).then(res => {
            console.log(res.data);
            if (!res.data.length == 0) {
               if(res.data[0].passwords == this.formItem.passwords){
                this.$Message.success("登录成功,页面正在跳转");
                sessionStorage.setItem("u_id", res.data[0].stu_id);
                sessionStorage.setItem("u_name", res.data[0].stu_name);
                sessionStorage.setItem("class", res.data[0].class);
                setTimeout(() => {
                  this.$router.push({ path: "/user/index" });
                }, 2000);
               }else{
                 this.$Message.warning("用户名密码错误");
               }
            }else{
              this.$Message.warning("用户名密码错误");
            }
          });
        } else if (this.formItem.radio == "管理员") {
          this.$axios({
            method: "post",
            url: "api/admin/login",
            data: this.formItem
          }).then(res => {
            console.log(res.data);
            if (!res.data.length == 0) {
              if(res.data[0].passwords == this.formItem.passwords){
                this.$Message.success("登录成功,页面正在跳转");
                sessionStorage.setItem("ad_id", res.data[0].ad_id);
                sessionStorage.setItem("ad_name", res.data[0].ad_name);
                sessionStorage.setItem("ad_pa", res.data[0].passwords);
                setTimeout(() => {
                  this.$router.push({ path: "./admin" });
                }, 2000);
              }else{
                 this.$Message.warning("用户名密码错误");
              }
              
            }else{
              this.$Message.warning("用户名密码错误");
            }
          });
        }
      } else {
        this.$Message.warning("登录数据不能为空");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login_box{
  width: 100%;
  height: 700px;
  background: url(../assets/bg.jpg);
  background-size: auto auto;
}
.login {
  max-width: 400px;
  width: 100%;
  /* height: 300px; */
  font-size: 16px;
  background-color:#fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 30px 0;
  border-radius: 15px;
}
.login img{
  width: 70px;
  height: 50px;
  position: absolute;
  top:0;
  left: 50%;
  transform: translate(-50%,0);
  border-radius: 100%;
}
.login form .input1{
  display: block;
  width: 90%;
  height: 40px;
  font-size: 16px;
  margin: 15px auto;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 700;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color:rgb(216, 231, 245);
  
}
.radio_box{
  width: 90%;
  margin: 0 auto;
}
.login form .radio{
  /* width: 20%; */
  margin-left: 20px;
  font-weight: 700;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  
}
.login form .radio input{
  /* width: 20px;
  height: 20px; */
  margin-left: 5px;
  vertical-align:middle;
  cursor: pointer;
}
.submit{
  display: block;
  width: 90%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  background-color:#2d8cf0;
  margin: 10px auto;
  border-radius: 10px;
}
@media screen and (max-width:540px) {
  .login_box{
    background: none;
    height: 100%;
  }
}
</style>
