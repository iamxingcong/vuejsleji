
import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'

export default {
  name: 'AlbumFilter',
  data () {
    return {
      dialogVisible: false,
      dialogFormVisiblea: false,
      dialogFormVisibleedit: false,
      count: 0,
      currentPage1: 1,
      formLabelWidth: '90px',
      form: {
        name: ''
      },
      formb: {
        name: '',
        album_no: '',
        cover: '',
        desc: '',
        label_id: ''
      },
      formedit: {},
      checkAll: false,
      isIndeterminate: true,
      img: require('../icons/logo.png'),
      tags: [],
      tableData: [],
      labeluids: [],
      musicianuids: [],
      musicansearch: '',
      radiom: {
        name: '',
        uuid: ''
      },
      radioa: {
        name: '',
        uuid: ''
      },
      radiolabeluuid: {
        uuid: '',
        name: ''
      },
      searchm:'',
      radiomusicanid: {
        uuid: '',
        name: ''
      },
      uuid: '',
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
      urls: '',
      rulesb: {
        name: [
          {required: true, message: '专辑名必填', trigger: 'blur'}
        ],
        label_id: [
          {required: true, message: '厂牌必选', trigger: 'blur'}
        ]
      },
      pkeywords: '',
      filtershow: true
    }
  },
  created () {
    this.labelsearch()
    this.albumlist()
    this.imgupurl()
    this.musiciansearch()
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
    async albumlist () {
      try {
        let ab = await axi().get('/ops/album/?ordering=-created_at&label_id=' + this.radiom.uuid + '&musician_id=' +
        this.radioa.uuid + '&search=' + this.pkeywords)
        this.tableData = ab.data.results
        this.count = ab.data.count
      } catch (e) {
        console.log(e)
      }
    },
    async handleSizeChange (val) {
      try {
        let ls = await axi().get('/ops/album?ordering=-created_at&page_size=' + val +
        '&label_id=' + this.radiom.uuid + '&musician_id=' +
        this.radioa.uuid + '&search=' + this.pkeywords)
        this.tableData = ls.data.results
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChange (val) {
      try {
        let ls = await axi().get('/ops/album?ordering=-created_at&page=' + val +
        '&label_id=' + this.radiom.uuid + '&musician_id=' +
        this.radioa.uuid + '&search=' + this.pkeywords)
        this.tableData = ls.data.results
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
        let lw = await axiosapi.musicansearch(this.searchm)
        this.musicianuids = lw.data.results
      } catch (e) {
        console.log(e)
      }
    },
    checkAlbum (x) {
      let routeData = this.$router.resolve({path: 'AlbumDetail', query: {'uuid': x}})
      window.open(routeData.href, '_blank')
    },
    editAlbum (uuid) {
      this.dialogFormVisibleedit = true
      this.uuid = uuid
      this.albumdetail(this.uuid)
    },
    async editalbumConfirm () {
      try {
        let dt = await axi().put('/ops/album/' + this.uuid, this.formedit)
        if (dt.status === 200) {
          this.formedit = dt.data
          this.albumlist()
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
    deleteAlbum (x) {
      this.uuid = x
      this.dialogVisible = true
    },
    async deleteconfirm (uuid) {
      try {
        let dp = await axi().delete('/ops/album/' + this.uuid)
        if (dp.status === 200) {
          this.dialogVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.albumlist()
        } else {
          console.log('错误')
        }
      } catch (e) {
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
    handleCheckedLabelsChange () {
      console.log(this.radiom)
      this.albumlists()
    },
    mhandleCheckedLabelsChange () {
      console.log(this.radioa)
      this.albumlists()
    },
    searching () {
      this.albumlists()
    },
    async albumlists () {
      try {
        let ab = await axi().get('/ops/album/?label_id=' + this.radiom.uuid + '&musician_id=' +
        this.radioa.uuid + '&search=' + this.pkeywords)
        this.tableData = ab.data.results
        this.count = ab.data.count
      } catch (e) {
        console.log(e)
      }
    },
    cltag (vl) {
      console.log(vl.name)
      this.tags.splice(this.tags.indexOf(vl), 1)
    },
    openaddalbum () {
      this.dialogFormVisiblea = true
      this.imageUrl = ''
    },
    async addalbums (formb) {
      this.$refs[formb].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })

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
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload (file) {
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
        this.updata.extension = file.type.replace('image/', '')
        let dt = await axiosapi.avatarupload(this.updata)
        if (dt.status === 200 || dt.status === 201) {
          this.updatas.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.updatas.policy = dt.data.policy
          this.updatas.Signature = dt.data.Signature
          this.updatas.key = dt.data.key
          this.form.cover = this.urls + '/' + dt.data.key
          this.formb.cover = this.urls + '/' + dt.data.key
          this.formedit.cover = this.urls + '/' + dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return isJPG && isLt2M && isPNG && isGIF
    },
    xclearsearch () {
      this.radiom = {
        name: '',
        uuid: ''
      }
      this.albumlists()
    },
    clearsearch () {

      this.radioa = {
        name: '',
        uuid: ''
      }
      this.albumlists()
    },
    searchShow () {
      this.filtershow = false
    },
    clearsearchX () {
      this.filtershow = true
    }
  }
}
