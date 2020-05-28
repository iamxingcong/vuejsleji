
import axi from '@/config/axi'
export default {
  name: 'MusicListDetail',
  data () {
    return {
      plis: [],
      playcgtitle: '总排行',
      created_at__gt: '',
      created_at__lte: '',
    }
  },
  created () {
    this.plist()
  },
  methods: {
    async plist () {
      this.plis = []
      try {
        let lis = await axi().get('/ops/download/?type=PREVIEW&created_at__gt=' + this.created_at__gt + '&created_at__lte=' + this.created_at__lte)
        if (lis.status === 200) {
          this.plis = lis.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    totalRank () {
      this.playcgtitle = '总排行'
      this.created_at__gt = ''
      this.created_at__lte = ''
      this.plist()
    },
    todayRank () {
      this.playcgtitle = '今日排行'
      this.created_at__gt = this.curentTime()
      this.created_at__lte = ''
      this.plist()
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
    },
    orderstt () {
      if (this.created_at__gt) {
        this.created_at__gt = this.dateFormat(this.created_at__gt)
      } else {
        this.created_at__gt = ''
        if (!this.created_at__lte) {
          this.created_at__lte = ''
        }
      }
      this.plist()
    },
    ordersttover () {
      if (this.created_at__lte) {
        this.created_at__lte = this.dateFormat(this.created_at__lte)
      } else {
        this.created_at__lte = ''
        if (!this.created_at__gt) {
          this.created_at__gt = ''
        }
      }
      this.plist()
    },
  }
}
