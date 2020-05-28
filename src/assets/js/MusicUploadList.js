import axi from '@/config/axi'
import axiosapi from '@/config/axiosapi'

export default {
  name: 'MusicUploadList',
  data () {
    return {
      dt: [],
      uploadsp: '上传总音乐',
      status: '',
      currentPage: 1,
      count: 0,
      agent: 0,
      created_at__gte: '',
      created_at__lt: '',
      newly: true,
      settim: true,
      excellchangedis: false,
      addSinglemusicdialogVisible: false,
      formLabelWidthmsup: '90px',
      multiform: {},
      fileactive: '',
      filetipx: '请选择音乐文件',
      fmname: new FormData(),
      reupld: {},
      failedmusicname: '音乐上传'
    }
  },
  created () {
    this.prext()
    this.testspeed()
  },
  methods: {
    testspeed () {
      var imageAddr = "https://www.speaklowmusic.cn/static/img/photo.97f157c.png" + "?n=" + Math.random();
      var startTime, endTime;
      var downloadSize = 73001;
      var download = new Image();


      download.onload = function () {
          endTime = (new Date()).getTime();
          showResults()
      }
      startTime = (new Date()).getTime();
      download.src = imageAddr;
      var that = this
      function showResults() {
        var duration = (endTime - startTime) / 1000; //Math.round()
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        that.agent = speedMbps
        console.log("Your connection speed is: \n" +
              speedBps + " bps\n"   +
              speedKbps + " kbps\n" +
              speedMbps + " Mbps\n" );
      }
    },
    async prext () {
      this.newly = true
      // /ops/pre_music/newly/
      try {
        let ls = await axi().get('/ops/pre_music/newly')
        if (ls.status === 200) {
          this.dt = ls.data.results
          this.count = ls.data.count
          for (var z = 0; z < ls.data.results.length; z++) {
            this.dt[z].ctl = Math.floor(Math.random()*100)
          }

          setTimeout(() =>{
              if (this.settim) {
                this.prext()
                this.settim = true
              } else {
                console.log('no set time out')
              }

          }, 6000);
        }
      } catch (e) {
        this.prext()
        console.log(e)
      }
    },
    async lists () {
      this.settim = false
      try {
        let ls = await axi().get('/ops/pre_music/?status=' + this.status + '&page_size=15' +
        '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt)
        if (ls.status === 200) {
          this.newly = false
          this.dt = ls.data.results
          this.count = ls.data.count
          for (var z = 0; z < ls.data.results.length; z++) {
            this.dt[z].ctl = Math.floor(Math.random()*100)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChange (page) {
      try {
        let ls = await axi().get('/ops/pre_music/?status=' + this.status + '&page_size=15' +
        '&page=' + page + '&created_at__gte=' + this.created_at__gte + '&created_at__lt=' + this.created_at__lt)
        if (ls.status === 200) {
          this.dt = ls.data.results
          this.count = ls.data.count
          for (var z = 0; z < ls.data.results.length; z++) {
            this.dt[z].ctl = Math.floor(Math.random()*100)
          }

        }
      } catch (e) {
        console.log(e)
      }
    },
    check (v) {
      console.log(v)
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': v}})
      window.open(routeData.href, '_blank')
    },
    uploads (v, z) {
      this.uploadsp = z
      if (!v) {
        this.status = ''
      } else  if ( v && v === 'all') {
        this.status = ''
      } else {
        this.status = v
      }
      this.lists()
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
      this.lists()
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
      this.lists()
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
    async fileuplaodchange () {
      console.log("fileuplaodchange")
      var fi = document.getElementById("multimusicupx").files[0]
      this.fileactive = 'actived'

      this.filetipx = fi.name
    },
    reupload (r) {
      this.failedmusicname = r.name
      this.excellchangedis = false
      this.filetipx = '请选择音乐文件'
      this.fileactive = ''
      console.log(r)
      this.addSinglemusicdialogVisible = true
      this.reupld = r
    },
    async fourPre_music (a) {

      try {
        let ls = await axi().put('/ops/pre_music/' + a + '/success/')
        if (ls.status === 200) {
          this.addSinglemusicdialogVisible = false
          this.$message.success('上传成功')
          this.lists()
        }
      } catch (e) {
        this.addSinglemusicdialogVisible = false
        this.$message.success('上传失败')
        this.lists()
        console.log(e)
      }

    },
    aliyupls (host) {

          var that = this
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {

            if (this.readyState == 4 ) {

              that.fourPre_music(that.reupld.uuid)
              if (xhttp.status == 204) {
                console.log('成功')
              } else {
                console.log('错误')
              }
            }
          };
          xhttp.open("post", host, true);
          xhttp.send(that.fmname);


    },
    async uploadd (host, key) {
      try {
        let ls = await axi().put('/ops/pre_music/' + this.reupld.uuid, {
          'path': key,
          'filepath': this.reupld.filepath
        })
        if (ls.status === 200) {
          this.aliyupls(host)
        }
      } catch (e) {

        console.log(e)
      }
    },
    async zimgupurl (z, file) {

      var ts = {
        'upload_dir': 'music_path',
        'extension': z
      }
      try {
        let dt = await axiosapi.avatarupload(ts)
        if (dt.status === 200 || dt.status === 201) {
          this.fmname.append("OSSAccessKeyId", dt.data.OSSAccessKeyId);
          this.fmname.append("policy", dt.data.policy);
          this.fmname.append("Signature", dt.data.Signature);
          this.fmname.append("key", dt.data.key);
          this.fmname.append("file", file);
          this.uploadd(dt.data.host, dt.data.key)
        }
      } catch (e) {

        console.log(e)
      }
    },
    musicmassupbegin () {
      this.excellchangedis = true
      var fipth = document.getElementById("multimusicupx")
      var fi = document.getElementById("multimusicupx").files[0]

      this.reupld.path = fipth.value
      console.log(fipth.value)
      const ismp3 = fi.type === 'audio/mpeg'
      const iswav = fi.type === 'audio/wav'
      if (ismp3 || iswav) {
        let indx = fi.name.lastIndexOf('.');
        let tp = fi.name.substr(indx + 1, fi.name.length)
        this.zimgupurl(tp, fi)
      } else {
        console.log('文件不符合')
        return
      }
    }
  }
}
