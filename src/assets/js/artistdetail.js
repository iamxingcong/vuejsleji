
import axi from '@/config/axi'
export default {
  name: 'ArtistDetail',
  data () {
    return {
      dtl: [],
      albl: [],
      detail: {},
      uuid: '',
      activeName: 'first',
      count: 0,
      counta: 0,
      currentPage1: 1,
      currentPage2: 1,
      dialogDelVisible: false,
      name: '',
      album_uuid: [],
      adialogDelVisible: false,
      aname: '',
      music_uuid: []
    }
  },
  created () {
    this.uuid = this.$route.query.uuid
    this.detxt(this.$route.query.uuid)
    this.musl(this.$route.query.uuid)
    this.alblis(this.$route.query.uuid)
  },
  methods: {
    async detxt (x) {
      try {
        let ls = await axi().get('/ops/musician/' + x)
        if (ls.status === 200) {
          this.detail = ls.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async musl (rx) {
      try {
        let xs = await axi().get('/ops/musician/' + rx + '/musics/')
        if (xs.status === 200) {
          this.dtl = xs.data.results
          this.counta = xs.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    async alblis (xtt) {
      try {
        let rs = await axi().get('/ops/musician/' + xtt + '/albums/')
        if (rs.status === 200) {
          this.albl = rs.data.results
          this.count = rs.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleClick (tab, event) {
      console.log(tab)
    },
    checkalbum (v) {
      let routeData = this.$router.resolve({path: 'AlbumDetail', query: {'uuid': v}})
      window.open(routeData.href, '_blank')
    },
    editalbum (x) {

    },
    delalbum (z) {
      this.album_uuid = []
      this.name = z.name
      this.album_uuid.push(z.uuid)
      this.dialogDelVisible = true
    },
    async deleteconfirm () {
      try {
        let rs = await axi().post('/ops/musician/' + this.$route.query.uuid + '/album_remove/', {uuids: this.album_uuid})
        if (rs.status === 200) {
          this.$message.success('移除成功')
          this.dialogDelVisible = false
          this.alblis(this.$route.query.uuid)
        }
      } catch (e) {
        console.log(e)
      }
    },
    checkMusic (e) {
      let routeData = this.$router.resolve({path: 'MusicDetail', query: {'uuid': e}})
      window.open(routeData.href, '_blank')
    },
    async downloadMusic (r) {
      try {
        let dp = await axi().get('/ops/music/' + r + '/path?disposition=attachment')
        if (dp.status === 200) {
          this.$message.success('下载成功')
          window.open(dp.data.url)
        }
      } catch (e) {
        console.log(e)
      }
    },
    delmusic (p) {
      this.music_uuid = []
      this.aname = p.name
      this.music_uuid.push(p.uuid)
      this.adialogDelVisible = true
    },
    async adeleteconfirm () {
      try {
        let rs = await axi().post('/ops/musician/' + this.$route.query.uuid + '/music_remove/', {uuids: this.music_uuid})
        if (rs.status === 200) {
          this.$message.success('移除成功')
          this.adialogDelVisible = false
          this.musl(this.$route.query.uuid)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChange (v) {
      console.log(v)
      try {
        let rs = await axi().get('/ops/musician/' + this.$route.query.uuid + '/albums/?page=' + v)
        if (rs.status === 200) {
          this.albl = rs.data.results
          this.count = rs.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChangea (x) {
      console.log(x)
      try {
        let xs = await axi().get('/ops/musician/' + this.$route.query.uuid + '/musics/?page=' + x)
        if (xs.status === 200) {
          this.dtl = xs.data.results
          this.counta = xs.data.count
        }
      } catch (e) {
        console.log(e)
      }
    }

  }
}
