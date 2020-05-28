<template>
<div id='dialogues'>
    <el-dialog
    :title="delid.t"
    :visible.sync="visible"
    :delshow="delshow"
    width="880px"
    :modal="true"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :before-close="handleClose">
    <span class='fw700 cross'>
      <i class='el-icon-warning'></i>
        {{ delid.title }} {{ delid.name}}
    </span>
    <span class='cross'>{{ delid.rm }}</span>
    <span slot='footer' class='dialog-footer'>
      <el-button size='mini' @click='cancels'>取 消</el-button>
      <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'DeleteDialogue',
  data () {
    return {
      dialogVisible: false,
      visible: this.delshow
    }
  },
  props: {
    delshow: {
      type: Boolean,
      default: false
    },
    delid: {
      title: '',
      name: '',
      id: 0
    }
  },
  watch: {
    delshow () {
      this.visible = this.delshow
    }
  },
  methods: {
    async deleteconfirm () {

    },
    handleClose (done) {
      this.$emit('update:delshow', false)
    },
    cancels () {
      this.$emit('update:delshow', false)
      console.log(this.delshow)
    }
  }
}
</script>
