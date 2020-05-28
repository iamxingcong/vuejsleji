<template>
  <el-dialog
    title="查看会员类型"
    :visible.sync="visible"
    :cshow="cshow"
    width="780px"
    :modal="true"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :before-close="handleClose">

    <el-form :model="form"  :inline="true" >
      <el-row class="widtl">
        <el-form-item label="会员类型名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="是否可以试听：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="是">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试听次数：" :label-width="formLabelWidth">
          <el-input v-model="form.date1" autocomplete="off"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否可以下载：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="是">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下载次数：" :label-width="formLabelWidth">
          <el-input v-model="form.date1" autocomplete="off"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否可以下单：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="是">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单次数：" :label-width="formLabelWidth">
          <el-input v-model="form.date1" autocomplete="off"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否可以下单：" :label-width="formLabelWidth">
          <el-select v-model="form.order" placeholder="是">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="widtl">
          <el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请填写会员类型备注"
              v-model="form.desc">
            </el-input>

          </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancels">取 消</el-button>
      <el-button type="primary" @click="confirmed">确 定 {{cshow}} </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'checkMemberUser',
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
      visible: this.cshow
    }
  },
  props: {
    cshow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    cshow () {
      this.visible = this.cshow
      console.log(this.cshow + ', cshow, child')
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:cshow', false)
    },
    confirmed () {
      // this.dialogVisible = false
      console.log(this.form)
    },
    cancels () {
      this.$emit('update:cshow', false)
      console.log(this.cshow)
    }
  }
}
</script>
<style scoped src='@/assets/css/permissionmanage.css'></style>
