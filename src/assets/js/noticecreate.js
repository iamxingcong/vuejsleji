import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'

export default {
  name: 'NoticeCreate',
  data () {
    return {
      form: {},
      columnlst: [],
      checkList: [],
      id: 0,
      dialogFormVisible: false,
      formadd: {
        is_show: true
      },
      formLabelWidth: '150px'
    }
  },
  created () {
    this.getclm()
  },
  methods: {
    addclm () {
      this.formadd = {}
      this.dialogFormVisible = true
    },
    async addcolumncfm () {
      this.formadd.is_show = true
      try {
        let dt = await axiosapi.addcolumn(this.formadd)
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
    async getclm () {
      try {
        let dt = await axiosapi.columnsearch()
        if (dt.status === 200 || dt.status === 201) {
          this.columnlst = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    onSubmit () {
      this.savex()
    },
    async sbmit (x) {
      try {
        let ls = await axi().put('/ops/message/' + x + '/publish/')
        if (ls.status === 200) {
          this.$message({
            message: '通知发布成功',
            type: 'success'
          })
          this.$router.push('NoticeManage')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async savex () {
      try {
        let dt = await axiosapi.addmessage(this.form)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.data)
          this.id = dt.data.id
          this.sbmit(dt.data.id)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async save () {
      try {
        let dt = await axiosapi.addmessage(this.form)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.data)
          this.id = dt.data.id
          this.$router.push('NoticeManage')
        }
      } catch (e) {
        console.log(e)
      }
    },
    resets () {
      this.form = {}
    },
    backTo () {
      this.$router.go(-1)
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      console.log(checkedCount)
    }
  }
}
