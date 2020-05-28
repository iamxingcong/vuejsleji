
import axi from '@/config/axi'
import Trans from '@/config/trans.js'
import axiosapi from '@/config/axiosapi'
import brother from '@/assets/js/brother.js'
function getCookie (cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === '') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export default {
  name: 'Header',
  components: {
    Trans
  },
  data () {
    return {
      user: '--',
      search: '',
      tx: {},
      audiourl: '',
      audios: false,
      mname: '',
      breads: '',
      mcount: 0,
      routep: ''
    }
  },
  watch: {
    $route() {
        this.getBreadcrumb()
    }
  },
  created () {
    this.search = this.$route.query.search
    this.routep = this.$route.path
    this.getBreadcrumb()
    this.breads = this.$route.meta.name
    // console.log(this.$route)
    this.user = getCookie('user')
    Trans.$on('logindata', this.lgdt)
  },
  mounted () {
    var that = this
    var song = document.getElementById('audio')
    brother.$on('countm', function (e) {
      setTimeout(function(){
          that.mcount = e
          // console.log(that.mcount + '音乐数量')
          that.mmt(that.mcount)
      }, 1000)
    })
    brother.$on('playm', function (e) {
      that.xplyms(e)
    })
    brother.$on('bro', function (e) {
      that.plyms(e)
    })
    brother.$on('stop', function (e) {
      that.audios = false
      console.log('pause')
      song.pause()
    })
    brother.$on('continue', function (e) {
      that.audios = true
      console.log('continue')
      song.play()
    })
  },
  methods: {
    mmt (v) {
      this.mcount = v
    },
    getBreadcrumb() {
      this.breads = this.$route.meta.name
      this.routep = this.$route.path
    },
    async xplyms (v) {
      this.mname = v.name
      try {
        let dp = await axi().get('/ops/music/' + v.uuid + '/path?disposition=attachment')
        if (dp.status === 200) {
          this.audios = true
          this.audiourl = dp.data.url
        }
      } catch (e) {
        console.log(e)
      }
      var song = document.getElementById('audio')
      song.defaultPlaybackRate = '1'
    },
    async plyms (v) {
      this.mname = v.row.name
      try {
        let dp = await axi().get('/ops/music/' + v.row.uuid + '/path?disposition=attachment')
        if (dp.status === 200) {
          this.audios = true
          this.audiourl = dp.data.url
        }
      } catch (e) {
        console.log(e)
      }
      var song = document.getElementById('audio')
      song.defaultPlaybackRate = '1'
    },
    async loginout () {
      try {
        await axiosapi.loginout()
      } catch (e) {
        console.log(e)
      }
      this.$router.push('/')
    },
    searching: function () {
      console.log('u r searching: ' + this.search)
      this.$router.push({
        path: 'MusicFilter',
        query: {'search': this.search}
      })
    },
    lgdt (vl) {
      this.user = vl
    }
  }
}
