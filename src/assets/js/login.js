
// import Footer from '../../components/page/public/footer.vue'

import axiosapi from '@/config/axiosapi'

export default {
  name: 'Login',
  data () {
    return {
      activeName: 'first',
      msg: 'CMusic Copyright版权曲库管理系统',
      user: '',
      pass: '',
      img: require('../../assets/icons/logo.png'),
      bg: require('../../assets/icons/bg.png'),
      eye: require('../../assets/icons/eye.png'),
      eyeo: require('../../assets/icons/eyeo.png'),
      form: {
        phone: '',
        password: ''
      },
      forma: {
        email: '',
        password: ''
      },
      areac: '+86',
      telc: [],
      phone: '',
      ptype: 'password',
      xtype: 'password'
    }
  },
  created () {
    this.loginout()
    this.tel()
  },
  methods: {
    async login () {
      this.form.phone = this.areac + this.phone
      try {
        let dt = await axiosapi.login(this.form)
        if (dt.status === 200) {
          this.$message.success('登录成功')
          window.document.cookie = 'user=' + dt.data.name
          this.$router.push('DataManage')
        }
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.detail)
        } else if (e.request) {
          console.log(e.request)
        } else {
          console.log('Error', e.message)
        }
        console.log(e)
      }
    },
    async logina () {
      try {
        let dt = await axiosapi.login(this.forma)
        if (dt.status === 200) {
          this.$message.success('登录成功')
          window.document.cookie = 'user=' + dt.data.name
          this.$router.push('DataManage')
        }
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.detail)
        } else if (e.request) {
          console.log(e.request)
        } else {
          console.log('Error', e.message)
        }
        console.log(e)
      }
    },
    async tel () {
      try {
        let dt = await axiosapi.telcode()
        if (dt.status === 200) {
          console.log(dt)
          this.telc = dt.data.results
        }
      } catch (e) {
        console.log('wrong area number')
      }
    },
    async loginout () {
      try {
        await axiosapi.loginout()
      } catch (e) {
        console.log(e)
      }
      this.$router.push('/')
    },
    ResetPassword () {
      this.$router.push('ResetPassword')
    },
    handleClick (tab, event) {
      console.log(tab.name)
      if (tab.name === 'first') {
        this.form.phone = ''
      } else {
        this.forma.email = ''
      }
    },
    toggles () {
      if (this.ptype === 'password') {
        this.ptype = 'text'
      } else {
        this.ptype = 'password'
      }
    },
    togglesx () {
      if (this.xtype === 'password') {
        this.xtype = 'text'
      } else {
        this.xtype = 'password'
      }
    }
  }
}
