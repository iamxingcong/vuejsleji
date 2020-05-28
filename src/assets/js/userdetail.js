
import axi from '@/config/axi'
export default {
  name: 'UserDetail',
  data () {
    return {
      img: require('../../assets/icons/logo.png'),
      tableData: [],
      tableDatab: [],
      tableDatad: [],
      tableDatae: [],
      tableDataf: [],
      tableDatag: [],
      currentPage5: 1,
      inputa: '',
      inputb: '',
      inputc: '',
      inputd: '',
      inpute: '',
      inputf: '',
      currentPage3: 1,
      currentPage4: 1,
      uuid: '',
      udata: {},
      ocount: 0,
      pcount: 0,
      scount: 0,
      orderdt: [],
      dcount: 0,
      createprodialogVisible: false,
      form: {}
    }
  },
  created () {
    this.uuid = this.$route.query.uuid
    this.detail()
    this.userproject()
    this.userorder()
    this.ustatics()
    this.userdownload()
  },
  filters: {
    filorstats (v) {
      if (!v) {
        return '---'
      } else if (v === 'SUCCEED') {
        return '已支付'
      } else if (v === 'APPLY_REFUND') {
        return '退款申请中'
      } else if (v === 'PAYING') {
        return '支付中'
      } else if (v === 'REFUNDING') {
        return '退款处理中'
      } else if (v === 'REFUNDED') {
        return '已退款'
      } else if (v === 'FINISHED') {
        return '已完成'
      } else if (v === 'WAITING') {
        return '待支付'
      }
    },
    filterspaymethods (v) {
      if (!v) {
        return '--'
      } else if (v === 'ALI_QR') {
        return '支付宝'
      } else if (v === 'OFFLINE') {
        return '线下支付'
      } else if (v === 'WECHAT_QR') {
        return '微信'
      } else if (v === 'TRANSFER') {
        return '银行转账'
      }
    }
  },
  methods: {
    async ustatics () {
      try {
        let dt = await axi().get('/ops/user/' + this.uuid + '/statistics')
        if (dt.status === 200) {
          this.tableData.push(dt.data)

        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async detail () {
      try {
        let dt = await axi().get('/ops/user/' + this.uuid)
        if (dt.status === 200) {
          this.udata = dt.data
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async userproject () {
      try {
        let dp = await axi().get('/ops/user/' + this.uuid + '/project/')
        if (dp.status === 200) {
          this.pcount = dp.data.count
          this.tableDatab = dp.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async userorder () {
      try {
        let dr = await axi().get('/ops/user/' + this.uuid + '/order/')
        if (dr.status === 200) {
          this.orderdt = dr.data.results
          this.ocount = dr.data.count
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async userdownload () {
      try {
        let dp = await axi().get('/ops/user/' + this.uuid + '/download/')
        if (dp.status === 200) {
          this.dcount = dp.data.count
          this.tableDatad = dp.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChangeProject (val) {
      console.log(`每页a ${val} 条`)
      try {
        let dp = await axi().get('/ops/user/' + this.uuid + '/project/?page=' + val)
        if (dp.status === 200) {
          this.pcount = dp.data.count
          this.tableDatab = dp.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChangeOrder (val) {
      console.log(`当前页a: ${val}`)
      try {
        let dr = await axi().get('/ops/user/' + this.uuid + '/order/?page=' + val)
        if (dr.status === 200) {
          this.orderdt = dr.data.results
          this.ocount = dr.data.count
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChangeDownload (val) {
      console.log(`每页a ${val} 条`)
      try {
        let dp = await axi().get('/ops/user/' + this.uuid + '/download/?page=' + val)
        if (dp.status === 200) {
          this.dcount = dp.data.count
          this.tableDatad = dp.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChangeLoginlog (val) {
      console.log(`当前页a: ${val}`)
    },
    backTo () {
      this.$router.go(-1)
    },
    edituser () {
      this.$router.push({
        path: 'UserEdit',
        query: {'uuid': this.uuid}
      })
    },
    loglog (v) {
      let routeData = this.$router.resolve({path: 'LoginLog', query: {'uuid': v.uuid}})
      window.open(routeData.href, '_blank')
    },
    orddertDetail (v) {
      let routeData = this.$router.resolve({path: 'OrderDetail', query: {'uuid': v.uuid}})
      window.open(routeData.href, '_blank')
    },
    projectDetail (v) {
      console.log(v)
      let routeData = this.$router.resolve({path: 'ProjectList', query: {'uuid': v.uuid, 'desc': v.desc, 'name': v.name}})
      window.open(routeData.href, '_blank')
    },
    MusicDetail (v) {
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': v.music_id}})
      window.open(routeData.href, '_blank')
    },
    createProject () {
      this.createprodialogVisible = true
    },
    async createprodialogVisiblecfm () {
      console.log(this.form)
      try {
        let dt = await axi().post('/ops/user/' + this.$route.query.uuid + '/project_create', {
          "name": this.form.name,
          'desc': this.form.desc,
          'type': this.form.type
        })
        if (dt.status === 201) {
          this.createprodialogVisible = false
          this.$message.success("创建成功")
          this.userproject()
          this.form = {}
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
