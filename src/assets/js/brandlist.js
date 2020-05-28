
import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'BrandLists',
  data () {
    return {
      img: require('../icons/logo.png'),
      input: '',
      ms: [],
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      currentPage4: 1,
      currentPage3: 1,
      count: 0,
      form: {
        name: '',
        desc: '',
        logo: ''
      },
      forme: {
        name: '',
        desc: '',
        logo: ''
      },
      formLabelWidth: '150px',
      uuid: '',
      alb: [],
      imageUrl: '',
      isMultiple: true,
      updata: {
        'upload_dir': 'label_logo',
        'extension': ''
      },
      updatas: {},
      updatt: {
        'upload_dir': 'label_logo',
        'extension': 'jpeg'
      },
      urls: '',
      pkeywords: '',
      filtershow: true
    }
  },
  created () {
    this.mlist()
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
    async mlist () {
      try {
        let ls = await axiosapi.getlabel()
        this.ms = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    brandDetail: function (x) {
      let routeData = this.$router.resolve({path: 'BrandDetail', query: {'uuid': x}})
      window.open(routeData.href, '_blank')
    },
    openadd () {
      this.dialogFormVisible = true
      this.imageUrl = ''
      this.form = {
        name: '',
        desc: '',
        logo: ''
      }
    },
    async deleteconfirm () {
      try {
        let dp = await axi().delete('/ops/label/' + this.uuid)
        if (dp.status === 200) {
          this.dialogVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.mlist()
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
    deleteBrand (x) {
      this.uuid = x
      this.dialogVisible = true
    },
    async handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      try {
        let ls = await axi().get('/ops/label?ordering=-created_at&page_size=' + val)
        this.ms = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      try {
        let ls = await axi().get('/ops/label?ordering=-created_at&page=' + val + '&search=' + this.pkeywords)
        this.ms = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    checkDetail: function (x) {
      this.$router.push('AlbumDetail')
      console.log(x)
    },
    editlabel (x) {
      this.uuid = x
      this.dialogFormVisibleEdit = true
      this.labeldetail()
    },
    async labeldetail () {
      try {
        let dt = await axi().get('/ops/label/' + this.uuid)
        if (dt.status === 200) {
          this.forme = dt.data
          this.imageUrl = dt.data.logo
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addlabels () {
      try {
        let ls = await axiosapi.addlabel(this.form)
        if (ls.status === 201) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.mlist()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async editlabelconfirm () {
      try {
        let ls = await axi().put('/ops/label/' + this.uuid, this.forme)
        if (ls.status === 201 || ls.status === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialogFormVisibleEdit = false
          this.mlist()
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
          this.form.logo = this.urls + '/' + dt.data.key
          this.forme.logo = this.urls + '/' + dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return isJPG && isLt2M
    },
    async searching () {
      try {
        let ls = await axi().get('/ops/label?ordering=-created_at&search=' + this.pkeywords)
        if (ls.status === 200) {
          this.count = ls.data.count
          this.ms = ls.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    clearsearch () {
      this.searching()
      this.filtershow = true
    },
    searchShow () {
      this.filtershow = false
    }

  }
}
