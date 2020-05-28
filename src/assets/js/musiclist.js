import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'
export default {
  name: 'MusicLists',
  data () {
    return {
      input1: '',
      value: '',
      value1: '',
      count: 0,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: '150px',
      form: {},
      tableData: [],
      currentPage3: 2,
      imageUrl: '',
      updata: {
        'upload_dir': 'playlist_cover',
        'extension': ''
      },
      updatas: {},
      updatt: {
        'upload_dir': 'playlist_cover',
        'extension': 'jpeg'
      },
      urls: '',
      uuid: '',
      catetorys: [],
      filtershow: true,
      pkeywords: '',
      created_at__gte: ''
    }
  },
  created () {
    this.play()
    this.imgupurl()
    this.catetory()
  },
  filters: {
    marks (vl) {
      if (!vl) {
        return ''
      }
      let tem = JSON.parse(localStorage.getItem('catetorysnospeed'))
      if (!tem) {
        return ''
      }
      let wd = []
      for (var i = 0; i < vl.length; i++) {
        for (var j = 0; j < tem.length; j++) {
          if (vl[i] === tem[j].id) {
            wd.push(tem[j].name)
          }
        }
      }
      return wd.toString()
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
    addplaylists () {
      this.dialogFormVisible = true
      this.imageUrl = ''
      this.form = {
        name: '',
        desc: ''
      }
    },
    async catetory () {
      try {
        let dp = await axiosapi.musiccategory()
        if (dp.status === 200) {
          for (var i = 0; i < dp.data.results.length; i++) {
            for (var x = 0; x < dp.data.results[i].children.length; x++) {
              if (dp.data.results[i].children[x].type !== 'SPEED') {
                this.catetorys.push(dp.data.results[i].children[x])
              }
            }
          }
          localStorage.setItem('catetorysnospeed', JSON.stringify(this.catetorys))
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addplay () {
      try {
        let ls = await axiosapi.addplaylist(this.form)
        if (ls.status === 201) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.play()
        }
      } catch (e) {
        console.log(e)
      }
    },
    clearsearchX () {
      this.filtershow = true
    },
    searching () {
      this.play()
    },
    searchShow () {
      this.filtershow = false
    },
    timepickerx () {
      if (!this.created_at__gte) {
        this.created_at__gte = ''
      } else {
        this.created_at__gte = this.dateFormat(this.created_at__gte)
        console.log(this.created_at__gte)
      }
      this.play()
    },
    async play () {
      try {
        // const dt = await axiosapi.playlist()
        const dt = await axi().get('/ops/playlist?ordering=-created_at&search=' + this.pkeywords + '&created_at__gte=' + this.created_at__gte)
        this.tableData = dt.data.results
        this.count = dt.data.count
      } catch (e) {
        console.log(e)
      }
    },
    async deleteconfirm () {
      try {
        let dp = await axi().delete('/ops/playlist/' + this.uuid)
        if (dp.status === 200) {
          this.dialogVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.play()
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
    detailedUser (row) {
      console.log(row)
      let routeData = this.$router.resolve({path: 'MusicListMusicDetail', query: {'uuid': row}})
      window.open(routeData.href, '_blank')
    },
    hddelete (row) {
      console.log(row)
      this.uuid = row.uuid
      this.dialogVisible = true
    },
    async schange (r) {
      this.uuid = r.uuid
      let ls
      try {
        if (r.is_active !== true) {
          ls = await axi().put('/ops/playlist/' + this.uuid + '/inactive')
        } else {
          ls = await axi().put('/ops/playlist/' + this.uuid + '/active')
        }
        if (ls.status === 200) {
          this.play()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleSizeChange (val) {
      console.log(`每页a ${val} 条`)
      try {
        let ls = await axi().get('/ops/playlist?ordering=-created_at&page_size=' + val)
        this.tableData = ls.data.results
        this.count = ls.data.count
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChange (val) {
      console.log(`当前页a: ${val}`)
      try {
        let ls = await axi().get('/ops/playlist?ordering=-created_at&page=' + val)
        this.tableData = ls.data.results
        this.count = ls.data.count
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
          this.updata.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.updata.policy = dt.data.policy
          this.updata.Signature = dt.data.Signature
          this.updata.key = dt.data.key
          this.form.cover = this.urls + '/' + dt.data.key

        }
      } catch (e) {
        console.log(e)
      }
      return isJPG && isLt2M
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
    }
  }
}
