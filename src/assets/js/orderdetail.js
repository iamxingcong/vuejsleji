
import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'OrderDetail',
  data () {
    return {
      uuid: 0,
      dtail: [],
      det: {},
      dialogVisibleRevise: false,
      tri: require('@/assets/icons/tri.png'),
      amountx: 1
    }
  },
  created () {
    console.log(this.$route.query.uuid)
    this.detail(this.$route.query.uuid)
  },
  methods: {
    async detail (x) {
      try {
        let ls = await axi().get('/ops/order/' + x)
        if (ls.status === 200) {
          this.dtail = ls.data.order_items
          this.det = ls.data
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    checks (v) {
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': v}})
      window.open(routeData.href, '_blank')
    },
    async payed (x) {
      // PUT /ops/order/{uuid}/pay_success/
      try {
        let ls = await axi().put('/ops/order/' + x + '/pay_success/')
        if (ls.status === 200) {
          this.detail(x)
          this.$message.success('订单状态修改成功')
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    revisemoney (v) {
      if (this.det.status !== 'WAITING') {
        this.$message.success('只有待支付状态的订单才可修改金额')
        return false
      } else if (this.det.status === 'WAITING') {
        this.dialogVisibleRevise = true
      }
    },
    async revcfm () {
      if (this.amountx.length >= 8) {
        this.$message.success('请确保小数点前不超过 8 个数字')
        return false
      } else {
        try {
          let ls = await axi().put('/ops/order/' + this.$route.query.uuid + '/modify_amount/', {'amount': this.amountx})
          if (ls.status === 200) {
            this.dialogVisibleRevise = false
            this.detail(this.$route.query.uuid)
            this.$message.success('订单费用修改成功')
          }
        } catch (e) {
          if (e.response) {
            this.$message.success(e.response.data.detail)
          }
        }
      }
    }
  }
}
