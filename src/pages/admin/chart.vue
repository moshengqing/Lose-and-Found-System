<template>
  <div>
    <h3 style="text-align:center">失物招领</h3>
    <div id="myChart" :style="{width: '100%', height: '300px',margin:'20px'}"></div>
    <h3 style="text-align:center">寻物启示</h3>
    <div id="myChart1" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        series: [
          {
            name: "失物招领",
            type: "pie",
            radius: "55%",
            data: [
              { value: 2, name: "未领取" },
              { value: 27, name: "已领取" },
              { value: 31, name: "认领中" }
            ]
          }
        ]
      });
      myChart1.setOption({
        series: [
          {
            name: "寻物启示",
            type: "pie",
            radius: "55%",
            data: [
              { value: 2, name: "已找到" },
              { value: 23, name: "未找到" },
            ]
          }
        ]
      });
    }
  }
};
</script>
