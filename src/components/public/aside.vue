<template>
  <div id='aside'>
    <div class='site_title' v-on:click="defaultpg">
      <i class='site_logo' :style='{ backgroundImage: `url(${img})` }'></i>
    </div>
    <el-menu

      class='el-menu-vertical-demo'
      background-color='#181932'
      text-color='#70718C'
      :default-active='this.$router.path'
      router
      unique-opened
      @select="select"
    >
      <el-menu-item index='DataManage'>
        <i id='iconx1' class='menuicon'></i>
        <span slot="title">数据统计</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i id='iconx2' class='menuicon'></i>
          <span>音乐</span>
        </template>
        <el-menu-item index="MusicFilter">音乐列表</el-menu-item>
        <el-menu-item index="BrandLists">厂牌列表</el-menu-item>
        <el-menu-item index="AlbumFilter">专辑列表</el-menu-item>
        <el-menu-item index='MusicLists'>曲单管理</el-menu-item>
        <el-menu-item index='ArtistList'> 艺术家列表 </el-menu-item>
      </el-submenu>

      <el-menu-item index='UserManage'>
        <i id='iconx3' class='menuicon'></i>
        <span slot="title">用户管理 </span>
      </el-menu-item>

      <el-menu-item index='RequestManage'>
        <i id='iconx4' class='menuicon'></i>
        <span slot="title">请求管理 </span>
      </el-menu-item>

       <el-submenu index="4">
        <template slot="title">
           <i id='iconx7' class='menuicon'></i>
          <span>通知管理</span>
        </template>
        <el-menu-item index="NoticeManage">通知列表</el-menu-item>
        <el-menu-item index="ColumnManage">栏目管理</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
           <i id='iconx7' class='menuicon'></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="PermissionManage">会员权限</el-menu-item>
        <el-menu-item index="PriceManage">定价管理</el-menu-item>
        <el-menu-item index='PriceAuthorizeType'>定价授权</el-menu-item>
      </el-submenu>

      <el-menu-item index='OrderList'>
          <i id='iconx3' class='menuicon'></i>
          <span slot="title">订单管理</span>
      </el-menu-item>

      <el-menu-item index='UserAuthList'>
          <i id='iconx4' class='menuicon'></i>
          <span slot="title">授权管理</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>
<script>
import axi from '@/config/axi'
export default {
  name: 'Aside',
  data () {
    return {
      img: require('../../assets/icons/logox.png'),
      m1: require('../../assets/icons/m1.png'),
      m2: require('../../assets/icons/m2.png'),
      m3: require('../../assets/icons/m3.png'),
      m4: require('../../assets/icons/m4.png'),
      m5: require('../../assets/icons/m5.png'),
      m6: require('../../assets/icons/m6.png'),
      m7: require('../../assets/icons/m7.png'),
      x1: require('../../assets/icons/x1.png'),
      x2: require('../../assets/icons/x2.png'),
      x3: require('../../assets/icons/x3.png'),
      x4: require('../../assets/icons/x4.png'),
      x5: require('../../assets/icons/x5.png'),
      x6: require('../../assets/icons/x6.png'),
      x7: require('../../assets/icons/x7.png'),
      index: '',
      pathname: ''
    }
  },
  created () {
    this.judgeUser()
  },
  methods: {
    defaultpg: function () {
      this.$router.push('DataManage')
    },
    select: function (index) {
      this.judgeUser()
    },
    async judgeUser () {
      try {
        let dp = await axi().get('/ops/user/profile/')
        if (dp.status === 200) {
          // console.log(dp)
        }
      } catch (e) {
        // console.log(e)
        if (e.response) {
          this.$message.error('请重新登录')
          // this.$router.push('/')
        }
      }
    }
  }
}
</script>
<style scoped>
.site_title {
  height: 69px;
  text-align: center;
  display: block;
  position: relative;
  border-bottom: 1px solid #292A49;
}
.site_logo {
  width: 98px;
  height: 26px;
  top: 23px;
  display: block;
  margin: 0px auto;
  background-size: 100% auto;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
}
.el-menu-vertical-demo{
  height: calc(100% - 90px);
  overflow: auto;
}
.menuicon{
    width: 0px;
    height: 0px;
    display: none;
    float: left;
    margin-top: 18.5px;
    margin-right: 10px;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
