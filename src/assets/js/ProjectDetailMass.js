import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JSZip from "jszip"
import JSZipUtils from 'jszip-utils'
Vue.use(VueAxios, axios)
var total = 0;
var countx  = 0;
var zip = new JSZip()
var music_files = zip.folder("musics")
var excell = zip.folder("excell")
export default {
  name: 'ProjectDetailMass',
  data () {
    return {
      finished: require('@/assets/icons/finished.gif'),
      dccg: require('@/assets/icons/dccg.png'),
      tableData: [],
      currentPage3: 1,
      count: 0,
      multipleSelectionAll: [],
      multipleSelection: [],
      music_uuids: [],
      dtl: [],
      selectObj: {},
      downloadlist: [],
      idKey: 'uuid',
      exportf: false,
      zurls: [],
      progress: 0,
      errorlist: [],
      formLabelWidthedit: '100px',
      tipsxdialogVisible: false,
      formexport: {},
      formexportcsed: [],
      exportdt: [],
      dialogFormVisibleexportdt: false,
    }
  },
  created () {
    this.pmlist()
  },
  methods: {
    async pmlist () {
      this.memoryChecked()
      try {
        let dt = await axi().get('/ops/project/' + this.$route.query.uuid + '/musics?page_size=15')
        if (dt.status === 200) {
          this.tableData = dt.data.results
          this.count = dt.data.count
          this.dtl = dt.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
      setTimeout(() => {
        this.handleSelectSingl()
      }, 2200)
    },
    async rpmlist () {
      try {
        let dt = await axi().get('/ops/project/' + this.$route.query.uuid + '/musics?page_size=15')
        if (dt.status === 200) {
          this.tableData = dt.data.results
          this.count = dt.data.count
          this.dtl = dt.data.results
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
      setTimeout(() => {
        this.handleSelectSingl()
      }, 2200)
    },
    async handleCurrentChangeg (val) {
      console.log(`当前页a: ${val}`)
      this.memoryChecked()
      try {
        let dt = await axi().get('/ops/project/' + this.$route.query.uuid + '/musics?page=' + val + '&page_size=15')
        if (dt.status === 200) {
          this.tableData = dt.data.results
          this.count = dt.data.count
          this.dtl = dt.data.results
        } else {
          console.log('错误')
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
      // console.log(this.music_uuids)
      // console.log(this.music_uuids.indexOf(r.uuid))
      if (v.indexOf(r) < 0) {
        this.music_uuids.splice(this.music_uuids.indexOf(r.uuid), 1)
      }
      console.log(v)
      console.log(r)
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
    cclearchoose () {
      this.multipleSelectionAll = []
      this.multipleSelection = []
      this.music_uuids = []
      this.pmlist()
    },
    async removeMusic () {
      // POST /ops/project/{uuid}/music_remove/
      // uuids 音乐UUID列表
      console.log(this.music_uuids)
      try {
        let dt = await axi().post('/ops/project/' + this.$route.query.uuid + '/music_remove', {
          'uuids': this.music_uuids
        })
        if (dt.status === 200) {
           this.rpmlist()
           this.$message.success('移除成功')
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    downloadMusic () {
      this.downloadlist = this.music_uuids
      this.downop()
    },
    downop () {
       if (this.downloadlist.length > 0) {
         for (var x = 0; x < this.downloadlist.length; x++) {
          this.judgedloads(this.downloadlist[x])
         }
       } else {
         return false
       }
    },

    async judgedloads (v) {
      try {
        let dp = await axi().get('/ops/music/' + v + '/path')
        if (dp.status === 200) {
          this.downloadMusict(v)
        } else {
          console.log('链接不存在')
        }
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.detail)
          console.log(e)
          this.downloadlist.splice(this.downloadlist.indexOf(v), 1)
          this.downop()
        }

      }
    },
    async bak_downloadMusict (x) {
      try {
        let dt = await axi().get('/ops/music/' + x + '/path?disposition=attachment')
        if (dt.status === 200) {
           window.open(dt.data.url)
           this.$message.success('下载成功')
           this.downloadlist.splice(this.downloadlist.indexOf(x), 1)
           this.downop()
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
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
    }
  }
}
