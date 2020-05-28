
import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'ArtistList',
  data () {
    return {
      img: require('../icons/logo.png'),
      dtl: [],
      dialogAddFormVisible: false,
      form: {
        avatar: ''
      },
      eform: {
        avatar: ''
      },
      formLabelWidth: '120px',
      imageUrl: '',
      isMultiple: true,
      updata: {
        'upload_dir': 'musician_avatar',
        'extension': ''
      },
      updatas: {},
      updatt: {
        'upload_dir': 'musician_avatar',
        'extension': 'jpeg'
      },
      urls: '',
      labeluids: [],
      currentPage1: 1,
      count: 0,
      dialogDelVisible: false,
      dialogeditFormVisible: false,
      uuid: '',
      name: '',
      filtershow: true,
      pkeywords: ''
    }
  },
  created () {
    this.dt()
    this.imgupurl()
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
    async dt () {
      try {
        let ab = await axiosapi.musician()
        this.dtl = ab.data.results
        this.count = ab.data.count
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
    addartisx () {
      this.labelsearch()
      this.dialogAddFormVisible = true
    },
    async addartstcfm () {
      try {
        let dt = await axiosapi.musicianadd(this.form)
        if (dt.status === 200 || dt.status === 201) {
          this.dialogAddFormVisible = false
          this.$message.success('添加成功')
          this.dt()
        } else {
          console.log('错误')
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
          this.form.avatar = this.urls + '/' + dt.data.key
          this.eform.avatar = this.urls + '/' + dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return isJPG && isLt2M
    },
    async handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      try {
        let ls = await axi().get('/ops/musician?ordering=-created_at&page=' + val)
        this.dtl = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    delx (v) {
      console.log(v)
      this.uuid = v.uuid
      this.name = v.name
      this.dialogDelVisible = true
    },
    async deleteconfirm () {
      try {
        let dp = await axi().delete('/ops/musician/' + this.uuid)
        if (dp.status === 200) {
          this.dialogDelVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.dt()
        } else {
          console.log('错误')
        }
      } catch (e) {
        // console.log(e)
        if (e.response) {
          this.dialogDelVisible = false
          this.$message.error(e.response.data.detail)
        } else if (e.request) {
          console.log(e.request)
        } else {
          console.log('Error', e.message)
        }
      }
    },
    edit (v) {
      console.log(v)
      this.uuid = v.uuid
      this.labelsearch()
      this.getdetail()
      this.dialogeditFormVisible = true
    },
    async getdetail () {
      try {
        let ls = await axi().get('/ops/musician/' + this.uuid)
        this.eform = ls.data
        this.eform.lable_id = ls.data.uuid
        this.imageUrl = ls.data.avatar
      } catch (e) {
        console.log(e)
      }
    },
    async editartstcfm () {
      try {
        let ls = await axi().put('/ops/musician/' + this.uuid, this.eform)
        if (ls.status === 200) {
          this.$message.success('更新成功')
          this.dt()
          this.dialogeditFormVisible = false
        }
      } catch (e) {
        console.log(e)
      }
    },
    async gotoDetail (v) {
      console.log(v)
      let routeData = this.$router.resolve({path: 'ArtistDetail', query: {'uuid':  v.uuid}})
      window.open(routeData.href, '_blank')
    },
    async searching () {
      try {
        let ls = await axi().get('/ops/musician?ordering=-created_at&search=' + this.pkeywords)
        if (ls.status === 200) {
          this.count = ls.data.count
          this.dtl = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    clearsearchX () {
      this.searching()
      this.filtershow = true
    },
    searchShow () {
      this.filtershow = false
    }

  }
}
