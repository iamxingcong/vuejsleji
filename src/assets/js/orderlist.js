
import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'

export default {
  name: 'OrderList',
  data () {
    return {
      tri: require('@/assets/icons/tri.png'),
      tblist: [],
      keywordsx: '',
      count: 0,
      currentPage1: 1,
      dialogVisibleDel: false,
      uuid: 0,
      name: '',
      status: '',
      pay_method: '',
      created_at__gt: '',
      created_at__lte: '',
      largesmallx: 'xsmx'
    }
  },
  created () {
    this.odlist()
  },
  filters: {
    fil (v) {
      if (!v) {
        return ''
      }
      if (v === 'ALI_QR') {
        return '支付宝'
      } else if (v === 'WECHAT_QR') {
        return '微信'
      } else if (v === 'TRANSFER') {
        return '转账'
      } else if (v === 'OFFLINE') {
        return '线下支付'
      }
      // ALI_QR/WECHAT_QR/TRANSFER/OFFLINE
    },
    filstatus (v) {
      if (!v) {
        return ''
      }
      if (v === 'WAITING') {
        return '待支付'
      } else if (v === 'SUCCEED') {
        return '支付成功'
      } else if (v === 'CANCELED') {
        return '订单取消'
      }
      // WAITING/SUCCEED/CANCELED
    }
  },
  methods: {
    async odlist () {
      try {
        let dt = await axiosapi.orderlist()
        if (dt.status === 200 || dt.status === 201) {
          this.tblist = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    async sodlist () {
      try {
        let dt = await axi().get('/ops/order/?status=' + this.status + '&pay_method=' +
        this.pay_method + '&created_at__gt=' + this.created_at__gt + '&created_at__lte=' + this.created_at__lte + '&search=' + this.keywordsx)
        if (dt.status === 200 || dt.status === 201) {
          this.tblist = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    async handleSizeChange (val) {
      try {
        let ls = await axi().get('/ops/order?ordering=-created_at&page_size=' + val)
        if (ls.status === 200) {
          this.tblist = ls.data.results
          this.count = ls.data.count
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    async handleCurrentChange (val) {
      try {
        let ls = await axi().get('/ops/order?ordering=-created_at&page=' + val)
        if (ls.status === 200) {
          this.tblist = ls.data.results
          this.count = ls.data.count
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    async searchorder () {

    },
    handleSelectionChange (v) {
      console.log(v)
    },
    checks (v) {
      console.log(v)
      let routeData = this.$router.resolve({path: 'OrderDetail', query: {'uuid': v}})
      window.open(routeData.href, '_blank')
    },
    deletex (v) {
      console.log(v)
      if (v.status === 'CANCELED') {
        this.uuid = v.uuid
        this.name = v.music_infos[0].name
        this.dialogVisibleDel = true
      } else {
        this.$message.success('订单状态不允许删除')
      }
    },
    async delcfm () {
      try {
        let ls = await axi().delete('/ops/order/' + this.uuid)
        if (ls.status === 200) {
          this.dialogVisibleDel = false
          this.$message.success('删除成功')
          this.odlist()
        }
      } catch (e) {
        this.dialogVisibleDel = false
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    statusx (v) {
      this.status = v
      console.log(v)
      this.sodlist()
    },
    paym (x) {
      this.pay_method = x
      this.sodlist()
    },
    dateFormat (date) {
      let fmt = 'YYYY-mm-dd HH:MM'
      let ret
      let opt = {
        'Y+': date.getFullYear().toString(),        // 年
        'm+': (date.getMonth() + 1).toString(),     // 月
        'd+': date.getDate().toString(),            // 日
        'H+': date.getHours().toString(),           // 时
        'M+': date.getMinutes().toString(),         // 分
        'S+': date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    orderstt () {
      this.created_at__gt = this.dateFormat(this.created_at__gt)
      console.log(this.created_at__gt)
      this.sodlist()
    },
    ordersttover () {
      this.created_at__lte = this.dateFormat(this.created_at__lte)
      console.log(this.created_at__lte)
      this.sodlist()
    },
    smlg () {
      this.largesmallx = 'lglg'
    },
    smsmx () {
      // this.largesmallx = 'xsmx'
    },
    searchxt () {
      this.uuid = this.keywordsx
      this.sodlist()
    }
  }
}
