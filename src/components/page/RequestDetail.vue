<template>
  <div id='RequestDetail'>
    <div class="detail minh400">
      <el-row>
        <span class="tit left">请求详情</span>
      </el-row>
      <div class="title">
        {{ detail.vip_name }}
      </div>
      <div class="subtitle">
          {{ detail.created_at }}
      </div>
      <div class="content">
          {{ detail.content }}
      </div>
    </div>
  </div>
</template>
<script>
import axi from '@/config/axi'
export default {
  name: 'RequestDetail',
  data () {
    return {
      detail: {},
      uuid: 0
    }
  },
  created () {
    this.uuid = this.$route.query.uuid
    this.applydt(this.$route.query.uuid)
  },
  methods: {
    async applydt (x) {
      try {
        let ls = await axi().get('/ops/apply_for_vip/' + x)
        if (ls.status === 200) {
          this.detail = ls.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    backTo () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .title{
    font-weight: 700;
    text-align: center;
    line-height: 3em;
    padding-top: 15px;
  }
  .subtitle{
    color: #434343;
    font-size: 0.8em;
    opacity: 0.9;
    line-height: 2em;
  }
  .content{
    line-height: 2em;
    text-align: left;
    padding: 15px;
  }
  .detail{
    background-color: #fff;
    margin-bottom: 15px;
    padding-bottom: 15px;
  }
</style>
