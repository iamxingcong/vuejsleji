import Header from '../../components/public/header.vue'
import Aside from '../../components/public/aside.vue'
import Footer from '../../components/public/footer.vue'
import Trans from '@/config/trans.js'

export default {
  name: 'ManagePanel',
  components: {
    Header,
    Aside,
    Footer,
    Trans
  },
  data () {
    return {
      msg: 'CMusic Copyright版权曲库管理系统',
      name: ''
    }
  },
  created () {
    this.name = this.$route.query.name
    Trans.$emit('logindata', this.name)
  },
  methods: {

  }

}
