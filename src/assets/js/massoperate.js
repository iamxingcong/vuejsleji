
import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import brother from '@/assets/js/brother.js'
import JSZip from "jszip"
import JSZipUtils from 'jszip-utils'
Vue.use(VueAxios, axios)
var total = 0;
var countx  = 0;
var zip = new JSZip()
var music_files = zip.folder("musics")
var excell = zip.folder("excell")

export default {
  name: 'MassOperate',
  data () {
    return {
      stop: require('@/assets/icons/stop.gif'),
      play: require('@/assets/icons/play.png'),
      finished: require('@/assets/icons/finished.gif'),
      dccg: require('@/assets/icons/dccg.png'),
      dtl: [],
      currentPage1: 1,
      formLabelWidth: '110px',
      count: 0,
      multipleSelection: [],
      dialogAlbum: false,
      dialogMusican: false,
      dialogaddPlaylist: false,
      delrltdialogVisible: false,
      formealbum: {},
      searalb: '',
      searchalb: '',
      searchmsz: '',
      albumlist: [],
      music_uuids: [],
      searchm: '',
      musicianlist: [],
      playlist: [],
      searchpls: '',
      remind: '',
      rmtyps: '',
      delstatus: null,
      status: '',
      price_id__isnull: '',
      created_at__gte: '',
      created_at__lt: '',
      searchTotal: [],
      clearAll: false,
      catetorys: [],
      filtervs: [],
      speeds: {},
      speed: '',
      style: [],
      mood: [],
      instrument: [],
      checkedmood: [],
      checkedinstrument: [],
      checkedstyle: [],
      checkedspeed: [],
      dialogAddPrice: false,
      formeprice: {},
      pricelist: [],
      searchprice: '',
      pricelb: '',
      onofftipsx: '',
      selectObj: {},
      multipleSelectionAll: [],
      idKey: 'uuid',
      filtershow: true,
      pkeywords: '',
      labellists: [],
      labelfiltx: {
        uuid: ''
      },
      labelname: '',
      formedit: {},
      dialogFormVisiblecomposer: false,
      xspeed: [],
      checkedinstruments: [],
      checkedeffetcs: [],
      checkedstyle: [],
      checkedspeed: [],
      vtone: [
        'C',
        'Am',
        'G',
        'Em',
        'F',
        'Dm',
        'D',
        'Bm',
        'Bb/A#',
        'Gm',
        'A',
        'F#m/Gbm',
        'Eb/D#',
        'Cm',
        'E',
        'C#m/Dbm',
        'Ab/G#',
        'Fm',
        'B',
        'G#m/Abm',
        'Db/C#',
        'Bbm/A#m',
        'Gb/F#',
        'Ebm/D#m'
      ],
      meterlist: [
        '2/4',
        '3/4',
        '4/4',
        '5/4',
        '6/4',
        '3/8',
        '5/8',
        '6/8',
        '7/8',
        '9/8',
        '10/8',
        '12/8'
      ],
      exportdt: [],
      dialogFormVisibleexportdt: false,
      formexport: {},
      formexportcsed: [],
      mcheckedstyle: [],
      mcheckedmood: [],
      mcheckedinstruments: [],
      mcheckedinstrument: [],
      playinguuid: '',
      playeduuids: [],
      consttimespanfilter: '',
      nameconsttimespanfilter: '',
      stconsttimespanfilter: 0,
      zurls: [],
      progress: 0,
      exportf: false,
      errorlist: [],
      formLabelWidthedit: '100px',
      tipsxdialogVisible: false,
      exportMassmusicdialogVisible: false,
      multiform: {},
      excellactive: '',
      filetipex: '选择需导出音乐的表格',
      formLabelWidthmsup: '100px',
      excellchangedis: false,
      fmdataexc: new FormData(),
      excformexportcsed: []
    }
  },
  created () {
    this.musiclist()
    this.catetory()
    this.labels()
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      var tmuui = localStorage.getItem('plyuuids')
      if (tmuui) {
        var xplayeduuids = tmuui.split(',')

        if (xplayeduuids.indexOf(row.uuid) > -1 && this.playinguuid !== row.uuid) {
          return 'playeedsx'
        } else if(this.playinguuid === row.uuid) {
          return 'dangplayeedsx'
        }  else {
          return 'noplay'
        }
      }
      return '';
    },
    async playing (v) {
      this.playinguuid = v.row.uuid
      if ( this.playeduuids.indexOf(v.row.uuid) > -1 ) {
        console.log(v.row.uuid)
      } else {
        this.playeduuids.push(v.row.uuid)
        localStorage.setItem("plyuuids", this.playeduuids)
      }

      if (!this.dangpl && this.dangpl !== 0) {
        this.dangpl = v.$index
        brother.$emit('bro', v)
      } else if (this.dangpl === v.$index) {
        this.dangpl = v.$index
        brother.$emit('bro', v)
        // brother.$emit('continue', v)
      } else {
        this.dangpl = v.$index
        brother.$emit('bro', v)
      }
    },
    stopplaying (v) {
      this.playinguuid = ''
      brother.$emit('stop', v)
    },
    cclearchoose () {
      this.multipleSelectionAll = []
      this.multipleSelection = []
      this.music_uuids = []
      this.musiclist()
    },
    async musiclist () {
      this.memoryChecked()

      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&page_size=15&page=' + this.currentPage1)
        this.count = ls.data.count
        this.dtl = ls.data.results
      } catch (e) {
        console.log(e)
      }
      setTimeout(() => {
        this.handleSelectSingl()
      }, 2200)

    },
    async handleCurrentChange (val) {
      this.currentPage1 = val
      this.memoryChecked()
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&page=' + val +
        '&page_size=15&search=' + this.pkeywords +
        '&status=' + this.status + '&price_id__isnull=' +
        this.price_id__isnull + '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt
        + '&styles=' + this.checkedstyle + '&moods=' + this.checkedmood + '&instruments=' + this.checkedinstrument +
        '&tempo_notes_id=' + this.speed  + '&label_id=' + this.labelfiltx.uuid)

        if (ls.status === 200) {
          this.count = ls.data.count
          this.dtl = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
      setTimeout(() => {
        this.handleSelectSingl()
      }, 2200)
    },
    handleSelectionChange (v) {
      if (v.length > 0) {
        this.multipleSelection = v
        for (var i = 0; i < v.length; i++) {
          if (this.music_uuids.indexOf(v[i].uuid) < 0) {
            this.music_uuids.push(v[i].uuid)
          }
        }
      } else {
        console.log('blank')
        for (var g = 0; g < this.dtl.length; g++) {
          if (this.music_uuids.indexOf(this.dtl[g].uuid) >= 0) {
            this.music_uuids.splice(this.music_uuids.indexOf(this.dtl[g].uuid), 1)
          }
        }
      }
      this.dtl.forEach((row, index) => {
        if (this.selectObj.hasOwnProperty(row.uuid)) {
          if (v.length) {
            return false
          } else {
            delete this.selectObj[row.uuid]
          }
        } else {
          this.selectObj[row.uuid] = row.uuid
        }
      })
    },
    selectckbxs (v, r) {
      if (v.indexOf(r) < 0) {
        this.music_uuids.splice(this.music_uuids.indexOf(r.uuid), 1)
      }
    },
    handleSelectSingl () {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      let idKey = this.idKey
      let selectAllIds = []
      this.multipleSelectionAll.forEach(
        row => {
          selectAllIds.push(row[idKey])
        })
      this.$refs.multipleTable.clearSelection()
      for (var i = 0; i < this.dtl.length; i++) {
        if (selectAllIds.indexOf(this.dtl[i][idKey]) >= 0) {
          this.$refs.multipleTable.toggleRowSelection(this.dtl[i], true)
        }
      }
    },
    memoryChecked () {
      let idKey = this.idKey
      let that = this

      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      let selectAllIds = []
      this.multipleSelectionAll.forEach(
        row => {
          selectAllIds.push(row[idKey])
        })
      let selectIds = []

      this.multipleSelection.forEach(
        row => {
          selectIds.push(row[idKey])

          if (selectAllIds.indexOf(row[idKey]) < 0) {
            that.multipleSelectionAll.push(row)
          }
        })

      let noSelectIds = []

      this.dtl.forEach(
        row => {
          if (selectIds.indexOf(row[idKey]) < 0) {
            noSelectIds.push(row[idKey])
          }
        })

      noSelectIds.forEach(
        id => {
          if (selectAllIds.indexOf(id) >= 0) {
            for (let i = 0; i < that.multipleSelectionAll.length; i++) {
              if (that.multipleSelectionAll[i][idKey] === id) {
                that.multipleSelectionAll.splice(i, 1)
                break
              }
            }
          }
        })
    },
    async addtoalbumx () {
      if (this.music_uuids.length === 0) {
        this.$message.error('请选择需要加入专辑的音乐')
      } else {
        this.searchalb = ''
        this.albumsearchs()
        this.dialogAlbum = true
      }
    },
    addtoMusicanx () {
      if (this.music_uuids.length === 0) {
        this.$message.error('请选择需要绑定艺术家的音乐')
      } else {
        this.searchmsz = ''
        this.musicansearchs()
        this.dialogMusican = true
      }
    },
    addtoplaylistx () {
      if (this.music_uuids.length === 0) {
        this.$message.error('请选择需要加入曲单的音乐')
      } else {
        this.searchpls = ''
        this.playlistsearchx()
        this.dialogaddPlaylist = true
      }
    },
    diamusicx (v) {
      this.searchmsz = v
      this.musicansearchs()
    },
    diamplaylist (v) {
      this.searchpls = v
      this.playlistsearchx()
    },
    albumsearc (v) {
      this.searchalb = v
      this.albumsearchs()
    },
    pricesearc (v) {
      this.searchprice = v
      this.pricelst()
    },
    async musicansearchs () {
      try {
        let dt = await axiosapi.musicansearch(this.searchmsz)
        if (dt.status === 200 || dt.status === 201) {
          this.musicianlist = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    async playlistsearchx () {
      try {
        let dt = await axiosapi.playlistsearch(this.searchpls)
        if (dt.status === 200 || dt.status === 201) {
          this.playlist = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    selectmsx (x) {
      this.searchmsz = x
    },
    selectmusican (itm) {
      console.log(itm)
      this.searchalb = itm
    },
    selectprice (itm) {
      console.log(itm)
      this.searchprice = itm
    },
    selectpls (z) {
      this.searchpls = z
    },
    async albumsearchs () {
      try {
        let dt = await axiosapi.albumsearch(this.searchalb)
        if (dt.status === 200 || dt.status === 201) {
          this.albumlist = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addmtoalbum () {
      try {
        let dt = await axi().post('/ops/album/' + this.searchalb + '/music_add/', {'uuids': this.music_uuids})
        if (dt.status === 200 || dt.status === 201) {
          this.musiclist()
          this.dialogAlbum = false
          this.$message.success('加入专辑成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addtoMusiccfm () {
      try {
        let dt = await axi().post('/ops/musician/' + this.searchmsz + '/music_add/', {'uuids': this.music_uuids})
        if (dt.status === 200 || dt.status === 201) {
          this.musiclist()
          this.dialogMusican = false
          this.$message.success('绑定艺术家成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addplaylistcfm () {
      try {
        let dt = await axi().post('/ops/playlist/' + this.searchpls + '/music_add/', {'uuids': this.music_uuids})
        if (dt.status === 200 || dt.status === 201) {
          this.musiclist()
          this.dialogaddPlaylist = false
          this.$message.success('加入曲单成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async pricelst () {
      try {
        let dt = await axiosapi.pricesearch(this.searchprice)
        if (dt.status === 200 || dt.status === 201) {
          this.pricelist = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    setprice (v) {
      this.remind = '添加定价'
      if (this.music_uuids.length > 0) {
        this.searchprice = ''
        this.pricelst()
        this.dialogAddPrice = true
      } else {
        this.$message.error('请选择需要' + this.remind + '的音乐')
      }
    },
    async dialogAddPricecfm () {
      try {
        let dt = await axi().post('/ops/price/' + this.searchprice + '/music_add/', {'uuids': this.music_uuids})
        if (dt.status === 200 || dt.status === 201) {
          this.musiclist()
          this.dialogAddPrice = false
          this.$message.success('添加定价成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    massdelete (v) {
      this.delstatus = v
      if (v === 1) {
        this.remind = '删除'
      } else if (v === 2) {
        this.remind = '上线'
      } else if (v === 3) {
        this.remind = '下载'
      } else if (v === 4) {
        this.remind = '下线'
      }
      if (this.music_uuids.length > 0) {
        this.delrltdialogVisible = true
      } else {
        this.$message.error('请选择需要' + this.remind + '的音乐')
      }
    },
    async deleteconfirm () {
      try {
        let dt
        if (this.delstatus === 1) {
          console.log('no')
        } else if (this.delstatus === 2) {
          dt = await axiosapi.massonline(this.music_uuids)
        } else if (this.delstatus === 4) {
          dt = await axiosapi.massoffline(this.music_uuids)
        } else if (this.delstatus === 3) {
          this.$message.success('批量下载，待做')
          this.delrltdialogVisible = false
          return false
        }

        if (dt.status === 200 || dt.status === 201) {
          this.musiclist()
          this.$message.success(this.remind + '成功')
          this.delrltdialogVisible = false
        }
      } catch (e) {
        console.log(e)
      }
    },
    search (v, x) {
      this.pricelb = x
      if (v === 2) {
        this.price_id__isnull = ''
      } else {
        this.price_id__isnull = v
      }

      this.smusiclist()
    },
    onoff (v, z) {
      this.onofftipsx = z
      if (v === 'all') {
        this.status = ''
      } else {
        this.status = v
      }

      this.smusiclist()
    },
    xclearsearch () {
      this.pkeywords = ''
      this.searching()
    },
    async searching () {
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&search=' + this.pkeywords +
        '&page_size=15&status=' + this.status + '&price_id__isnull=' +
        this.price_id__isnull + '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt
        + '&styles=' + this.checkedstyle + '&moods=' + this.checkedmood + '&instruments=' + this.checkedinstrument +
        '&tempo_notes_id=' + this.speed  + '&label_id=' + this.labelfiltx.uuid
        )
        if (ls.status === 200) {
          this.count = ls.data.count
          this.dtl = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    async smusiclist () {
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&status=' +
        this.status + '&page_size=15&search=' + this.pkeywords +'&price_id__isnull=' + this.price_id__isnull + '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt)
        this.count = ls.data.count
        this.dtl = ls.data.results
      } catch (e) {
        console.log(e)
      }
    },
    dateFormat (date) {
      let fmt = 'YYYY-mm-dd HH:MM'
      let ret
      let opt = {
        'Y+': date.getFullYear().toString(),        // 年
        'm+': (date.getMonth() + 1).toString(),     // 月
        'd+': date.getDate().toString(),            // 日
        'H+': date.getHours().toString(),           // 时
        'M+': date.getMinutes().toString(),         // 分
        'S+': date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    orderstt () {
      if (!this.created_at__gte) {
        this.created_at__gte = ''
      } else {
        this.created_at__gte = this.dateFormat(this.created_at__gte)
        console.log(this.created_at__gte)
      }
      this.smusiclist()
    },
    ordersttover () {
      if (!this.created_at__lt) {
        this.created_at__lt = ''
      } else {
        this.created_at__lt = this.dateFormat(this.created_at__lt)
        console.log(this.created_at__lt)
      }
      this.smusiclist()
    },
    async catetory () {
      try {
        let dp = await axiosapi.musiccategory()
        if (dp.status === 200) {
          for (var i = 0; i < dp.data.results.length; i++) {
            for (var x = 0; x < dp.data.results[i].children.length; x++) {
              this.catetorys.push(dp.data.results[i].children[x])
            }
          }
          // console.log(JSON.stringify(this.catetorys))
          localStorage.setItem('catetorys', JSON.stringify(this.catetorys))
          let that = this
          this.searchTotal = dp.data.results
          dp.data.results.forEach(function (x) {
            if (x.type === 'MOOD') {
              that.mood = x.children
            }
            if (x.type === 'STYLE') {
              that.style = x.children
            }
            if (x.type === 'INSTRUMENT') {
              that.instrument = x.children
            }
            if (x.type === 'SPEED') {
              that.xspeed = x.children
            }
          })
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async labels () {
      try {
        let ls = await axi().get('/ops/label_search')
        if (ls.status === 200) {
          this.labellists = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    clicktagsall () {
      this.status = ''
      this.price_id__isnull = ''
      this.checkedmood = []
      this.checkedinstrument = []
      this.checkedstyle = []
      this.speed = ''
      this.speeds = {}
      this.tags = []
      this.filtervs = []
      this.clearAll = false
      this.filtersearch()
    },
    btnstyleall (v) {
      console.log(v)
    },
    btnstyleradio (vx) {
      console.log(vx)
      this.speed = vx.id
      for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i].type.includes('SPEED') && this.tags[i].id !== vx.id) {
          this.tags.splice(this.tags.indexOf(vx), 1)
        }
      }
      this.clearAll = true
      this.tags.push(vx)
      console.log(this.tags)
      this.filtersearch()
    },
    btnstyle (vl) {
      this.tags = []
      this.tags = vl
      this.checkedmood = []
      this.checkedinstrument = []
      this.checkedstyle = []
      var that = this
      vl.forEach(function (x) {
        if (x.type === 'MOOD' && !that.checkedmood.includes(x.id)) {
          that.checkedmood.push(x.id)
        }
        if (x.type === 'STYLE' && !that.checkedstyle.includes(x.id)) {
          that.checkedstyle.push(x.id)
        }
        if (x.type === 'INSTRUMENT' && !that.checkedinstrument.includes(x.id)) {
          that.checkedinstrument.push(x.id)
        }
      })
      if (this.tags.length >= 1) {
        this.clearAll = true
      } else {
        this.clearAll = false
      }
      this.filtersearch()
    },
    async filtersearch () {
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&search=' + this.pkeywords +
        '&status=' + this.status + '&page_size=15&price_id__isnull=' +
        this.price_id__isnull + '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt
        + '&styles=' + this.checkedstyle + '&moods=' + this.checkedmood + '&instruments=' + this.checkedinstrument +
        '&tempo_notes_id=' + this.speed  + '&label_id=' + this.labelfiltx.uuid)
        this.dtl = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    clearsearch () {
      this.searching()
      this.filtershow = true
    },
    checkMusic (x) {
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': x}})
      window.open(routeData.href, '_blank')
    },
    cltag (vl) {
      this.tags.splice(this.tags.indexOf(vl), 1)
      this.btnstyle(this.tags)
      if (vl.type === 'SPEED') {
        this.speed = ''
        this.speeds = {}
      }
      if (this.tags.length === 0) {
        this.clearAll = false
      }
    },
    clickitem (e) {
      e === this.speeds ? this.speeds = '' : this.speeds = e
      if (this.speeds !== '')  {
        this.speed = this.speeds.id
        this.filtersearch()
      } else {
        this.speed = ''
        this.filtersearch()
      }
    },
    goback () {
      this.$router.go(-1)
    },
    xclearspeeds () {
      this.speeds = ''
      this.speed = ''
      this.filtersearch()
    },
    searchShow () {
      this.filtershow = false
    },
    labelfiltxact (v) {
      if (v) {
        this.labelfiltx = v
        this.labelname = v.name
      } else {
        this.labelfiltx = {
          uuid: null,
          name: ''
        }
      }
      this.filtersearch()
    },
    labelnameclearsearch () {
      this.labelname = ''
      this.labelfiltx = {
        uuid: null,
        name: ''
      }
      this.searching()
    },
    addMarks (v) {
      if (this.music_uuids.length > 0) {
        this.dialogFormVisiblecomposer = true
      } else {
        this.$message.error('请选择需要批量打标签的音乐')
      }
    },
    async composermusicconfirm () {
      this.formedit.styles = this.mcheckedstyle
      this.formedit.moods = this.mcheckedmood
      this.formedit.main_instruments = this.mcheckedinstruments
      this.formedit.accompanied_instruments = this.mcheckedinstrument
      this.formedit.uuids = this.music_uuids
      try {
        let dt = await axi().put('/ops/music/batch_edit_category/', this.formedit)
        if (dt.status === 200) {
          this.$message.success('批量标签成功')
          this.cclearchoose()
          this.formedit = {}
          this.dialogFormVisiblecomposer = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
      this.formedit = {}
    },
    async massExport (z) {
      countx = 0
      this.progress = 0
      this.exportf = false
      this.formexportcsed = []
      console.log("1 press export button")
      this.downloadlist = this.music_uuids
      if (this.music_uuids.length > 0) {
        total = this.music_uuids.length
        try {
          let dt = await axi().get('/ops/music/download_metas/')
          if (dt.status === 200) {
            this.$message.success('批量导出表格信息')
            this.exportdt = []
            for(let key  in dt.data) {
              this.exportdt.push({'name': key, 'value': dt.data[key]})
            }
            this.dialogFormVisibleexportdt = true
          } else {
            console.log('错误')
          }
        } catch (e) {
          console.log(e)
        }

      } else {
        this.$message.success('请选择需要导出的音乐')
      }
    },

    downop () {
      console.log('3 uuid count')
      if (this.downloadlist.length > 0) {
        for (var x = 0; x < this.downloadlist.length; x++) {
          this.downloadMusict(this.downloadlist[x])
        }
      } else {
        return false
      }
   },

   async judgedloads (v) {
    console.log('4 judge link is okay or not' + v)
    try {
      let dp = await axi().get('/ops/music/' + v + '/path')
      if (dp.status === 200) {
        this.downloadMusict(v)
      } else {
        console.log('链接不存在')
      }
    } catch (e) {
      this.$message.error('请求错误')
      console.log(e)
    }

   },
   async downloadMusict (x) {
     console.log('4 down laod link' + x)
     try {
       let dt = await axi().get('/ops/music/' + x + '/path?disposition=attachment')
       if (dt.status === 200) {
        this.zurls.push(dt.data.url)
       } else {
         console.log('错误')
       }
     } catch (e) {
       console.log(e)
       this.errorlist.push(x)
       total = total - 1
     }
    if (this.downloadlist.length === (this.zurls.length + this.errorlist.length) ) {
      this.jszipf()
      console.log('5 audio ajax begin')
    }
   },
    jszipf () {
      console.log('6 now begin ajax')
      var zip = new JSZip();
      var urls = this.zurls

      var that = this
      urls.map(function (data) {
        var fnames = that.getCaption(data)
        console.log('7 request')
        var url = data
        url = url.replace(/\\/g, '/')
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function receiveResponse() {

          if (this.readyState == 4) {
            if (xhr.status === 200) {
              countx++
              console.log(countx + 'downloaded success')
              that.zip_download(xhr.response, fnames)
            } else {
              console.log('last error')
              total = total - 1
            }
          }
        }

        xhr.send()
      })
    },
    getCaption(obj){

      var index = obj.lastIndexOf("filename");
      obj = obj.substring(index, obj.length);
      var oind = obj.indexOf('&OSSAccessKeyId');
      obj = obj.substr(0, oind);
      obj = this.getCharFromUtf8(obj);
      obj = obj.replace(/%/g, " ");
      obj = obj.replace(/filename/g, '');

      obj = obj.slice(3);

      console.log(obj);
      return obj;
    },
    utf8ToChar(str) {
      var iCode, iCode1, iCode2;
      iCode = parseInt("0x" + str.substr(1, 2));
      iCode1 = parseInt("0x" + str.substr(4, 2));
      iCode2 = parseInt("0x" + str.substr(7, 2));
      return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
    },
    getCharFromUtf8 (str) {
      var cstr = "";
      var nOffset = 0;
      if (str == "")
        return "";
      str = str.toLowerCase();
      nOffset = str.indexOf("%e");
      if (nOffset == -1)
        return str;
      while (nOffset != -1) {
        cstr += str.substr(0, nOffset);
        str = str.substr(nOffset, str.length - nOffset);
        if (str == "" || str.length < 9)
          return cstr;
        cstr += this.utf8ToChar(str.substr(0, 9));
        str = str.substr(9, str.length - 9);
        nOffset = str.indexOf("%e");
      }
      return cstr + str;
    },
    zip_download (rsp, filnam) {
      filnam = countx + '_' + filnam
      music_files.file(filnam, rsp)
      var that = this
      console.log(total + ',' + countx)

      if (total > 0 && countx > 0 && countx <= total) {
        that.progress = parseInt((countx / total)*100)
      }

      if (total === countx ) {
        zip.generateAsync({type: 'blob'}).then(function (content) {
          // see FileSaver.js
          that.saveAs(content, new Date() + '.zip')
          that.dialogFormVisibleexportdt = false
          that.$message.success('音乐下载成功')
          that.tipsxdialogVisible = true
          that.closetipsxdialogVisible()
        })
      } else {
        console.log(countx + '次')
      }

    },
    closetipsxdialogVisible () {
      var that = this
      setTimeout(function () {
        that.tipsxdialogVisible = false
      }, 2000)
    },
    saveAs (data, name) {
      var urlObject = window.URL || window.webkitURL || window
      var export_blob = new Blob([data])
      var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      save_link.href = urlObject.createObjectURL(export_blob)
      save_link.download = name
      save_link.click()
    },
    async dialogFormVisibleexportdtcfm () {
      console.log('2 pressed confirm button')
      this.exportf = true
      let dtd = {
        'uuids': this.music_uuids,
        'titles': this.formexportcsed
      }
      var that = this
      Vue.axios.post(
        '/ops/music/download_xlsx/',
        dtd,{responseType: 'blob'})
        .then(function (response) {
          const content = response;
          const blob = new Blob([content.data]);
          const fileName =  `资源${new Date().getTime()}.xlsx`;
          excell.file(fileName, blob)

        }).catch(function(e){
          console.log(e)
          that.$message.error('请求错误')
        })
        that.downop()
    },
    async onlineAll (v) {
      try {
        let ls = await axi().put('/ops/music/online', {'type': v})
        if (ls.status === 200) {
          this.musiclist()

          this.$message.success('操作成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async excellExport (v) {
      try {
        let dt = await axi().get('/ops/music/download_metas/')
        if (dt.status === 200) {

          this.exportdt = []
          for(let key  in dt.data) {
            this.exportdt.push({'name': key, 'value': dt.data[key]})
          }
          this.exportMassmusicdialogVisible = true
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }

    },
    chooseexcell () {
      var fileInput = document.getElementById("myfileinput");
      var file = fileInput.files[0];
      if (file) {
        this.fmdataexc.append("excel_file", file)
        this.filetipex = file.name
        this.excellactive = 'actived'
      }

    },
    async excellchange () {
      debugger
      console.log(this.excformexportcsed)
      if (this.excformexportcsed.length > 0) {
        for (let i = 0; i <  this.excformexportcsed.length; i++) {
          this.fmdataexc.append(`titles[${i}]`, this.excformexportcsed[i])

        }
      } else {
        this.fmdataexc.append("excformexportcsed", []);
      }

      try {
        let ls = await axi().post('/ops/music/download_xlsx/', this.fmdataexc)
        if (ls.status === 200) {
          debugger
          console.log(ls)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
