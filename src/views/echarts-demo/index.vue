<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div style="width: 600px;height:400px;" ref="main"></div>
    <div style="width: 800px;height:500px;" ref="main2"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  methods: {
    // loadDemo1 () {
    //   // 如果需要在初始化的时候获取操作DOM ,写在mounted
    //   // 1.基于准备好的dom，初始化echarts实例
    //   var myChart = echarts.init(this.$refs.main)

    //   // 2.指定图表的配置项和数据
    //   var option = {
    //     title: {
    //       text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     legend: {
    //       data: ['销量123']
    //     },
    //     xAxis: {
    //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [{
    //       name: '销量123',
    //       type: 'bar',
    //       data: [10, 20, 36, 20, 2, 20]
    //     }]
    //   }

    //   // 3.使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option)
    // },
    loadDemo2 () {
      // 如果需要在初始化的时候获取操作DOM ,写在mounted
      // 1.基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main2)

      // 2.指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直达', selected: true },
              { value: 679, name: '营销广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: '直达' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1048, name: '百度' },
              { value: 251, name: '谷歌' },
              { value: 147, name: '必应' },
              { value: 102, name: '其他' }
            ]
          }
        ]
      }

      // 3.使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    loadDemoDemoWithApiData () {
      // 如果需要在初始化的时候获取操作DOM ,写在mounted
      // 1.基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)

      // 2.指定图表的配置项和数据
      this.$axios({
        method: 'GET',
        url: 'http://localhost:3000/demo1'
      }).then(res => {
        myChart.setOption(res.data)
      })

      // 3.使用刚指定的配置项和数据显示图表。
      // myChart.setOption(option)
    }
  },
  mounted () {
    // 先画好轮廓,然后再等待数据更新
    this.loadDemoDemoWithApiData()
    // this.loadDemo2()
  }
}
</script>

<style>

</style>
