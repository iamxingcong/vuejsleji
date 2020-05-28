
import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'
import brother from '@/assets/js/brother.js'
import axios from 'axios'
var formData = new FormData();
var fmdt = []
var filepathfmdt = []
export default {
  name: 'MusicFilter',
  data () {
    return {
      stop: require('../icons/stop.gif'),
      play: require('../icons/play.png'),
      projicon:  require('../icons/projicon.png'),
      dialogFormVisible: false,
      form: {
        name: '',
        music_no: '',
        lyricist: '',
        composer: '',
        arranged_by: '',
        path: '',
        desc: '',
        album_id: this.$route.query.uuid
      },
      formLabelWidth: '150px',
      checkAll: false,
      checkAllc: false,
      checkedCities: [],
      checkedCitiesc: [],
      isIndeterminate: true,
      tags: [],
      tableData: [],
      imageUrl: '',
      isMultiple: true,
      updata: {
        'upload_dir': 'music_path',
        'extension': ''
      },
      updatt: {
        'upload_dir': 'music_path',
        'extension': 'mp3'
      },
      updatas: {},
      multiupdatas: {},
      imgs: '',
      urls: '',
      currentPage1: 1,
      count: 0,
      style: [],
      mood: [],
      instrument: [],
      checkedmood: [],
      checkedinstrument: [],
      checkedinstruments: [],
      checkedeffetcs: [],
      checkedstyle: [],
      checkedspeed: [],
      searchTotal: [],
      filtervs: [],
      clearAll: false,
      speeds: {},
      speed: '',
      xspeed: [],
      catetorys: [],
      playstatus: [],
      audio: false,
      audiourl: '',
      dangpl: null,
      dialogVisible: false,
      onoftips: '',
      onoffuuid: '',
      onofftype: 0,
      setMuiscName: '',
      options: ['S', 'A', 'B', 'C'],
      level: '',
      dialogVisibleGrade: false,
      search: '',
      status: '',
      price_id__isnull: '',
      created_at__gte: '',
      created_at__lt: '',
      pricelb: '',
      onofftipsx: '',
      pkeywords: '',
      dialogFormVisiblecomposer: false,
      formedit: {},
      detail: {},
      edituuid: '',
      filtershow: true,
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
      ready: false,
      downloaduuid: 0,
      dlddialogVisible: false,
      addtoProjdialogVisible: false,
      downloadname: '',
      fmproj: {
        userid: '',
        projectid: ''
      },
      userlists: [],
      projectlist: [],
      ussearch: '',
      projetsearch: '',
      userchoosed: true,
      addtoProjrow: {},
      labellists: [],
      labelfiltx: {
        uuid: ''
      },
      labelname: '',
      playeduuids: [],
      choosedprojname: '',
      showchoosedprojname: false,
      existedprojlist: [],
      showchoosedUserprojls: false,
      disbtn: false,
      playinguuid: '',
      consttimespanfilter: '',
      nameconsttimespanfilter: '',
      stconsttimespanfilter: 0,
      addMassmusicdialogVisible: false,
      excellfile: {},
      multiready: false,
      multiform: {},
      totalpathuuid: [],
      threeuuid: [],
      threefilepath: [],
      fileextention: [],
      musicuplaodct: 0,
      sucmusicuplaodct: 0,
      firstdesc: '',
      excellchangedis: false,
      musicupbegining: false,
      formLabelWidthmsup: '100px',
      filepath_list: [],
      thirdpath: [],
      thirdStepfilp: '',
      musicupcount: 0,
      filetipx: '请选择上传的音乐文件夹',
      filetipex: '请选择需要上传的表格目录',
      stepuploadind: 0,
      fileactive: '',
      excellactive: ''
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.query.search !== from.query.search) {
        this.search = to.query.search
        this.musiclist()
      }
    }
  },
  created () {
    if (this.$route.query.search) {
      this.search = this.$route.query.search
    }
    this.musiclist()
    this.imgupurl()
    this.catetory()
    this.labels()

  },
  filters: {
    changeseconds (s) {
      if (s) {
        var h;
        h  =   Math.floor(s/60);
        s  =   s%60;
        h    +=    '';
        s    +=    '';
        h  =   (h.length==1)?'0'+h:h;
        s  =   (s.length==1)?'0'+s:s;
        return h+':'+s;
      } else {
        return '00: 00'
      }
    }
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
    clicktagsall () {
      this.created_at__lt = ''
      this.created_at__gte = ''
      this.consttimespanfilter = '&length__gte=&length__lt='
      this.nameconsttimespanfilter = ''
      this.stconsttimespanfilter = 0
      this.labelname = ''
      this.checkedmood = []
      this.checkedinstrument = []
      this.checkedeffetcs = []
      this.checkedstyle = []
      this.speed = ''
      this.speeds = {}
      this.tags = []
      this.filtervs = []
      this.clearAll = false
      this.pkeywords = ''
      this.onofftipsx = ''
      this.pricelb = ''
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
      console.log(vl)
      this.tags = []
      this.tags = vl
      this.checkedmood = []
      this.checkedinstrument = []
      this.checkedeffetcs = []
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
        if (x.type === 'EFFECT' && !that.checkedeffetcs.includes(x.id)) {
          that.checkedeffetcs.push(x.id)
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
        let ls = await axi().get('/ops/music?ordering=-created_at&styles=' +
        this.checkedstyle + '&moods=' + this.checkedmood + '&search=' + this.pkeywords +
        '&instruments=' + this.checkedinstrument + '&tempo_notes_id=' + this.speed +
        '&effects=' + this.checkedeffetcs +
        '&label_id=' + this.labelfiltx.uuid + '&page_size=15' + this.consttimespanfilter)
        if (ls.status === 200) {
          this.count = ls.data.count
          brother.$emit('countm', this.count)
          this.tableData = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    xclearsearch () {
      this.pkeywords = ''
      this.searching()
    },
    clearsearch () {
      this.searching()
      this.filtershow = true
    },
    async searching () {
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&search=' + this.pkeywords +
        '&status=' + this.status + '&price_id__isnull=' +
        this.price_id__isnull + '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt
        + '&styles=' + this.checkedstyle + '&moods=' + this.checkedmood + '&instruments=' + this.checkedinstrument +
        '&tempo_notes_id=' + this.speed + '&label_id=' + this.labelfiltx.uuid + '&page_size=15' +
        this.consttimespanfilter +'&effects=' + this.checkedeffetcs
        )
        if (ls.status === 200) {
          this.count = ls.data.count
          this.tableData = ls.data.results
          brother.$emit('countm', this.count)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async submusicfilterx () {
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&status=' + this.status + '&price_id__isnull=' +
        this.price_id__isnull + '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt
        + '&styles=' + this.checkedstyle + '&moods=' + this.checkedmood + '&instruments=' + this.checkedinstrument +
        '&tempo_notes_id=' + this.speed + '&search=' + this.pkeywords + '&label_id=' + this.labelfiltx.uuid + '&page_size=15' + this.consttimespanfilter + '&effects=' + this.checkedeffetcs)
        this.tableData = ls.data.results
        this.count = ls.data.count
        brother.$emit('countm', this.count)
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

      if(!this.created_at__lt) {
        this.created_at__lt = ''
      }
      if (!this.created_at__gte) {
        this.created_at__gte = ''
      } else {

        this.created_at__gte = this.dateFormat(this.created_at__gte)
        console.log(this.created_at__gte)
      }
      this.submusicfilterx()
    },
    ordersttover () {

      if (!this.created_at__gte) {
        this.created_at__gte = ''
      }
      if (!this.created_at__lt) {
        this.created_at__lt = ''
      } else {

        this.created_at__lt = this.dateFormat(this.created_at__lt)
        console.log(this.created_at__lt)
      }
      this.submusicfilterx()
    },
     searchx (v, x) {
      this.pricelb = x
      if (v === 2) {
        this.price_id__isnull = ''
      } else {
        this.price_id__isnull = v
      }

      this.submusicfilterx()
    },
    onoff (v, z) {
      this.onofftipsx = z
      if (v === 'all') {
        this.status = ''
      } else {
        this.status = v
      }

      this.submusicfilterx()
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
    addmusicpop () {
      this.dialogFormVisible = true
      this.imageUrl = ''
    },
    checkMusic (x) {
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': x}})
      window.open(routeData.href, '_blank')
    },
    massoperate () {
      this.$router.push('/MassOperate')
    },
    async imgupurl () {
      try {
        let dt = await axiosapi.avatarupload(this.updatt)
        if (dt.status === 200 || dt.status === 201) {
          this.urls = dt.data.host
        }
      } catch (e) {
        console.log(e)
      }
    },
    downloadMusic (x) {
      this.downloaduuid = x.uuid
      this.downloadname = x.name
      this.dlddialogVisible = true
    },
    async downloadMusiccfm () {
      try {
        let dp = await axi().get('/ops/music/' + this.downloaduuid + '/path')
        if (dp.status === 200) {
          this.judge()
        } else {
          console.log('链接不存在')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async judge () {
      try {
        let dp = await axi().get('/ops/music/' + this.downloaduuid + '/path?disposition=attachment')
        if (dp.status === 200) {
          window.open(dp.data.url)
          this.dlddialogVisible = false
          this.$message.success("下载成功")
        }
      } catch (e) {
        console.log(e)
      }
    },
    handErrox (err, file, fileList) {
      console.log(err)
    },
    handleAvatarSuccess (res, file, filelist) {
      console.log(res)
      console.log(file)
      console.log(filelist)
      if (file.status === 'success') {
        this.ready = true
      }
    },

    async beforeAvatarUpload (file) {
      console.table(file)
      this.imageUrl = file.name
      const ismp3 = file.type === 'audio/mpeg'
      const iswav = file.type === 'audio/wav'
      if (ismp3 || iswav) {
        console.log('')
      } else {
        this.$message.error('音乐文件格式不符')
        this.imageUrl = ''
        return
      }
      const isLt2M = file.size / 1024 / 1024 < 22
      // if (!isLt2M) {
      //   this.$message.error('上传音乐文件大小不能超过 22MB!')
      // }
      try {
        // this.updata.extension = file.type.replace('audio/', '')
        let indx = file.name.lastIndexOf('.');
        this.updata.extension = file.name.substr(indx + 1, file.name.length)
        let dt = await axiosapi.avatarupload(this.updata)
        if (dt.status === 200 || dt.status === 201) {
          this.updatas.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.updatas.policy = dt.data.policy
          this.updatas.Signature = dt.data.Signature
          this.updatas.key = dt.data.key
          this.form.path = dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return ismp3 && iswav && isLt2M
    },
    async musiclistnofilter () {
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&page_size=15')
        if (ls.status === 200) {
          this.count = ls.data.count
          this.tableData = ls.data.results
          brother.$emit('countm', this.count)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async musiclist () {
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&search=' + this.search +
        '&status=' +
        this.status + '&price_id__isnull=' + this.price_id__isnull +
        '&styles=' + this.checkedstyle + '&moods=' + this.checkedmood + '&instruments=' + this.checkedinstrument +
        '&tempo_notes_id=' + this.speed + '&label_id=' + this.labelfiltx.uuid + '&page_size=15' + this.consttimespanfilter + '&effects=' + this.checkedeffetcs
        )
        if (ls.status === 200) {
          this.count = ls.data.count
          this.tableData = ls.data.results
          brother.$emit('countm', this.count)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addmusics () {
      if (!this.form.path) {
        this.$message({
          message: '音乐文件必须添加',
          type: 'error'
        })
        return
      }
      if (!this.ready) {
        this.$message({
          message: '等待文件上传成功',
          type: 'error'
        })
        return
      }
      try {
        let ls = await axiosapi.addmusic(this.form)
        if (ls.status === 201) {
          this.ready = false
          this.musiclist()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.form = {
            name: '',
            music_no: '',
            lyricist: '',
            composer: '',
            arranged_by: '',
            path: '',
            desc: ''
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    cltag (vl) {
      this.tags.splice(this.tags.indexOf(vl), 1)
      console.log(this.tags)
      this.btnstyle(this.tags)
      if (vl.type === 'SPEED') {
        this.speed = ''
        this.speeds = {}
      }
      if (this.tags.length === 0) {
        this.clearAll = false
      }
    },
    async handleCurrentChange (val) {
      this.search = this.$route.query.search
      if (this.search && this.search.length >= 0) {
        this.pkeywords = this.search
      }
      try {
        let ls = await axi().get('/ops/music?ordering=-created_at&page=' + val + '&status=' +
        this.status + '&price_id__isnull=' + this.price_id__isnull + '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt +
        '&styles=' + this.checkedstyle + '&moods=' + this.checkedmood + '&instruments=' + this.checkedinstrument +
        '&tempo_notes_id=' + this.speed + '&search=' + this.pkeywords + '&label_id=' + this.labelfiltx.uuid + '&page_size=15' + this.consttimespanfilter + '&effects=' + this.checkedeffetcs)

        if (ls.status === 200) {
          this.count = ls.data.count
          this.tableData = ls.data.results
        }
        brother.$emit('countm', this.count)
      } catch (e) {
        console.log(e)
      }
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
    clickitem (e) {
      e === this.speeds ? this.speeds = '' : this.speeds = e
      console.log(this.speeds)
      if (this.speeds !== '')  {
        this.speed = this.speeds.id
        this.filtersearch()
      } else {
        this.speed = ''
        this.filtersearch()
      }
    },
    onoffline (v, x) {
      this.onofftype = v
      console.log(v, x)
      if (v === 1) {
        this.onoftips = '上线《' + x.name + '》'
      } else {
        this.onoftips = '下线《' + x.name + '》'
      }
      this.onoffuuid = x.uuid
      this.dialogVisible = true
    },
    async onofflinecfm () {
      try {
        let ls
        if (this.onofftype === 1) {
          ls = await axi().put('/ops/music/' + this.onoffuuid + '/set_online')
        } else {
          ls = await axi().put('/ops/music/' + this.onoffuuid + '/set_offline')
        }

        if (ls.status === 200) {
          this.musiclist()
          this.dialogVisible = false
          this.$message.success('操作成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    dialogVisibleGradepop (v) {
      console.log(v)
      this.onoffuuid = v.uuid
      this.setMuiscName = v.name
      this.level = v.level
      this.dialogVisibleGrade = true
    },
    async dialogVisibleGradecfm () {
      try {
        let ls = await axi().put('/ops/music/' + this.onoffuuid + '/set_level', {'level': this.level})
        if (ls.status === 200) {
          this.musiclist()
          this.dialogVisibleGrade = false
          this.$message.success('操作成功')
        }
      } catch (e) {
        console.log(e)
      }
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
    async musicdetaieditonly (w) {
      try {
        let dp = await axi().get('/ops/music/' + w)
        if (dp.status === 200) {
          this.checkedstyle = []
          for (var r = 0; r < dp.data.style_category_info_list.length; r++) {
            this.checkedstyle.push(dp.data.style_category_info_list[r].id)
          }
          this.checkedmood = []
          for (var x = 0; x < dp.data.mood_category_info_list.length; x++) {
            this.checkedmood.push(dp.data.mood_category_info_list[x].id)
          }
          this.checkedinstruments = []
          for (var t = 0; t < dp.data.main_ins_category_info_list.length; t++) {
            this.checkedinstruments.push(dp.data.main_ins_category_info_list[t].id)
          }
          this.checkedinstrument = []
          for (var z = 0; z < dp.data.acc_ins_category_info_list.length; z++) {
            this.checkedinstrument.push(dp.data.acc_ins_category_info_list[z].id)
          }
          this.formedit = dp.data
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    addMarks (v) {
      this.musicdetaieditonly(v)
      this.edituuid = v
      this.dialogFormVisiblecomposer = true
    },
    async composermusicconfirm () {
      this.formedit.styles = this.checkedstyle
      this.formedit.moods = this.checkedmood
      this.formedit.main_instruments = this.checkedinstruments
      this.formedit.accompanied_instruments = this.checkedinstrument
      try {
        let dt = await axi().put('/ops/music/' + this.edituuid + '/edit_category/', this.formedit)
        if (dt.status === 200) {
          this.$message.success('标签成功')
          this.musiclistnofilter()
          this.dialogFormVisiblecomposer = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    searchShow () {
      this.filtershow = false
    },
    xclearspeeds () {
      this.speeds = ''
      this.speed = ''
      this.filtersearch()
    },
    addtoProj (v) {
      this.disbtn = false
      this.showchoosedprojname = false
      this.showchoosedUserprojls = false
      this.addtoProjrow = v
      this.addtoProjdialogVisible = true
      if (this.ussearch.length >= 1) {
        this.projlistx()
        this.getuserlist()
        this.judgeuserplist(this.ussearch)
      } else {
        this.userchoosed = true
        this.getuserlist()
      }
    },
    async getuserlist () {
      if (this.ussearch.length >= 1) {
        this.fmproj.userid = this.ussearch
      }
      try {
        this.userlists = []
        let dt = await axi().get('/ops/user_search/?search=' + this.fmproj.userid)
        if (dt.status === 200) {
          this.userlists = dt.data.results
          if( this.ussearch.length >= 1) {
            for (var z = 0; z < dt.data.results.length; z ++) {
              if (this.ussearch === dt.data.results[z].uuid) {
                this.fmproj.userid = dt.data.results[z].uuid
              }
            }
          }

        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    clearxt () {
      this.ussearch = ''
      this.userchoosed = true
      this.showchoosedUserprojls = false
      this.showchoosedprojname = false
      this.getuserlist()

    },
    remoteMethod (c) {
      this.fmproj.userid = c
      this.getuserlist()
      console.log('remoteMethod')
    },
    async judgeuserplist (z) {
      try {
        let dt = await axi().get('/ops/user/' + z + '/music_in_project/?music_id=' + this.addtoProjrow.uuid)
        if (dt.status === 200 && dt.data.results.length > 0) {
          this.$message.success("该音乐存在以下项目中")
          this.showchoosedUserprojls = true
          this.existedprojlist = dt.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async userSelected (v) {
      console.log('userSelected')

      this.ussearch = v
      //   GET /ops/user/{user_uuid}/music_in_project/?music_id={music_uuid}
      if (v.length >= 1) {
        try {
          let dt = await axi().get('/ops/user/' + v + '/music_in_project/?music_id=' + this.addtoProjrow.uuid)
          if (dt.status === 200 && dt.data.results.length > 0) {
            this.$message.success("该音乐存在以下项目中")
            this.showchoosedUserprojls = true
            this.existedprojlist = dt.data.results
          } else {
            console.log('错误')
          }
        } catch (e) {
          console.log(e)
        }

        this.projlistx()
      } else {
        this.userchoosed = true
      }
    },
    async projectSelected (z) {
      this.showchoosedprojname = false
      console.log(z)
      console.log(this.addtoProjrow)
      var projldt = localStorage.getItem("projectlistdt")
      if (projldt) {
        var projldtarr = JSON.parse(projldt)
        for (var t = 0; t < projldtarr.length; t++) {
          if (z === projldtarr[t].uuid) {
              this.choosedprojname = projldtarr[t].name
          }
        }

      }
      try {
        let dt = await axi().get('/ops/project/' + z + '/music_contain/?music_id=' + this.addtoProjrow.uuid)
        if (dt.status === 200) {

          if (dt.data.exist === true) {
            this.$message.success("该音乐已经存在项目中")
            this.showchoosedprojname = true
            return false
          }
          console.log(dt)
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async projlistx () {
      try {
        this.userlists = []
        let dt = await axi().get('/ops/user/' + this.ussearch + '/project_search/')
        if (dt.status === 200) {
         this.projectlist = dt.data.results
         this.userchoosed = false
         localStorage.setItem("projectlistdt", JSON.stringify(dt.data.results))
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addtoProjdialogVisiblecfm () {
      if (this.fmproj.projectid) {
        this.disbtn = true
        try {
          let dt = await axi().get('/ops/project/' + this.fmproj.projectid + '/music_contain/?music_id=' + this.addtoProjrow.uuid)
          if (dt.status === 200) {

            if (dt.data.exist === true) {
              this.$message.success("该音乐已经存在项目中")
              this.showchoosedprojname = true
              return false
            } else {
              this.addtoprojecttrueok()
            }
            console.log(dt)
          } else {
            console.log('错误')
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message.success('请选择项目')
      }
    },
    async addtoprojecttrueok () {
      if (this.fmproj.projectid) {
        try {
          this.userlists = []
          let dt = await axi().post('/ops/project/' + this.fmproj.projectid + '/music_add/',
          {
            'uuids': [this.addtoProjrow.uuid]
          })
          if (dt.status === 200) {
           this.addtoProjdialogVisible = false
           this.$message.success('加入项目成功')
          } else {
            console.log('错误')
          }
        } catch (e) {
          console.log(e)
        }
        this.userchoosed = true
      } else {
        this.$message.success('请选择项目')
      }

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
    timespanfilter (v) {
      switch (v) {
        case 0:
          this.consttimespanfilter = '&length__gte=&length__lt='
          this.nameconsttimespanfilter = ''
          this.stconsttimespanfilter = 0
          break;

          case 1:
          this.consttimespanfilter = '&length__gte=&length__lt=3'
          this.nameconsttimespanfilter = '小于3s'
          this.stconsttimespanfilter = 1
          break;

          case 2:
          this.consttimespanfilter = '&length__gte=4&length__lt=10'
          this.nameconsttimespanfilter = '3s-10s'
          this.stconsttimespanfilter = 2
          break;

          case 3:
          this.consttimespanfilter = '&length__gte=11&length__lt=20'
          this.nameconsttimespanfilter = '10s-20s'
          this.stconsttimespanfilter = 3
          break;

          case 4:
          this.consttimespanfilter = '&length__gte=21&length__lt=30'
          this.nameconsttimespanfilter = '20s-30s'
          this.stconsttimespanfilter = 4
          break;

          case 5:
          this.consttimespanfilter = '&length__gte=31&length__lt=60'
          this.nameconsttimespanfilter = '30s-60s'
          this.stconsttimespanfilter = 5
          break;
          case 6:
          this.consttimespanfilter = '&length__gte=61&length__lt=120'
          this.nameconsttimespanfilter = '1分钟-2分钟'
          this.stconsttimespanfilter = 6
          break;
          case 7:
          this.consttimespanfilter = '&length__gte=121&length__lt=180'
          this.nameconsttimespanfilter = '2分钟-3分钟'
          this.stconsttimespanfilter = 7
          break;
          case 8:
          this.consttimespanfilter = '&length__gte=181&length__lt='
          this.nameconsttimespanfilter = '3分钟以上'
          this.stconsttimespanfilter = 8
          break;
          default:
          this.consttimespanfilter = '&length__gte=&length__lt='
          this.nameconsttimespanfilter = ''
          this.stconsttimespanfilter = 0
      }
      this.submusicfilterx()
      console.log(v)
      console.log(this.consttimespanfilter)
    },
    timespanclear () {
      this.nameconsttimespanfilter = ''
      this.stconsttimespanfilter = 0
      this.consttimespanfilter = '&length__gte=&length__lt='
      this.submusicfilterx()
    },
    addMassmusic () {
      this.addMassmusicdialogVisible = true
      this.excellchangedis = false
      this.filetipx = '请选择上传的音乐文件夹'
      this.filetipex = '请选择需要上传的表格目录'
    },
    musicmassupbegin () {
      this.fileactive = 'actived'
      console.log('zero 获取名称')
      var fi = document.getElementById("multimusicupx").files
      let ind = fi[0].webkitRelativePath.indexOf("/")
      this.thirdStepfilp = fi[0].webkitRelativePath.substr(0, ind)
      if (fi) {
        for (var i = 0; i < fi.length; i++) {
          const ismp3 = fi[i].type === 'audio/mpeg'
          const iswav = fi[i].type === 'audio/wav'
          if (ismp3 || iswav) {
            this.filepath_list.push(this.thirdStepfilp + '/'+ fi[i].name)

          } else {
            console.log(fi[i])
            return
          }
          const isLt2M = fi[i].size / 1024 / 1024 < 22

        }
        this.filetipx = this.filepath_list.length + '个文件'
      }
    },
    chooseexcell () {
      var fileInput = document.getElementById("myfileinput");
      var file = fileInput.files[0];
      this.filetipex = file.name
      this.excellactive = 'actived'
    },
    excellchange () {
      console.log('1 处理表格')
      this.excellchangedis = true
      var fileInput = document.getElementById("myfileinput");
      var file = fileInput.files[0];
      formData.append("excel_file", file);
      formData.append("name", fileInput.value);
      formData.append("desc", this.firstdesc);
      // this.filepath_list.push(fileInput.value)

      if (this.filepath_list.length > 0) {
        for (let i = 0; i <  this.filepath_list.length; i++) {
          formData.append(`filepath_list[${i}]`, this.filepath_list[i])
          // formData.append("filepath_list", this.filepath_list);
        }
      } else {
        formData.append("filepath_list", []);
      }

      this.addMassmusicFirst()
    },
    async addMassmusicFirst () {
      console.log('2 上传表格')
      try {
        let ls = await axi().post('/ops/upload_task/', formData)
        if (ls.status === 201) {
          this.pre_music()
        }
      } catch (e) {
        console.log(e)
      }

    },
    async pre_music () {
      console.log('3 音乐信息')
      try {
        let ls = await axi().get('/ops/pre_music/newly/')
        if (ls.status === 200) {
          if (ls.data.results && ls.data.results.length > 0) {
            for (var h = 0; h < ls.data.results.length; h++) {
              this.totalpathuuid.push({
                'uuid': ls.data.results[h].uuid,
                'filepath': ls.data.results[h].filepath
              })
              this.threeuuid.push(ls.data.results[h].uuid)
              this.threefilepath.push(ls.data.results[h].filepath)
            }
          }
          this.secmusicmassupbegin()
          this.musicupbegining = true

          let routeData = this.$router.resolve({path: 'MusicUploadList', query: {'marks': 'test'}})
          window.open(routeData.href, '_blank')
        }
      } catch (e) {
        console.log(e)
      }
    },

    async secmusicmassupbegin () {
      console.log('4 音乐文件处理 ')
      var fi = document.getElementById("multimusicupx").files
      if (fi) {
        for (var i = 0; i < fi.length; i++) {

          const ismp3 = fi[i].type === 'audio/mpeg'
          const iswav = fi[i].type === 'audio/wav'
          if (ismp3 || iswav) {

            let indx = fi[i].name.lastIndexOf('.');
            let tp = fi[i].name.substr(indx + 1, fi[i].name.length)
            this.fileextention.push(tp)
            var fmname = new FormData();
            fmdt.push(fmname)
            filepathfmdt.push({'index': i})

            // this.zimgupurl(tp, fi[i], i)
          } else {
            console.log(fi[i])
            return
          }
          const isLt2M = fi[i].size / 1024 / 1024 < 22

        }

        console.log(fmdt.length + '，首音乐')
        this.stepupload()
      }
    },
    stepupload () {
      var fi = document.getElementById("multimusicupx").files

      console.log(this.stepuploadind + ', 次')


      if (this.stepuploadind < fi.length) {
        console.log(this.fileextention[this.stepuploadind] + "," + fi[this.stepuploadind].name)

        this.zimgupurl(this.fileextention[this.stepuploadind], fi[this.stepuploadind], this.stepuploadind)
        console.log(fi[this.stepuploadind].name + ", upload," + this.stepuploadind)
        this.stepuploadind++
      } else {
        this.musiclist()
        this.addMassmusicdialogVisible = false
        this.$message.success('批量上传任务结束')
        console.log('it is over')
        return false
      }
    },
    async zimgupurl (z, file, i) {
      console.log('5 upload接口，' + file.name)
      var ts = {
        'upload_dir': 'music_path',
        'extension': z
      }
      try {
        let dt = await axiosapi.avatarupload(ts)
        if (dt.status === 200 || dt.status === 201) {

          this.thirdpath.push(dt.data.key)
          fmdt[i].append("OSSAccessKeyId", dt.data.OSSAccessKeyId);
          fmdt[i].append("policy", dt.data.policy);
          fmdt[i].append("Signature", dt.data.Signature);
          fmdt[i].append("key", dt.data.key);
          fmdt[i].append("file", file)
          filepathfmdt[i].filepath = file.webkitRelativePath
          this.threePre_music(dt.data.key, file.webkitRelativePath, dt.data.host, i)

        }
      } catch (e) {
        this.musicupcount++
        console.log(e)
        this.stepupload()
      }
      if (this.musicupcount === fmdt.length) {
        this.$message.error('上传发生错误，中断,重新上传')
        this.excellchangedis = false
      }
    },
    threePre_music (path, filepath, host, i) {
      var uuidx = 0
      for (var q = 0; q < this.totalpathuuid.length; q++) {
        if (filepath === this.totalpathuuid[q].filepath) {
          uuidx = this.totalpathuuid[q].uuid
          this.preuuid(path, filepath, host, i, uuidx)
        }
      }

    },
    async preuuid (path, filepath, host, i, uuidx) {
      console.log('7，pre_music接口，' + filepath)
      try {
        let ls = await axi().put('/ops/pre_music/' + uuidx, {
          'path': path,
          'filepath': filepath
        })
        if (ls.status === 200) {
          this.aliyupls(host, i, filepath)

        } else {
          this.stepupload()
        }
      } catch (e) {
        this.stepupload()
        this.musicupcount++
        console.log(e)
      }
    },
    aliyupls (h, i, filepath) {
      console.log('7 阿里云接口，' + filepath)
      var ot = 0
      for (var w = 0; w < fmdt.length; w++) {
        if (filepath === filepathfmdt[w].filepath) {

          ot = w
          var that = this
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {

            if (this.readyState == 4 ) {
              that.musicupcount++
              console.log(that.musicupcount + ',' + fmdt.length)
              that.fourPre_music(that.threeuuid[i])
              if (xhttp.status == 204) {
                console.log(filepath + '：成功')
              } else {
                console.log(filepath + '：错误')
                that.stepupload()
              }
            }
          };
          xhttp.open("post", h, true);
          xhttp.send(fmdt[ot]);
        }
      }
    },
    async fourPre_music (a) {
      console.log('8 pre_music_success接口' + a)
      try {
        let ls = await axi().put('/ops/pre_music/' + a + '/success/')
        if (ls.status === 200) {
         console.log('ok:' + this.musicupcount)
        }
      } catch (e) {
        console.log('error:' + this.musicupcount)
        console.log(e)
      }
      this.stepupload()
      if (this.musicupcount === fmdt.length) {
        this.musiclist()
        this.addMassmusicdialogVisible = false
        this.$message.success('批量上传任务结束')

      } else {
        console.log('还没完')
      }
    },
    gotomusicuploadlist () {
      let routeData = this.$router.resolve({path: 'MusicUploadList'})
      window.open(routeData.href, '_blank')
    }
  }
}
