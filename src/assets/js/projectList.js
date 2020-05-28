
import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'
import brother from '@/assets/js/brother.js'
export default {
  name: 'ProjectList',
  data () {
    return {
      stop: require('../icons/stop.gif'),
      play: require('../icons/play.png'),
      tableData: [],
      currentPage3: 1,
      count: 0,
      desc: '',
      name: '',
      created_at: '',
      dialogVisibleGrade: false,
      dialogVisible: false,
      setMuiscName: '',
      level: '',
      options: ['S', 'A', 'B', 'C'],
      onoftips: '',
      onoffuuid: '',
      onofftype: 0,
      dlddialogVisible: false,
      downloadname: '',
      dialogFormVisiblecomposer: false,
      editProdialogVisible: false,
      editproform: {},
      formedit: {},
      formLabelWidth: '150px',
      style: [],
      mood: [],
      instrument: [],
      checkedmood: [],
      instrument: [],
      checkedmood: [],
      checkedinstrument: [],
      checkedinstruments: [],
      checkedstyle: [],
      checkedspeed: [],
      xspeed: [],
      catetorys: [],
      playstatus: [],
      playeduuids: [],
      playinguuid: '',
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
    }
  },
  created () {
    this.pmlist()
    this.catetory()
    this.readproj()
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
        } else {
          return 'noplay'
        }
      }
      return '';
    },
    async readproj () {
      try {
        let dt = await axi().get('/ops/project/' + this.$route.query.uuid)
        if (dt.status === 200) {
          this.created_at = dt.data.created_at
          this.desc = dt.data.desc
          this.name = dt.data.name
          this.editproform = dt.data
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async pmlist () {
      try {
        let dt = await axi().get('/ops/project/' + this.$route.query.uuid + '/musics?ordering=-created_at&page_size=15')
        if (dt.status === 200) {
          this.playstatus = []
          for (var i = 0; i < dt.data.results.length; i++) {
            this.playstatus.push({'pl': false})
          }
          this.tableData = dt.data.results
          this.count = dt.data.count
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChangeg (val) {
      console.log(`每页a ${val} 条`)
    },
    async handleCurrentChangeg (val) {
      try {
        let ls = await axi().get('/ops/project/' + this.$route.query.uuid + '/musics?ordering=-created_at&page_size=15&page=' + val)
        if (ls.status === 200) {
          this.playstatus = []
          for (var i = 0; i < ls.data.results.length; i++) {
            this.playstatus.push({'pl': false})
          }
          this.tableData = ls.data.results
          this.count = ls.data.count
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    checkMusic (x) {
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': x}})
      window.open(routeData.href, '_blank')
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
          this.pmlist()
          this.dialogVisibleGrade = false
          this.$message.success('操作成功')
        }
      } catch (e) {
        console.log(e)
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
          this.pmlist()
          this.dialogVisible = false
          this.$message.success('操作成功')
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
    addMarks (v) {
      this.musicdetaieditonly(v)
      this.edituuid = v
      this.dialogFormVisiblecomposer = true
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
    async composermusicconfirm () {
      this.formedit.styles = this.checkedstyle
      this.formedit.moods = this.checkedmood
      this.formedit.main_instruments = this.checkedinstruments
      this.formedit.accompanied_instruments = this.checkedinstrument
      try {
        let dt = await axi().put('/ops/music/' + this.edituuid + '/edit_category/', this.formedit)
        if (dt.status === 200) {
          this.$message.success('标签成功')
          this.pmlist()
          this.dialogFormVisiblecomposer = false
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
    gotoMassxt () {
      let routeData = this.$router.resolve({path: 'ProjectDetailMass', query: {'uuid': this.$route.query.uuid}})
      window.open(routeData.href, '_blank')
    },
    editpro () {
      this.editProdialogVisible = true
    },
    async editProdialogVisiblecfm () {
      try {
        let dt = await axi().put('/ops/project/' + this.$route.query.uuid, {
          'name': this.editproform.name,
          'desc': this.editproform.desc
        })
        if (dt.status === 200) {
          this.editProdialogVisible = false
          this.$message.success('编辑成功')
          this.readproj()
        } else {
          console.log('错误')
        }
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
      this.playinguuid = ''
      this.playstatus[v.$index].pl = false
      brother.$emit('stop', v)
    }
  }
}
