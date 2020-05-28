
import axi from '@/config/axi'
export default {
  name: 'DownloadList',
  data () {
    return {
      plisx: [],
      downloadtitle: '总排行',
      dcreated_at__gt: '',
      dcreated_at__lte: ''
    }
  },
  created () {
    this.sx()
  },
  methods: {
    async sx () {
      try {
        let xlis = await axi().get('/ops/download/?type=DOWNLOAD&created_at__gt=' + this.dcreated_at__gt + '&created_at__lte=' + this.dcreated_at__lte)
        if (xlis.status === 200) {
          this.plisx = xlis.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    dtotalRank () {
      this.downloadtitle = '总排行'
      this.dcreated_at__gt = ''
      this.dcreated_at__lte = ''
      this.sx()
    },
    dtodayRank () {
      this.downloadtitle = '今日排行'
      this.dcreated_at__gt = this.curentTime()
      this.dcreated_at__lte = ''
      this.sx()
    },
    dorderstt () {
      console.log(this.dcreated_at__gt)
      if (this.dcreated_at__gt) {
        this.dcreated_at__gt = this.dateFormat(this.dcreated_at__gt)
      } else {
        this.dcreated_at__gt = ''
        if (!this.dcreated_at__lte) {
          this.dcreated_at__lte = ''
        }
      }
      this.sx()
    },
    dordersttover () {
      console.log(this.dcreated_at__lte)
      if (this.dcreated_at__lte) {
        this.dcreated_at__lte = this.dateFormat(this.dcreated_at__lte)
      } else {
        this.dcreated_at__lte = ''
        if (!this.dcreated_at__gt) {
          this.dcreated_at__gt = ''
        }
      }
      this.sx()
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
    curentTime () {
      var now = new Date();

      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()

      var clock = year + '-'

      if (month < 10) {
        clock += '0'
      }
      clock += month + '-'
      if (day < 10) {
        clock += '0'
      }
      clock += day + ' '
      clock += '00:00:00'
      return clock
    }
  }
}