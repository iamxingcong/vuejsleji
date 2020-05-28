import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'PriceAuthorizeType',
  data () {
    return {
      price: 2333232,
      AdddialogVisible: false,
      dialogVisibleDel: false,
      formLabelWidth: '100px',
      dlist: [],
      form: {},
      multipleSelection: [],
      count: 0,
      currentPage1: 1,
      uuid: '',
      detail: {},
      name: '',
      daddMultiVersionPop: false,
      formaddversion: {},
      addversionsearch: '',
      musiclistschecked: [],
      musiclists: [],
      tags: [],
      uuidslist: [],
      uuiddel:  []
    }
  },
  created () {
    this.det()
    this.lst()
    this.uuid = this.$route.query.uuid
  },
  methods: {
    addPrice () {
      this.AdddialogVisible = true
    },
    async det () {
      try {
        let lis = await axi().get('/ops/price/' + this.$route.query.uuid)
        if (lis.status === 200) {
          this.detail = lis.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async lst () {
      try {
        let lis = await axi().get('/ops/price/' + this.$route.query.uuid + '/musics/')
        if (lis.status === 200 || lis.status === 201) {
          this.dlist = lis.data.results
          this.count = lis.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    async musicsearchlist () {
      this.musiclists = []
      try {
        let ls = await axiosapi.musicsearchalb(this.addversionsearch)
        if (ls.status === 200) {
          this.musiclists = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    check (x) {
      this.$router.push({
        path: 'MusicDetail',
        query: {'uuid': x}
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async handleSizeChange (val) {
      try {
        let ls = await axi().get('/ops/price/' + this.$route.query.uuid + '/musics/?ordering=-created_at&page_size=' + val)
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
        let ls = await axi().get('/ops/price/' + this.$route.query.uuid + '/musics/?ordering=-created_at&page=' + val)
        if (ls.status === 200) {
          this.dlist = ls.data.results
          this.count = ls.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    del (v, n) {
      this.uuiddel = []
      this.uuiddel.push(v)
      this.name = n
      console.log(v)
      this.dialogVisibleDel = true
    },
    async delcfm () {
      try {
        let ls = await axi().post('/ops/price/' + this.$route.query.uuid + '/music_remove/', {'uuids': this.uuiddel})
        if (ls.status === 200) {
          this.lst()
          this.dialogVisibleDel = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    goback () {
      this.$router.go(-1)
    },
    addMusic () {
      this.addversionsearch = ''
      console.log('addmusics')
      this.musicsearchlist()
      this.daddMultiVersionPop = true
    },
    async daddMultiVersionPopcfm () {
      this.uuidslist = []
      if (this.tags.length > 0) {
        for (var i = 0; i < this.tags.length; i++) {
          this.uuidslist.push(this.tags[i].uuid)
        }
        try {
          let dp = await axi().post('/ops/price/' + this.$route.query.uuid + '/music_add/', {'uuids': this.uuidslist})
          if (dp.status === 200) {
            this.daddMultiVersionPop = false
            this.$message({
              message: '添加音乐成功！',
              type: 'success'
            })
            this.lst()
            this.tags = []
            this.musiclistschecked = []
          } else {
            console.log('错误')
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    searchm () {
      this.musicsearchlist()
      console.log(this.addversionsearch)
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    handlemusiclists (v) {
      this.tags = []
      this.tags = v
    }
  }
}
