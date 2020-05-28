import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'

export default {
  name: 'ColumnManage',
  data () {
    return {
      tableData: [{}],
      currentPage3: 2,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogFormVisibleedit: false,
      formedit: {},
      form: {},
      formLabelWidth: '150px',
      id: 0,
      name: '',
      count: 0
    }
  },
  created () {
    this.getclm()
  },
  methods: {
    async getclm () {
      try {
        let dt = await axiosapi.getcolumn()
        if (dt.status === 200 || dt.status === 201) {
          this.tableData = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    addclm () {
      this.form = {}
      this.dialogFormVisible = true
    },
    async addcolumncfm () {
      try {
        let dt = await axiosapi.addcolumn(this.form)
        if (dt.status === 200 || dt.status === 201) {
          this.getclm()
          this.dialogFormVisible = false
          this.$message({
            message: '添加栏目成功！',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleSizeChangeg (val) {
      console.log(`每页a ${val} 条`)
      try {
        let ls = await axi().get('/ops/column?ordering=-created_at&page_size=' + val)
        this.tableData = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChangeg (val) {
      console.log(`当前页a: ${val}`)
      try {
        let ls = await axi().get('/ops/column?ordering=-created_at&page=' + val)
        this.tableData = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    async schange (s) {
      this.id = s.id
      console.log(s)
      if (s.is_show === true) {
        try {
          let ls = await axi().put('/ops/column/' + this.id + '/' + 'active/')
          if (ls.status === 200) {
            console.log(ls)
            this.getclm()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          let ls = await axi().put('/ops/column/' + this.id + '/inactive')
          if (ls.status === 200) {
            console.log(ls)
            this.getclm()
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    async deleteconfirm () {
      try {
        let ls = await axi().delete('/ops/column/' + this.id + '/')
        if (ls.status === 200) {
          this.getclm()
          this.dialogVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.detail)
        } else if (e.request) {
          console.log(e.request)
        } else {
          console.log('Error', e.message)
        }
        this.dialogVisible = false
      }
    },
    async getdetail () {
      try {
        let ls = await axi().get('/ops/column/' + this.id + '/')
        if (ls.status === 200) {
          this.formedit = ls.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async editcolumncfm () {
      try {
        let ls = await axi().patch('/ops/column/' + this.id + '/', this.formedit)
        if (ls.status === 200) {
          console.log(ls)
          this.getclm()
          this.dialogFormVisibleedit = false
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    edit (r) {
      console.log(r)
      this.id = r.id
      this.getdetail()
      this.dialogFormVisibleedit = true
    },
    hddelete (r) {
      console.log(r)
      this.id = r.id
      this.name = r.name
      this.dialogVisible = true
    },
    backTo () {
      this.$router.go(-1)
    }
  }
}
