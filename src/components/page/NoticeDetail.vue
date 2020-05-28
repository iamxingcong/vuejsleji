<template>
  <div id='NoticeDetail'>
    <div class="detail minh400">
      <el-row>
        <span class="tit left"> 通知详情 </span>
      </el-row>
      <div class="title">
        {{ detail.title }}
      </div>
      <div class="subtitle">
          {{ detail.updated_at }}
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
  name: 'NoticeDetail',
  data () {
    return {
      detail: {}
    }
  },
  created () {
    this.msgdetail()
  },
  methods: {
    async msgdetail () {
      try {
        let ls = await axi().get('/ops/message/' + this.$route.query.id)
        this.detail = ls.data
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
