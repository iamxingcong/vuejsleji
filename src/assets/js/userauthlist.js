
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
      uuid: 0,
      name: '',
      status: '',
      pay_method: '',
      created_at__gt: '',
      created_at__lte: '',
      largesmallx: 'xsmx',
      statusName: ''
    }
  },
  created () {
    this.odlist()
  },
  filters: {
    filstatus (v) {
      if (!v) {
        return ''
      }
      if (v === 'WAITING') {
        return '等待授权'
      } else if (v === 'SUCCEED') {
        return '授权成功'
      } else if (v === 'CANCELED') {
        return 'CANCELED'
      } else if (v === 'FAILED') {
        return '授权失败'
      }
    }
  },
  methods: {
    async odlist () {
      try {
        let dt = await axiosapi.userauthlist()
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
        let dt = await axi().get('/ops/certificate/?status=' + this.status + '&search=' + this.keywordsx)
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
        let ls = await axi().get('/ops/certificate?ordering=-created_at&page_size=' + val)
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
        let ls = await axi().get('/ops/certificate?ordering=-created_at&page=' + val)
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
      let routeData = this.$router.resolve({path: 'UserAuthDetail', query: {'uuid': v}})
      window.open(routeData.href, '_blank')
    },
    statusx (v, x) {
      this.status = v
      this.statusName = x
      console.log(v)
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
