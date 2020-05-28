import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'PriceAuthorizeType',
  data () {
    return {
      price: 2333232,
      AdddialogVisible: false,
      dialogVisibleDel: false,
      RevisedialogVisible: false,
      formLabelWidth: '100px',
      dlist: [],
      form: {},
      multipleSelection: [],
      count: 0,
      currentPage1: 1,
      uuid: '',
      name: '',
      eform: {}
    }
  },
  created () {
    this.pri()
  },
  methods: {
    addPrice () {
      this.AdddialogVisible = true
    },
    async pri () {
      try {
        let lis = await axiosapi.priceitemlist()
        if (lis.status === 200) {
          this.dlist = lis.data.results
          this.count = lis.data.count
        }
      } catch (e) {

      }
    },
    async addconfirmed () {
      try {
        let lis = await axiosapi.priceitemadd(this.form)
        if (lis.status === 200 || lis.status === 201) {
          this.AdddialogVisible = false
          this.form = {}
          this.pri()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async reviseconfirmed () {
      try {
        let lis = await axi().put('/ops/price_item/' + this.uuid, this.eform)
        if (lis.status === 200 || lis.status === 201) {
          this.RevisedialogVisible = false
          this.eform = {}
          this.pri()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      } catch (e) {

      }
    },
    revise (x) {
      this.uuid = x.uuid
      console.log(x)
      this.rpri(x.uuid)
    },
    async rpri (v) {
      try {
        let lis = await axiosapi.priceitemlist()
        if (lis.status === 200) {
          for (var i = 0; i < lis.data.results.length; i++) {
            if (lis.data.results[i].uuid === v) {
              this.eform = lis.data.results[i]
              this.RevisedialogVisible = true
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    inputvali () {
      if (this.form.rate > 10 || this.form.rate < 1) {
        this.form.rate = 1
      }
    },
    async handleSizeChange (val) {
      try {
        let ls = await axi().get('/ops/price_item?ordering=-created_at&page_size=' + val)
        if (ls.status === 200) {
          this.dlist = ls.data.results
          this.count = ls.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChange (val) {
      try {
        let ls = await axi().get('/ops/price_item?ordering=-created_at&page=' + val)
        if (ls.status === 200) {
          this.dlist = ls.data.results
          this.count = ls.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    del (v, n) {
      this.uuid = v
      this.name = n
      console.log(v)
      this.dialogVisibleDel = true
    },
    async delcfm () {
      try {
        let ls = await axi().delete('/ops/price_item/' + this.uuid)
        if (ls.status === 200) {
          this.pri()
          this.dialogVisibleDel = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.dialogVisibleDel = false
          this.$message({
            message: e.response.data.detail,
            type: 'error'
          })
        }
      }
    }
  }
}
