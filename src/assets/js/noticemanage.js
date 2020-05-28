import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'NoticeManage',
  data () {
    return {
      input1: '',
      value: '',
      valuea: '',
      value1: '',
      form: {},
      tableData: [],
      currentPage3: 1,
      columnlst: [],
      count: 0,
      dialogVisible: false,
      column: {
        id: '',
        name: ''
      },
      status: '',
      title: '',
      id: 0,
      largesmallx: 'xsmx',
      search: ''
    }
  },
  created () {
    this.messagel()
    this.columnsch()
  },
  filters: {
    stfil (v) {
      if (!v) {
        return ''
      }
      if (v === 'WAITING') {
        return '等待发送'
      } else if (v === 'SENT') {
        return '已发送'
      } else if (v === 'REVERT') {
        return '已撤回'
      } else {
        return '--'
      }
    }
  },
  methods: {
    async columnsch () {
      try {
        let dt = await axiosapi.columnsearch()
        if (dt.status === 200 || dt.status === 201) {
          this.columnlst = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    async messagel () {
      try {
        let dt = await axi().get('/ops/message?ordering=-updated_at&column_id=' +
         this.column.id + '&status=' + this.status + '&search=' + this.search)
        if (dt.status === 200 || dt.status === 201) {
          this.tableData = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    async sents (x) {
      console.log(x)
      try {
        let ls = await axi().put('/ops/message/' + x.id + '/publish/')
        if (ls.status === 200) {
          this.$message({
            message: '通知发布成功',
            type: 'success'
          })
          this.messagel()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleSizeChange (val) {
      console.log(`每页a ${val} 条`)
      try {
        let ls = await axi().get('/ops/message?ordering=-updated_at&page_size=' + val)
        this.tableData = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChange (val) {
      console.log(`当前页a: ${val}`)
      try {
        let ls = await axi().get('/ops/message?ordering=-updated_at&page=' + val)
        this.tableData = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    checkNotice (x) {
      let routeData = this.$router.resolve({path: 'NoticeDetail', query: {'id': x.id}})
      window.open(routeData.href, '_blank')
    },
    editNotice (x) {
      let routeData = this.$router.resolve({path: 'NoticeEdit', query: {'id': x.id}})
      window.open(routeData.href, '_blank')
    },
    deleteNotice (f) {
      console.log(f)
      this.id = f.id
      this.title = f.title
      this.dialogVisible = true
    },
    async deleteconfirm () {
      try {
        let ls = await axi().delete('/ops/message/' + this.id)
        if (ls.status === 200) {
          this.messagel()
          this.dialogVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.$message.error(e.response.data.detail)
          this.dialogVisible = false
        } else if (e.request) {
          console.log(e.request)
        } else {
          console.log('Error', e.message)
        }
      }
    },
    createNotice () {
      let routeData = this.$router.resolve({path: 'NoticeCreate'})
      window.open(routeData.href, '_blank')
      console.log('新增信息')
    },
    uuidinput (v) {
      console.log(v)
    },
    sclickitem (e) {
      e === this.column ? this.column = '' : this.column = e
      console.log(this.column)
      if (this.column !== '')  {
        this.column = this.column
        this.messagel()
      } else {
        this.messagel()
      }
    },
    mstatus (v, x) {
      this.status = v
      this.messagel()
    },
    smlg () {
      this.largesmallx = 'lglg'
    },
    smsmx () {
      // this.largesmallx = 'xsmx'
    },
    searchk () {
      this.messagel()
    }
  }
}
