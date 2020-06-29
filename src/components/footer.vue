<template>
    <div class="footer">
      <p>注意：如果有发现冒领，诈骗等行为，欢迎举报！</p>
      <p>举报方式：13017482625 或者 2623903006@qq.com</p>
    </div>
</template>

<script>
export default {
  name: 'nav_box',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{
    width: 100%;
    min-height: 1rem;
    background-color:#fff;
    text-align: center;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 60px;
}
.footer{
    color: rgb(44, 44, 44);
    display: block;
}
@media screen and( max-width:600px){
    .footer{
      
    }
}
</style>
