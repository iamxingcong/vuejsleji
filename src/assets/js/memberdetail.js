
import axi from '@/config/axi'
export default {
  name: 'MemmberDetail',
  data () {
    return {
      img: require('../../assets/icons/logo.png'),
      tableDatab: [],
      currentPage4: 1,
      count: 0,
      detail: {},
      dialogVisible: false,
      name: ''
    }
  },
  created () {
    this.uprofile()
    this.users()
  },
  methods: {
    async uprofile () {
      try {
        let dx = await axi().get('/ops/vip/' + this.$route.query.id)
        if (dx.status === 200) {
          this.detail = dx.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async users () {
      try {
        let dx = await axi().get('/ops/vip/' + this.$route.query.id + '/users/')
        if (dx.status === 200) {
          this.tableDatab = dx.data.results
          this.count = dx.data.count
        }
        console.log(dx.status)
      } catch (e) {
        console.log(e)
      }
    },
    async deleteconfirm () {

    },
    RequestDetail (row) {
      let routeData = this.$router.resolve({path: 'UserDetail', query: {'uuid': row.user_id}})
      window.open(routeData.href, '_blank')
    },
    hddelete (row) {
      console.log(row)
      this.dialogVisible = true
      this.name = row.name
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
