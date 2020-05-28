import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'

export default {
  name: 'NoticeCreate',
  data () {
    return {
      form: {},
      columnlst: [],
      checkList: [],
      id: 0
    }
  },
  created () {
    this.getclm()
    this.msgdetail(this.$route.query.id)
  },
  methods: {
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
    async msgdetail (x) {
      try {
        let ls = await axi().get('/ops/message/' + x)
        this.form = ls.data
        this.form.column_id = ls.data.id
        // this.form.type = ls.data.status
      } catch (e) {
        console.log(e)
      }
    },
    async save () {
      try {
        let dt = await axi().put('/ops/message/' + this.$route.query.id, this.form)
        if (dt.status === 200 || dt.status === 201) {
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
