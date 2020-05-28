<template>
  <el-dialog
    title="添加定价方案"
    :visible.sync="visible"
    :eshow="eshow"
    width="780px"
    :modal="true"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :before-close="handleClose">

    <el-form :model="form"  :inline="true" >
      <el-row class="widtl">
        <el-form-item label="方案名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
          <el-form-item label="授权描述：" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请填写授权描述"
              v-model="form.desc">
            </el-input>

          </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancels">取 消</el-button>
      <el-button type="primary" @click="confirmed">确 定 {{eshow}} </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'priceSetting',
  data () {
    return {
      form: {
        name: '',
        region: 'shanghai',
        order: 'beijing',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      visible: this.eshow
    }
  },
  props: {
    eshow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    eshow () {
      this.visible = this.eshow
      console.log(this.eshow + ', eshow, child')
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:eshow', false)
    },
    confirmed () {
      // this.dialogVisible = false
      console.log(this.form)
    },
    cancels () {
      this.$emit('update:eshow', false)
      console.log(this.eshow)
    }
  }
}
</script>
<style scoped src='@/assets/css/permissionmanage.css'></style>
