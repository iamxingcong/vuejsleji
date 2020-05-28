import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'

export default {
  name: 'UserAuthDetail',
  data () {
    return {
      det: [],
      detailx: {},
      dialogVisibleRevise: false,
      auth: {
        use_name: '',
        project_name: '',
        uuid: ''
      }
    }
  },
  created () {
    console.log(this.$route.query.uuid)
    this.detail(this.$route.query.uuid)
  },
  methods: {
    async detail (x) {
      this.det = []
      try {
        let ls = await axi().get('/ops/certificate/' + x)
        if (ls.status === 200) {
          this.det.push(ls.data)
          this.detailx = ls.data
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    },
    checksuser (v) {
      this.$router.push({
        path: 'UserDetail',
        query: {'uuid': v}
      })
    },
    checks (v) {
      this.$router.push({
        path: 'MusicDetail',
        query: {'uuid': v}
      })
    },
    revisepop (v) {
      if(!v) {
        return false;
      } else {
        this.uuid = v
        this.auth.use_name = this.detailx.data.use_name
        this.auth.project_name = this.detailx.data.project_name
        if (this.detailx.status === 'WAITING') {
          this.dialogVisibleRevise = true
        } else {
          this.$message.success('只有等待状态下的授权才能修改')
        }
      }

    },
    async revcfm () {
      try {
        let ls = await axi().put('/ops/certificate/' + this.uuid, this.auth)
        if (ls.status === 200) {
          this.dialogVisibleRevise = false
          this.detail(this.uuid)
        }
      } catch (e) {
        if (e.response) {
          this.$message.success(e.response.data.detail)
        }
      }
    }
  }
}
