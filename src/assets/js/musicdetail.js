
import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'
import brother from '@/assets/js/brother.js'
export default {
  name: 'MusicDetail',
  data () {
    return {
      img: require('../icons/logo.png'),
      dialogFormVisibleedit: false,
      dialogFormVisiblecomposer: false,
      dialogFormVisibledesc: false,
      daddMultiVersionPop: false,
      delrltdialogVisible: false,
      daddRelateVersionPop: false,
      delalikedialogVisible: false,
      updatelyricsvisible: false,
      updateMusicfilevisible: false,
      formLabelWidth: '110px',
      formedit: {},
      formdesc: {
        name: '',
        musician_id: '',
        album_id: '',
        desc: ''
      },
      formmfile: {},
      formaddversion: {},
      formaddrelate: {},
      formeditr: {},
      addversionsearch: '',
      addrelatesearch: '',
      tableDatae: [{
        date: '2016-05-03',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 'sfd搜搜放松放松'
      }],
      detail: {},
      tablett: [],
      musiccategory: [],
      style: [],
      mood: [],
      instrument: [],
      speed: [],
      checkedmood: [],
      checkedinstrument: [],
      checkedinstruments: [],
      checkedstyle: [],
      checkedspeed: '',
      catetorys: [],
      cat: [],
      imageUrl: '',
      imageUrls: '',
      isMultiple: true,
      updata: {
        'upload_dir': 'music_path',
        'extension': ''
      },
      updatt: {
        'upload_dir': 'music_path',
        'extension': 'mp3'
      },
      updattlrc: {
        'upload_dir': 'music_lrc',
        'extension': 'lrc'
      },
      updattlrcx: {
        'upload_dir': 'music_lrc',
        'extension': ''
      },
      updatas: {},
      updatass: {},
      imgs: '',
      urls: '',
      urlss: '',
      musiclists: [],
      musiclistsx: [],
      musiclistschecked: [],
      musiclistscheckeds: [],
      tags: [],
      tagss: [],
      uuidslist: [],
      uuidslists: [],
      tracklist: [],
      uuid: '',
      delname: '',
      relatelist: [],
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
      value: '',
      curentsteps: 1,
      musicianlist: [],
      searchm: '',
      searmv: '',
      searchalb: '',
      searalb: '',
      albumlist: [],
      playingx: false,
      stop: require('../icons/stop.gif'),
      play: require('../icons/play.png')
    }
  },

  created () {
    this.musicdetail()
    this.tracks()
    this.relates()
    this.catetory()
    this.cat = JSON.parse(localStorage.getItem('catetorys'))
  },
  computed: {
    location: () => window.location
  },
  filters: {
    filblk (v) {
      if (!v) {
        return '-'
      } else {
        return v
      }
    }
  },
  methods: {
    async musicdetail () {
      try {
        let dp = await axi().get('/ops/music/' + this.$route.query.uuid)
        if (dp.status === 200) {
          this.detail = dp.data
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async musicdetaieditonly () {
      try {
        let dp = await axi().get('/ops/music/' + this.$route.query.uuid)
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
    async musideditonly () {
      try {
        let dp = await axi().get('/ops/music/' + this.$route.query.uuid)
        if (dp.status === 200) {
          this.formdesc.name = dp.data.name
          this.formdesc.album_id = dp.data.album_id
          this.formdesc.desc = dp.data.desc
          this.imageUrl = dp.data.path
          this.formdesc.musician_id = dp.data.musician_id
          this.searmv = dp.data.musician_info.name
          this.searalb = dp.data.album_info.name
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async catetory () {
      try {
        let dp = await axiosapi.musiccategory()
        if (dp.status === 200) {
          this.style = []
          this.mood = []
          this.instrument = []
          this.speed = []
          for (var i = 0; i < dp.data.count; i++) {
            if (dp.data.results[i].type === 'MOOD') {
              this.mood = dp.data.results[i].children
            }
            if (dp.data.results[i].type === 'STYLE') {
              this.style = dp.data.results[i].children
            }
            if (dp.data.results[i].type === 'SPEED') {
              this.speed = dp.data.results[i].children
            }
            if (dp.data.results[i].type === 'INSTRUMENT') {
              this.instrument = dp.data.results[i].children
            }
          }
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    editmusic () {
      this.musicdetaieditonly()
      this.dialogFormVisiblecomposer = true
    },
    nextstepx () {
      console.log(this.curentsteps)
      if (this.curentsteps < 3) {
        this.curentsteps++
      } else {
        this.curentsteps--
      }
    },
    beforestepx () {
      console.log(this.curentsteps)
      if (this.curentsteps >= 2) {
        this.curentsteps--
      } else {
        this.curentsteps++
      }
    },
    addMultiVersionPop () {
      this.uuidslist = []
      this.musicsearchlist()
      this.tags = []
      this.tagss = []
      this.musiclistschecked = []
      this.daddMultiVersionPop = true
    },
    addRelateVersionPop () {
      this.uuidslists = []
      this.musicsearchlist()
      this.tagss = []
      this.tags = []
      this.musiclistscheckeds = []
      this.daddRelateVersionPop = true
    },
    async searchLis () {
      try {
        let dp = await axi().get('/ops/music_search/?search=' + this.addversionsearch)
        if (dp.status === 200) {
          this.musiclists = dp.data.results
          this.musiclistsx = dp.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async daddMultiVersionPopcfm () {
      if (this.tags.length > 0) {
        for (var i = 0; i < this.tags.length; i++) {
          this.uuidslist.push(this.tags[i].uuid)
        }
        try {
          let dp = await axi().post('/ops/music/' + this.$route.query.uuid + '/track_add/', {'uuids': this.uuidslist})
          if (dp.status === 200) {
            this.daddMultiVersionPop = false
            this.$message({
              message: '添加多版本成功！',
              type: 'success'
            })
            this.tracks()
            this.tagss = []
            this.tags = []
          } else {
            console.log('错误')
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    async daddRelateVersionPopcfm () {
      if (this.tagss.length > 0) {
        for (var i = 0; i < this.tagss.length; i++) {
          this.uuidslists.push(this.tagss[i].uuid)
        }
        try {
          let dp = await axi().post('/ops/music/' + this.$route.query.uuid + '/relate_add/', {'uuids': this.uuidslists})
          if (dp.status === 200) {
            this.daddRelateVersionPop = false
            this.$message({
              message: '添加相似作品成功！',
              type: 'success'
            })
            this.relates()
            this.tagss = []
            this.tags = []
          } else {
            console.log('错误')
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    async musicsearchlist () {
      this.musiclistsx = []
      this.musiclists = []
      try {
        let ls = await axiosapi.musicsearch()
        if (ls.status === 200) {
          this.musiclists = ls.data.results
          this.musiclistsx = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    handleCloses (tagx) {
      this.tagss.splice(this.tagss.indexOf(tagx), 1)
    },
    handlemusiclists (v) {
      this.tags = []
      this.tags = v
    },
    handlemusiclist (x) {
      this.tagss = []
      this.tagss = x
    },
    async tracks () {
      try {
        let dp = await axi().get('/ops/music/' + this.$route.query.uuid + '/tracks/')
        if (dp.status === 200) {
          this.tracklist = dp.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async relates () {
      try {
        let dp = await axi().get('/ops/music/' + this.$route.query.uuid + '/relates/')
        if (dp.status === 200) {
          this.relatelist = dp.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    slemusic (v) {
      console.log(v)
      this.formdesc.musician_id = v
    },
    selectmusican (itm) {
      console.log(itm)
      this.formdesc.album_id = itm
    },
    async editmusicconfirm () {
      try {
        let dt = await axi().put('/ops/music/' + this.$route.query.uuid + '/edit_info/', this.formdesc)
        if (dt.status === 200) {
          this.musicdetail()
          this.dialogFormVisibleedit = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async composermusicconfirm () {
      this.formedit.styles = this.checkedstyle
      this.formedit.moods = this.checkedmood
      this.formedit.main_instruments = this.checkedinstruments
      this.formedit.accompanied_instruments = this.checkedinstrument
      try {
        let dt = await axi().put('/ops/music/' + this.$route.query.uuid + '/edit_more_info/', this.formedit)
        if (dt.status === 200) {
          this.$message.success('编辑成功')
          this.musicdetail()
          this.dialogFormVisiblecomposer = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },

    dialogFormVisibleeditclk () {
      this.dialogFormVisibleedit = true
      this.musideditonly()
      this.musicansearchs()
      this.albumsearchs()
    },
    musicsearchblur (v) {
      if (v) {
        this.searchm = v
        this.musicansearchs()
      }
    },
    albumsearc (v) {
      if (v) {
        this.searchalb = v
        this.albumsearchs()
      }
    },
    async musicansearchs () {
      try {
        let dt = await axiosapi.musicansearch(this.searchm)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt)
          this.musicianlist = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    async albumsearchs () {
      try {
        let dt = await axiosapi.albumsearch(this.searchalb)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt)
          this.albumlist = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
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
    async imgupurls () {
      try {
        let dt = await axiosapi.avatarupload(this.updattlrc)
        if (dt.status === 200 || dt.status === 201) {
          this.urlss = dt.data.host
        }
      } catch (e) {
        console.log(e)
      }
    },
    updatelyrics () {
      this.updatelyricsvisible = true
      this.imgupurls()
    },
    async updatelyricscfm () {
      try {
        let dt = await axi().put('/ops/music/' + this.$route.query.uuid + '/upload_music_lrc/', this.formeditr)
        if (dt.status === 200) {
          this.musicdetail()
          this.updatelyricsvisible = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async updatemfilescfm () {
      try {
        let dt = await axi().put('/ops/music/' + this.$route.query.uuid + '/upload_music_file/', this.formmfile)
        if (dt.status === 200) {
          this.musicdetail()
          this.updateMusicfilevisible = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleAvatarSuccesssl (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUploadsl (file) {
      console.log(file)
      this.imageUrls = file.name
      const istext = file.type === 'text/plain'
      const islrc = file.name.substring(file.name.length - 4) === '.lrc'
      if (istext || islrc) {
        console.log('ok')
      } else {
        this.$message.error('歌词文件格式不符')
        this.imageUrls = ''
        return
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传歌词文件大小不能超过 1MB!')
      }
      try {
        if (istext) {
          this.updattlrcx.extension = 'text'
        } else {
          this.updattlrcx.extension = 'lrc'
        }

        let dt = await axiosapi.avatarupload(this.updattlrcx)
        if (dt.status === 200 || dt.status === 201) {
          this.updatass.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.updatass.policy = dt.data.policy
          this.updatass.Signature = dt.data.Signature
          this.updatass.key = dt.data.key
          this.formeditr.lrc_path = dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return istext && islrc && isLt2M
    },
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload (file) {
      console.log(file)
      this.imageUrl = file.name
      const ismp3 = file.type === 'audio/mpeg'
      const iswav = file.type === 'audio/wav'
      if (ismp3 || iswav) {
        console.log('ok')
      } else {
        this.$message.error('音乐文件格式不符')
        this.imageUrl = ''
        return
      }
      const isLt2M = file.size / 1024 / 1024 < 22
      if (!isLt2M) {
        this.$message.error('上传音乐文件大小不能超过 22MB!')
      }
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
          this.formmfile.path = dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return ismp3 && iswav && isLt2M
    },
    handleAvatarSuccesss (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUploads (file) {
      console.log(file)
      this.imageUrls = file.name
      const istext = file.type === 'text/plain'
      const islrc = file.name.substring(file.name.length - 4) === '.lrc'
      if (istext || islrc) {
        console.log('ok')
      } else {
        this.$message.error('歌词文件格式不符')
        this.imageUrls = ''
        return
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传歌词文件大小不能超过 1MB!')
      }
      try {
        if (istext) {
          this.updattlrcx.extension = 'text'
        } else {
          this.updattlrcx.extension = 'lrc'
        }

        let dt = await axiosapi.avatarupload(this.updattlrcx)
        if (dt.status === 200 || dt.status === 201) {
          this.updatass.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.updatass.policy = dt.data.policy
          this.updatass.Signature = dt.data.Signature
          this.updatass.key = dt.data.key
          this.formedit.lrc_path = dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return istext && islrc && isLt2M
    },
    musicdetailck (x) {
      this.$router.push(
        {
          path: 'MusicDetail',
          query: {'uuid': x}
        }
      )
      window.location.reload()
    },
    async deleteconfirm () {
      try {
        let dt = await axi().post('/ops/music/' + this.$route.query.uuid + '/track_remove/', {'uuids': [this.uuid]})
        if (dt.status === 200) {
          this.tracks()
          this.delrltdialogVisible = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async deleteconfirmrlt () {
      try {
        let dt = await axi().post('/ops/music/' + this.$route.query.uuid + '/relate_remove/', {'uuids': [this.uuid]})
        if (dt.status === 200) {
          this.relates()
          this.delalikedialogVisible = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    musicdelrelate (y) {
      this.uuid = y.uuid
      this.delname = y.name
      this.delrltdialogVisible = true
    },
    musicdellike (y) {
      this.uuid = y.uuid
      this.delname = y.name
      this.delalikedialogVisible = true
    },
    goback () {
      this.$router.go(-1)
    },
    updatemusicfile () {
      this.updateMusicfilevisible = true
      this.imgupurl()
    },
    async downloadm (v) {
      console.log(v)
      try {
        let dp = await axi().get('/ops/music/' + this.$route.query.uuid + '/' + v + '?disposition=attachment')
        if (dp.status === 200) {
          this.$message.success('下载成功')
          window.open(dp.data.url)
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.$message.error(e.response.data.detail)
        }
      }
    },
    async playing (v) {
        this.playingx = true
        var xplaym = {}
        xplaym.uuid = v.uuid
        xplaym.name = v.name
        brother.$emit('playm', xplaym)
    },
    stopplaying (v) {
      this.playingx = false
      brother.$emit('stop', v)
    },
    async oonline (v) {
      try {
        let dp = await axi().put('/ops/music/' + v + '/set_online/')
        if (dp.status === 200) {
          this.$message.success('上线成功')
          this.musicdetail()
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.$message.error(e.response.data.detail)
        }
      }
    },
    async offnline (v) {
      try {
        let dp = await axi().put('/ops/music/' + v + '/set_offline/')
        if (dp.status === 200) {
          this.$message.success('下线成功')
          this.musicdetail()
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.$message.error(e.response.data.detail)
        }
      }
    }
  }
}
