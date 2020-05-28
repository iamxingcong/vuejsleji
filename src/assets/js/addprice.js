
import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'addPrice',
  data () {
    return {
      form: {},
      area_uuids: [],
      formLabelWidth: '150px',
      visible: this.showx,
      chooselist: [],
      tags: [],
      search: ''
    }
  },
  props: {
    showx: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showx () {
      this.visible = this.showx
    }
  },
  created () {
    this.priceitm()
  },
  methods: {
    async priceitm () {
      try {
        let lis = await axi().get('/ops/price_area_search/?search' + this.search)
        if (lis.status === 200) {
          this.chooselist = lis.data.results
        }
      } catch (e) {

      }
    },
    handleClose (done) {
      this.$emit('update:showx', false)
    },
    tagclose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    async confirmed () {
      console.log(this.form)
      try {
        let dt = await axiosapi.price(this.form)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt)
          this.$emit('update:showx', false)
          this.$parent.pri()
          this.form = {}
          this.area_uuids = []
        }
      } catch (e) {
        console.log(e)
      }
    },
    cancels () {
      this.$emit('update:showx', false)
      console.log(this.showx)
    },
    handleCheckedCitiesChange (v) {
      this.form.area_uuids = []
      for (var i = 0; i < v.length; i++) {
        this.form.area_uuids.push(v[i].uuid)
      }
      console.log(v)
      this.tags = []
      this.tags = v
    }
  }
}
