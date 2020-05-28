
import addMemberUser from '../../components/page/subcompo/addMemberUser.vue'
import checkMemberUser from '../../components/page/subcompo/checkMemberUser.vue'
import editMemberUser from '../../components/page/subcompo/editMemberUser.vue'
import DeleteDialogue from '../../components/page/subcompo/DeleteDialogue.vue'
import priceSetting from '../../components/page/subcompo/priceSetting.vue'
import axiosapi from '@/config/axiosapi'

export default {
  name: 'PermissionManage',
  data () {
    return {
      show: false,
      cshow: false,
      dshow: false,
      eshow: false,
      delshow: false,
      detail: [],
      editi: 0,
      deli: {
        title: '',
        id: 0
      }
    }
  },
  components: {
    addMemberUser,
    checkMemberUser,
    editMemberUser,
    priceSetting,
    DeleteDialogue
  },
  created () {
    this.vip()
  },
  methods: {
    async vip () {
      try {
        let dt = await axiosapi.vip()
        if (dt.status === 200 || dt.status === 201) {
          this.detail = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    addMember () {
      this.show = true
      console.log(this.show + ', show parent')
    },
    checkMemberUser (v) {
      console.log(v)
      let routeData = this.$router.resolve({path: 'MemmberDetail', query: {'id': v}})
      window.open(routeData.href, '_blank')
    },
    deletemem (v) {
      this.deli.rm = '会员权限删除后不可以恢复'
      this.deli.t = '删除会员权限'
      this.deli.id = v.id
      this.deli.title = '删除会员权限：'
      this.deli.name = v.name
      this.delshow = true
    },
    edit (v) {
      this.editi = v
      console.log(v)
      this.dshow = true
    },
    pricesetting () {
      this.eshow = true
    }
  }
}
