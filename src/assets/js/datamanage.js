import MusicListDetail from '@/components/page/subcompo/MusicListDetail.vue'
import DownloadList from '@/components/page/subcompo/DownloadList.vue'
import echarts from 'echarts'
import axiosapi from '@/config/axiosapi'
export default {
  name: 'DataManage',
  data () {
    return {
      statics: [],
      activeName: 'first',
      activeNames: 'first',
      b1: require('../icons/b2.png'),
      b2: require('../icons/b3.png'),
      b3: require('../icons/b4.png'),
      b4: require('../icons/b5.png'),
      times: '',
      timesd: '',
      tt: {
        music_count: 8,
        order_count: 0,
        total_income: 0,
        user_count: 1,
        vip_user_count: 0,
        yesterday_income: 0,
        yesterday_order_count: 0,
        yesterday_visit_count: 0
      },
      myChart: '',
      BmyChart: '',
      Cmychart: '',
      Dmychart: '',
      order_count_total_recordsa: [],
      order_count_total_recordsc: [],
      order_amount_pay_success_recordsa: [],
      order_amount_pay_success_recordsc: [],
      option: {},
      Boption: {},
      Coption: {},
      Doption: {},
      category: [],
      categorya: []
      
    }
  },
  components: {
    MusicListDetail,
    DownloadList
  },
  created () {
    this.datapanel()
  },
  mounted () {
    console.log(this.order_count_total_recordsa)
    console.log(this.order_count_total_recordsc)
    var tx = document.getElementById('chartColumn')
    this.myChart = echarts.init(tx)
    var Btx = document.getElementById('earnChartColumn')
    this.BmyChart = echarts.init(Btx)
    var Ctx = document.getElementById('userCount')
    this.CmyChart = echarts.init(Ctx)
    var Dtx = document.getElementById('hotwordx')
    this.DmyChart = echarts.init(Dtx)
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async datapanel () {
      try {
        const pn = await axiosapi.datapanel()
        if (pn.status === 200) {
          console.log(pn.status)
          this.tt = pn.data
          for (var i = 0; i < pn.data.order_count_total_records.length; i++) {
            this.order_count_total_recordsa.push(pn.data.order_count_total_records[i].order_count)
            this.order_count_total_recordsc.push(pn.data.order_count_total_records[i].created_at)
          }
          for (var r = 0; r < pn.data.order_amount_pay_success_records.length; r++) {
            this.order_amount_pay_success_recordsa.push(pn.data.order_amount_pay_success_records[r].order_amount)
            this.order_amount_pay_success_recordsc.push(pn.data.order_amount_pay_success_records[r].paid_time)
          }
          for (var z = 0; z < pn.data.hot_category_records.length; z++) {
            this.category.push(pn.data.hot_category_records[z].category_info.name)
            this.categorya.push({'name': pn.data.hot_category_records[z].category_info.name, 'value': pn.data.hot_category_records[z].sum_count})
          }
          this.drawLine()
          this.myChart.setOption(this.option)
          this.BdrawLine()
          this.BmyChart.setOption(this.Boption)
          this.CdrawLine()
          this.CmyChart.setOption(this.Coption)
          this.DdrawLine()
          this.DmyChart.setOption(this.Doption)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async totalOrder () {
      this.order_count_total_recordsa = []
      this.order_count_total_recordsc = []
      try {
        const pn = await axiosapi.datapanel()
        if (pn.status === 200) {
          console.log(pn.status)
          this.tt = pn.data
          for (var i = 0; i < pn.data.order_count_total_records.length; i++) {
            this.order_count_total_recordsa.push(pn.data.order_count_total_records[i].order_count)
            this.order_count_total_recordsc.push(pn.data.order_count_total_records[i].created_at)
          }
          this.drawLine()
          this.myChart.setOption(this.option)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async payOrder () {
      this.order_count_total_recordsa = []
      this.order_count_total_recordsc = []
      try {
        const pn = await axiosapi.datapanel()
        if (pn.status === 200) {
          console.log(pn.status)
          this.tt = pn.data
          for (var i = 0; i < pn.data.order_count_total_records.length; i++) {
            this.order_count_total_recordsa.push(pn.data.order_count_pay_success_records[i].order_count)
            this.order_count_total_recordsc.push(pn.data.order_count_pay_success_records[i].created_at)
          }
          this.drawLine()
          this.myChart.setOption(this.option)

        }
      } catch (e) {
        console.log(e)
      }
    },
    drawLine () {
      this.option = {
        color: ['#029D75'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.order_count_total_recordsc,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '订单量',
            type: 'bar',
            barWidth: '12',
            data: this.order_count_total_recordsa
          }
        ]
      }
    },
    BdrawLine () {
      this.Boption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#ccc',
              borderColor: '#aaa',
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              textStyle: {
                color: '#222'
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.order_amount_pay_success_recordsc
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          }
        },
        series: [{
          data: this.order_amount_pay_success_recordsa,
          type: 'line',
          smooth: true,
          color: '#',
          lineStyle: {
            normal: {
              color: '#E48742'
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#E48742'
              },
              {
                offset: 1,
                color: 'rgba(255,255,255,1)'
              }
            ]
            )
          }
        }]
      }
    },
    CdrawLine () {
      this.Coption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['总用户', 'VIP用户']
        },
        color: [ '#DADBE0', '#6269C5', 'yellow', 'green', 'blue', 'indigo', 'purple' ],
        series: [
          {
            name: '用户数',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {value: this.tt.vip_user_count + this.tt.user_count, name: '总用户'},
              {value: this.tt.vip_user_count, name: 'VIP用户'}
            ]
          }
        ]
      }
    },
    DdrawLine () {
      this.Doption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: this.category
        },
        color: [ '#DADBE0', '#6269C5', '#029D75', '#E48742', '#E9D44F', '##D53448', 'purple' ],
        series: [
          {
            name: '热选次数',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.categorya
          }
        ]
      }
    }
  }
}
