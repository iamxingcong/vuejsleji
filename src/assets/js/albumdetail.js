import brother from '@/assets/js/brother.js'
import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'

export default {
  name: 'AlbumDetail',
  data () {
    return {
      img: require('../icons/logo.png'),
      stop: require('../icons/stop.gif'),
      play: require('../icons/play.png'),
      tableDatab: [],
      currentPage4: 1,
      count: 0,
      alblist: {
        musician_info: {
          name:''
        }
      },
      formedit: {
        name: '',
        music_no: '',
        lyricist: '',
        composer: '',
        arranged_by: '',
        path: '',
        desc: ''
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      dialogFormVisibleedit: false,
      adialogFormVisibleedit: false,
      dialogVisible: false,
      uuid: '',
      uuids: [],
      musicuuid: '',
      addmusicuuid: '',
      addmarr: [],
      imageUrl: '',
      aimageUrl: '',
      isMultiple: true,
      updata: {
        'upload_dir': 'music_path',
        'extension': ''
      },
      updatt: {
        'upload_dir': 'music_path',
        'extension': 'mp3'
      },
      aupdatt: {
        'upload_dir': 'album_cover',
        'extension': 'jpeg'
      },
      aupdata: {
        'upload_dir': 'album_cover',
        'extension': ''
      },
      audiodatas: {},
      picdatas: {},
      imgs: '',
      urls: '',
      aurls: '',
      musiclists: [],
      musiclistschecked: [],
      musiclistscheckeds: [],
      formaddversion: {},
      addversionsearch: '',
      tags: [],
      uuidslist: [],
      playstatus: [],
      dialogFormVisibleaddmusic: false,
      ready: false,
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
      albumcomposer: '',
      aformedit: {

      },
      musicianuids: [],
      labeluids: [],
      asearchm:''
    }
  },
  created () {
    this.albumlist(this.$route.query.uuid)
    this.musliclist(this.$route.query.uuid)
    this.imgupurl()
    this.aimgupurl()
    this.labelsearch()
    this.musiciansearch()
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
    async aimgupurl () {
      try {
        let dt = await axiosapi.avatarupload(this.aupdatt)
        if (dt.status === 200 || dt.status === 201) {
          this.aurls = dt.data.host
        }
      } catch (e) {
        console.log(e)
      }
    },
    async albumlist (x) {
      try {
        let dt = await axi().get('/ops/album/' + x)
        if (dt.status === 200) {
          this.alblist = dt.data
          if (!dt.data.musician_info) {
            this.albumcomposer = '--'
          } else {
            this.albumcomposer = dt.data.musician_info.name
          }
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async musliclist (x) {
      try {
        let dt = await axi().get('/ops/music/?album_id=' + x)
        if (dt.status === 200) {
          this.playstatus = []
          for (var i = 0; i < dt.data.results.length; i++) {
            this.playstatus.push({'pl': false})
          }
          this.tableDatab = dt.data.results
          this.count = dt.data.count
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },

    async musicsearchlist () {
      try {
        let ls = await axiosapi.musicsearchalb(this.addversionsearch)
        if (ls.status === 200) {
          this.playstatus = []
          for (var i = 0; i < ls.data.results.length; i++) {
            this.playstatus.push({'pl': false})
          }
          this.musiclists = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    searchm () {
      this.musicsearchlist()
      console.log(this.addversionsearch)
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
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
        this.form
        let ls = await axiosapi.addmusic(this.form)
        if (ls.status === 201) {
          this.ready = false
          this.musliclist(this.$route.query.uuid)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialogFormVisibleaddmusic = false
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
    async bak_addmusics () {
      if (this.tags.length > 0) {
        this.addmarr = []
        for (var i = 0; i < this.tags.length; i++) {
          this.addmarr.push(this.tags[i].uuid)
        }
        try {
          let ls = await axi().post('/ops/album/' + this.$route.query.uuid + '/musics_add/', {'uuids': this.addmarr})
          if (ls.status === 201 || ls.status === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.addmarr = []
            this.dialogFormVisible = false
            this.musliclist(this.$route.query.uuid)
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    async editmusicconfirm () {
      try {
        let dt = await axi().patch('/ops/music/' + this.musicuuid, this.formedit)
        if (dt.status === 200) {
          this.musliclist(this.$route.query.uuid)
          this.dialogFormVisibleedit = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleAvatarSuccess (res, file, filelist) {
      console.log(res)
      console.log(file)
      console.log(filelist)
      if (file.status === 'success') {
        this.ready = true
      }
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload (file) {
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
      const isLt2M = file.size / 1024 / 1024 < 72
      if (!isLt2M) {
        this.$message.error('上传音乐文件大小不能超过 72MB!')
      }
      try {
        // this.updata.extension = file.type.replace('audio/', '')
        let indx = file.name.lastIndexOf('.');
        this.updata.extension = file.name.substr(indx + 1, file.name.length)
        let dt = await axiosapi.avatarupload(this.updata)
        if (dt.status === 200 || dt.status === 201) {
          this.audiodatas.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.audiodatas.policy = dt.data.policy
          this.audiodatas.Signature = dt.data.Signature
          this.audiodatas.key = dt.data.key
          this.formedit.path = this.urls + '/' + dt.data.key
          this.form.path = dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return ismp3 && iswav && isLt2M
    },
    ahandleAvatarSuccess (res, file) {
      this.aimageUrl = URL.createObjectURL(file.raw)
    },
    async abeforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      if (isJPG || isPNG || isGIF) {
        console.log('符合')
      } else {
        this.$message.error('图片格式不符合')
        return
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      try {
        this.aupdata.extension = file.type.replace('image/', '')
        let dt = await axiosapi.avatarupload(this.aupdata)
        if (dt.status === 200 || dt.status === 201) {
          this.picdatas.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.picdatas.policy = dt.data.policy
          this.picdatas.Signature = dt.data.Signature
          this.picdatas.key = dt.data.key
          this.form.cover = this.aurls + '/' + dt.data.key
          this.aformedit.cover = this.aurls + '/' + dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return isJPG && isLt2M && isPNG && isGIF
    },
    async handleSizeChange (val) {
      try {
        let dt = await axi().get('/ops/music/?album_id=' + this.$route.query.uuid + '&page_size=' + val)
        if (dt.status === 200) {
          this.tableDatab = dt.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChange (val) {
      try {
        let dt = await axi().get('/ops/music/?album_id=' + this.$route.query.uuid + '&page=' + val)
        if (dt.status === 200) {
          this.tableDatab = dt.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    checkMusic (x) {
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': x}})
      window.open(routeData.href, '_blank')
    },
    editMusic (x) {
      this.musicuuid = x
      this.dialogFormVisibleedit = true
      this.musicdetail()
    },
    async musicdetail () {
      try {
        let dt = await axi().get('/ops/music/' + this.musicuuid)
        if (dt.status === 200) {
          this.formedit.name = dt.data.name
          this.formedit.music_no = dt.data.music_no
          this.formedit.lyricist = dt.data.lyricist
          this.formedit.composer = dt.data.composer
          this.formedit.arranged_by = dt.data.arranged_by
          this.formedit.path = dt.data.path
          this.formedit.desc = dt.data.desc
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    deleteMusic (x) {
      this.uuid = x
      this.dialogVisible = true
    },
    async deleteconfirm () {
      let dts = {
        'uuids': this.uuids
      }
      this.uuids.push(this.uuid)
      try {
        let dp = await axi().post('/ops/album/' + this.$route.query.uuid + '/music_remove/', dts)
        if (dp.status === 200) {
          this.dialogVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.uuids = []
          this.musliclist(this.$route.query.uuid)
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
    handlemusiclists (v) {
      this.tags = v
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
    },
    addmusicpop () {
      this.dialogFormVisibleaddmusic = true
      this.imageUrl = ''
    },
    handErrox (err, file, fileList) {
      console.log(err)
    },
    editAlbum () {
      this.dialogFormVisibleedit = true
      this.albumdetail()
    },
    async editalbumConfirm () {
      try {
        let dt = await axi().put('/ops/album/' + this.$route.query.uuid, this.aformedit)
        if (dt.status === 200) {
          this.albumlist(this.$route.query.uuid)
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
        let dt = await axi().get('/ops/album/' + this.$route.query.uuid)
        if (dt.status === 200) {
          this.aformedit = dt.data
          this.aimageUrl = dt.data.cover
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async labelsearch () {
      try {
        let lw = await axiosapi.labelsearch()
        this.labeluids = lw.data.results
      } catch (e) {
        console.log(e)
      }
    },
    async musiciansearch () {
      try {
        let lw = await axiosapi.musicansearch(this.asearchm)
        this.musicianuids = lw.data.results
      } catch (e) {
        console.log(e)
      }
    },
    remoteMethod (c) {
      this.asearchm = c
      this.musiciansearch()
      console.log('remoteMethod')
    },
  }
}
