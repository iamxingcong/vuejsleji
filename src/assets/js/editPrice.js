
import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'addPrice',
  data () {
    return {
      form: {},
      area_uuids: [],
      formLabelWidth: '150px',
      visible: this.showu,
      chooselist: [],
      tags: [],
      search: '',
      auuids: []
    }
  },
  props: {
    showu: {
      type: Boolean,
      default: false
    },
    editid: String
  },
  watch: {
    showu () {
      this.visible = this.showu
    },
    editid () {
      this.priceitm(this.editid)
    }
  },
  methods: {
    async priceitm (x) {
      try {
        let lis = await axi().get('/ops/price/' + this.editid)
        if (lis.status === 200) {
          this.form = lis.data
          this.auuids = lis.data.area_uuids
          this.pricelist()
        }
      } catch (e) {

      }
    },
    async pricelist () {
      this.tags = []
      try {
        let lis = await axi().get('/ops/price_area_search/?search' + this.search)
        if (lis.status === 200) {
          this.chooselist = lis.data.results
          for (var i = 0; i < lis.data.results.length; i++) {
            for (var x = 0; x < this.auuids.length; x++) {
              if (lis.data.results[i].uuid === this.auuids[x]) {
                this.tags.push(lis.data.results[i])
              }
            }
          }
        }
      } catch (e) {

      }
    },
    handleClose (done) {
      this.$emit('update:showu', false)
    },
    tagclose (tag) {
      this.form.area_uuids = []
      this.tags.splice(this.tags.indexOf(tag), 1)
      for (var i = 0; i < this.tags.length; i++) {
        this.form.area_uuids.push(this.tags[i].uuid)
      }
    },
    async confirmed () {
      try {
        let dt = await axi().put('/ops/price/' + this.editid, this.form)
        if (dt.status === 200 || dt.status === 201) {
          this.$emit('update:showu', false)
          this.$parent.pri()
          this.form = {}
          this.area_uuids = []
        }
      } catch (e) {
        console.log(e)
      }
    },
    cancels () {
      this.$emit('update:showu', false)
      console.log(this.showu)
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
