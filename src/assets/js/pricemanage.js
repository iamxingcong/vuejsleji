import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
import addPrice from '@/components/page/subcompo/addPrice.vue'
import editPrice from '@/components/page/subcompo/editPrice.vue'
export default {
  name: 'PriceManage',
  data () {
    return {
      price: 2333232,
      showx: false,
      showu: false,
      count: 0,
      currentPage1: 1,
      dlist: [],
      editi: '',
      name: '',
      uuid: '',
      dialogVisibleDel: false,
      deluuids: [],
      newx2: [],
      pagesize: 10,
      page: 1,
      value: '',
      choosed: {}
    }
  },
  components: {
    addPrice,
    editPrice
  },
  created () {
    this.pri()
  },
  filters: {
    fil (v) {
      if (!v) {
        return false
      }
      let x = []
      for (var i = 0; i < v.length; i++) {
        x.push(v[i].name)
      }
      return x.toString()
    }
  },
  methods: {
    addPrice () {
      this.showx = true
    },
    async pri () {
      this.choosed = {}
      this.value = ''
      this.newx2 = []
      try {
        // let lis = await axiosapi.pricel()
        let lis = await axi().get('/ops/price/?ordering=-created_at&page_size=' + this.pagesize + '/&page=' + this.page)
        if (lis.status === 200) {
          this.dlist = lis.data.results
          this.count = lis.data.count
          for (var i = 0; i < lis.data.results.length; i++) {
            var ptlist = []
            for (var p = 0; p < this.dlist[i].places.length; p++) {
              for (var t = 0; t < this.dlist[i].times.length; t++) {
                ptlist.push({
                  place_name: this.dlist[i].places[p].name,
                  place_rate: this.dlist[i].places[p].rate,
                  time_name: this.dlist[i].times[t].name,
                  time_rate: this.dlist[i].times[t].rate
                })
              }
            }
            var apt2list = []
            for (var x = 0; x < this.dlist[i].areas.length; x++) {
              for (var p2 = 0; p2 < this.dlist[i].places.length; p2++) {
                for (var t2 = 0; t2 < this.dlist[i].times.length; t2++) {
                  apt2list.push({
                    row_span: this.dlist[i].places.length * this.dlist[i].times.length,
                    price: this.dlist[i].price,
                    area_name: this.dlist[i].areas[x].name,
                    area_rate: this.dlist[i].areas[x].rate,
                    area_desc: this.dlist[i].areas[x].desc,
                    place_name: this.dlist[i].places[p2].name,
                    place_rate: this.dlist[i].places[p2].rate,
                    time_name: this.dlist[i].times[t2].name,
                    time_rate: this.dlist[i].times[t2].rate,
                    final_price: this.dlist[i].price * this.dlist[i].areas[x].rate * this.dlist[i].places[p2].rate * this.dlist[i].times[t2].rate
                  })
                }
              }
            }
            this.newx2.push({
              uuid: this.dlist[i].uuid,
              name: this.dlist[i].name,
              desc: this.dlist[i].desc,
              price: this.dlist[i].price,
              results: apt2list
            })
          }
          // console.log(this.newx2)
        }
      } catch (e) {
        console.log(e)
      }
      if (this.newx2.length >= 1) {
        this.choosed = this.newx2[0]
        this.value = this.newx2[0].uuid
      }

      // console.log(this.newx2)
    },
    chooseprice (v) {
      console.log(v)
      for (var i = 0; i < this.newx2.length; i++) {
        if (v === this.newx2[i].uuid) {
          this.choosed = this.newx2[i]
        }
      }
    },
    check (v) {
      console.log(v)
      this.$router.push({
        path: 'PriceDetail',
        query: {'uuid': v}
      })
    },
    dedit (v) {
      console.log(v)
      this.showu = true
      this.editi = v
    },
    async delp (v, x) {
      console.log(v)
      this.name = x
      this.uuid = v
      this.dialogVisibleDel = true
    },
    delcfm () {
      this.xdelp()
    },
    async xdelp () {
      console.log()
      try {
        let ls = await axi().delete('/ops/price/' + this.uuid)
        if (ls.status === 200) {
          this.dialogVisibleDel = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.pri()
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
    },
    async handleSizeChange (val) {
      this.pagesize = val
      this.pri()
    },
    async handleCurrentChange (val) {
      this.page = val
      this.pri()
    }
  }
}
