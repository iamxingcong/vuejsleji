<template>
  <el-dialog
    title="添加会员类型"
    :visible.sync="visible"
    :show="show"
    width="880px"
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
          <el-select v-model="form.is_preview">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试听次数：" :label-width="formLabelWidth">
          <el-input v-model="form.preview_count" type='number' autocomplete="off"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否可以下载：" :label-width="formLabelWidth">
          <el-select v-model="form.is_download_preview" >
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下载次数：" :label-width="formLabelWidth">
          <el-input v-model="form.download_preview_count"  type='number' autocomplete="off"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否可以下单：" :label-width="formLabelWidth">
          <el-select v-model="form.is_order" placeholder="是">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否可以下载高清：" :label-width="formLabelWidth">
          <el-select v-model="form.is_download_origin">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="下载高清次数：" :label-width="formLabelWidth">
          <el-input v-model="form.download_origin_count"  type='number' autocomplete="off"></el-input>
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
      <el-button size='mini' @click="cancels">取 消</el-button>
      <el-button size='mini' type="primary" @click="confirmed">确 定 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import axiosapi from '@/config/axiosapi'
export default {
  name: 'addMemberUser',
  data () {
    return {
      form: {},
      formLabelWidth: '150px',
      visible: this.show
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show () {
      this.visible = this.show
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:show', false)
    },
    async confirmed () {
      // this.dialogVisible = false
      console.log(this.form)
      try {
        let dt = await axiosapi.addvip(this.form)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt)
          this.$emit('update:show', false)
          this.$parent.vip()
        }
      } catch (e) {
        console.log(e)
      }
    },
    cancels () {
      this.$emit('update:show', false)
      console.log(this.show)
    }
  }
}
</script>
<style scoped src='@/assets/css/permissionmanage.css'></style>
