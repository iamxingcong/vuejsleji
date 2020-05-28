import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'

export default {
  name: 'RequestManage',
  data () {
    return {
      tableDatab: [],
      currentPage4: 1,
      count: 0,
      status: '',
      statusLabel: ''
    }
  },
  filters: {
    optfil (v) {
      if (!v) {
        return ''
      }
      if (v === 'WAITING') {
        return '等待审核'
      } else if (v === 'SUCCEED') {
        return '申请通过'
      } else if (v === 'REJECTED') {
        return '拒绝'
      } else {
        return '--'
      }
    }
  },
  created () {
    this.applyforproject()
  },
  methods: {
    filtx (v, x) {
      if (v === 'all') {
        this.status = ''
      } else {
        this.status = v
      }
      this.statusLabel = x
      this.applyforproject()
      console.log(v, x)
    },
    async applyforproject () {
      try {
        // let dt = await axiosapi.applyforproject()
        let dt = await axi().get('/ops/apply_for_vip/?status=' + this.status)
        if (dt.status === 200) {
          console.log(dt.status)
          this.tableDatab = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        console.log(e.config)
      }
    },
    RequestDetail (row) {
      let routeData = this.$router.resolve({path: 'RequestDetail', query: {'uuid': row.uuid}})
      window.open(routeData.href, '_blank')
    },
    async agree (row) {
      console.log(row)
      try {
        let ls = await axi().put('/ops/apply_for_vip/' + row.uuid + '/agree/')
        if (ls.status === 200) {
          this.applyforproject()
          this.$message({
            message: '通过',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async refuse (row) {
      try {
        let ls = await axi().put('/ops/apply_for_vip/' + row.uuid +'/reject/')
        if (ls.status === 200) {
          this.applyforproject()
          this.$message({
            message: '拒绝成功',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    async handleCurrentChange (val) {
      try {
        let dt = await axi().get('/ops/apply_for_vip/?page=' +  val)
        if (dt.status === 200) {
          console.log(dt.status)
          this.tableDatab = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        console.log(e.config)
      }
    },
    clearstatus () {
      this.status = ''
      this.statusLabel = ''
      this.applyforproject()
    }
  }
}
