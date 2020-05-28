import brother from '@/assets/js/brother.js'
import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'
export default {
  name: 'BrandDetail',
  data () {
    return {
      img: require('../icons/logo.png'),
      stop: require('../icons/stop.gif'),
      play: require('../icons/play.png'),
      dialogVisible: false,
      dialogFormVisibleedit: false,
      dialogFormVisiblea: false,
      dialogFormVisiblmusic: false,
      formLabelWidth: '150px',
      label: {},
      img: require('../icons/logo.png'),
      currentPage4: 1,
      count: 0,
      tb: [],
      countx: 0,
      tbx: [],
      uuid: '',
      routeruuid: '',
      labeluids: [],
      formedit: {},
      formb: {},
      imageUrl: '',
      updata: {
        'upload_dir': 'album_cover',
        'extension': ''
      },
      updatas: {},
      updatt: {
        'upload_dir': 'album_cover',
        'extension': 'jpeg'
      },
      updattlrc: {
        'upload_dir': 'music_path',
        'extension': 'mp3'
      },
      updattlrcx: {
        'upload_dir': 'music_path',
        'extension': ''
      },
      urls: '',
      activeName: 'first',
      formdesc: {
        name: '',
        musician_id: '',
        album_id: '',
        desc: ''
      },
      musicianlist: [],
      searchm: '',
      searmv: '',
      searchalb: '',
      searalb: '',
      muuid: '',
      playstatus: []
    }
  },
  created () {
    this.routeruuid = this.$route.query.uuid
    this.labeldetail(this.$route.query.uuid)
    this.musiclistx()
    this.albumlist()
    this.imgupurl()
    this.labelsearch()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async labelsearch () {
      try {
        let lw = await axiosapi.labelsearch()
        this.labeluids = lw.data.results
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
    async getalb () {
      try {
        var xs = await axiosapi.album()
        if (xs.status === 200) {
          console.log(xs)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async  albumlist () {
      this.count = 0
      this.tb = []
      try {
        var ls = await axi().get('/ops/label/' + this.$route.query.uuid + '/albums/')
        if (ls.status === 200) {
          this.tb = ls.data.results
          this.count = ls.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    async  musiclistx () {
      this.countx = 0
      this.tbx = []
      try {
        var ls = await axi().get('/ops/label/' + this.$route.query.uuid + '/musics/')
        if (ls.status === 200) {
          this.playstatus = []
          for (var i = 0; i < ls.data.results.length; i++) {
            this.playstatus.push({'pl': false})
          }
          this.tbx = ls.data.results
          this.countx = ls.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    async labeldetail (x) {
      try {
        let dt = await axi().get('/ops/label/' + x)
        if (dt.status === 200) {
          this.label = dt.data
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    checkAlbum (uuid) {
      console.log(uuid)
      let routeData = this.$router.resolve({path: 'AlbumDetail', query: {'uuid': uuid}})
      window.open(routeData.href, '_blank')
    },
    editAlbum (uuid) {
      this.dialogFormVisibleedit = true
      this.uuid = uuid
      this.albumdetail(this.uuid)
    },
    async editalbumConfirm () {
      this.formedit.label_id = this.$route.query.uuid
      try {
        let dt = await axi().put('/ops/album/' + this.uuid, this.formedit)
        if (dt.status === 200) {
          this.formedit = dt.data
          this.albumlist()
          //  window.location.reload()
          this.dialogFormVisibleedit = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async albumdetail () {
      try {
        let dt = await axi().get('/ops/album/' + this.uuid)
        if (dt.status === 200) {
          this.formedit = dt.data
          this.imageUrl = dt.data.cover
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    deleteAlbum (uuid) {
      this.uuid = uuid
      this.dialogVisible = true
      console.log(this.uuid)
    },
    async deleteconfirm () {
      try {
        let dp = await axi().delete('/ops/album/' + this.uuid)
        if (dp.status === 200) {
          this.dialogVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.albumlist()
          // window.location.reload()
        } else {
          console.log('错误')
        }
      } catch (e) {
        // console.log(e)
        if (e.response) {
          this.dialogVisible = false
          this.$message.error(e.response.data.detail)
        } else if (e.request) {
          console.log(e.request)
        } else {
          console.log('Error', e.message)
        }
      }
    },
    async handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      try {
        let ls = await axi().get('/ops/label' + this.$route.query.uuid + '/albums/?ordering=-created_at&page=' + val)
        this.tb = ls.data.results
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChangeg (val) {
      console.log(`当前页: ${val}`)
      try {
        let ls = await axi().get('/ops/label/' + this.$route.query.uuid + '/musics/?ordering=-created_at&page=' + val)
        if (ls.status === 200) {
          this.playstatus = []
          for (var i = 0; i < ls.data.results.length; i++) {
            this.playstatus.push({'pl': false})
          }
          this.tbx = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      try {
        this.updata.extension = file.type.replace('image/', '')
        let dt = await axiosapi.avatarupload(this.updata)
        if (dt.status === 200 || dt.status === 201) {
          this.updatas.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.updatas.policy = dt.data.policy
          this.updatas.Signature = dt.data.Signature
          this.updatas.key = dt.data.key
          this.formedit.cover = this.urls + '/' + dt.data.key
          this.formb.cover = this.urls + '/' + dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccessx (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUploadx (file) {
      console.log(file)
      this.imageUrl = file.name
      const ismp3 = file.type === 'audio/mp3'
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
        this.updata.extension = file.type.replace('audio/', '')
        let dt = await axiosapi.avatarupload(this.updata)
        if (dt.status === 200 || dt.status === 201) {
          this.updatas.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.updatas.policy = dt.data.policy
          this.updatas.Signature = dt.data.Signature
          this.updatas.key = dt.data.key
          this.formdesc.path = dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return ismp3 && iswav && isLt2M
    },
    openaddalbum () {
      this.dialogFormVisiblea = true
      this.imageUrl = ''
    },
    async addalbums () {
      this.formb.label_id = this.$route.query.uuid
      try {
        let ls = await axiosapi.addalbum(this.formb)
        if (ls.status === 201) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.albumlist()
          this.dialogFormVisiblea = false
        }
      } catch (e) {
        console.log(e)
      }
    },
    checkMusic (v) {
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': v}})
      window.open(routeData.href, '_blank')
    },
    editMusic (v) {
      this.muuid = v
      this.dialogFormVisiblmusic = true
      this.musideditonly()
      this.musicansearchs()
      this.albumsearchs()
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
    musicsearchblur (v) {
      if (v) {
        this.searchm = v
        this.musicansearchs()
      }
    },
    slemusic (v) {
      console.log(v)
      this.formdesc.musician_id = v
    },
    async musideditonly () {
      try {
        let dp = await axi().get('/ops/music/' + this.muuid)
        if (dp.status === 200) {
          this.formdesc.musician_id = dp.data.musician_id
          this.searmv = dp.data.musician_id
          this.searalb = dp.data.album_id
          this.formdesc.name = dp.data.name
          this.formdesc.album_id = dp.data.album_id
          this.formdesc.desc = dp.data.desc
          this.imageUrl = dp.data.path
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    albumsearc (v) {
      if (v) {
        this.searchalb = v
        this.albumsearchs()
      }
    },
    selectmusican (itm) {
      console.log(itm)
      this.formdesc.album_id = itm
    },
    async editmusicconfirm () {
      try {
        let dt = await axi().put('/ops/music/' + this.muuid + '/edit_info/', this.formdesc)
        if (dt.status === 200) {
          this.musiclistx()
          this.dialogFormVisiblmusic = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async playing (v) {
      if (!this.dangpl && this.dangpl !== 0) {
        this.dangpl = v.$index
        this.playstatus[v.$index].pl = true
        brother.$emit('bro', v)
      } else if (this.dangpl === v.$index) {
        this.playstatus[this.dangpl].pl = true
        this.dangpl = v.$index
        brother.$emit('bro', v)
        // brother.$emit('continue', v)
      } else {
        this.playstatus[this.dangpl].pl = false
        this.dangpl = v.$index
        this.playstatus[v.$index].pl = true
        brother.$emit('bro', v)
      }
    },
    stopplaying (v) {
      this.playstatus[v.$index].pl = false
      brother.$emit('stop', v)
    }
  }
}
