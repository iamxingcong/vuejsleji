<template>
<div id='musicauthorizemanage'>
    <div class="pb15">
      <el-row>
        <span class="tit left">曲库授权管理</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" type="primary" @click="pricesetting">添加定价方式</el-button>
        </span>
      </el-row>
    </div>

    <div class="mg15">

      <div class="single">
        <span class="titles">定价方式一</span>
        <span class="description">
            普通的定价方式，里边都是自己厂牌的作品，适用于影视类客户
        </span>
        <table>
            <tr>
              <td>授权范围</td>
              <td>价格</td>
              <td>描述</td>
            </tr>
            <tr>
              <td>网络视频（非广告类）</td>
              <td>100</td>
              <td>
                包括公众号文章，vlog，网剧，网电影，网络综艺
              </td>
            </tr>
            <tr>
              <td>网络视频（广告类）</td>
              <td>100</td>
              <td>包括H5广告，视频内嵌广告，电影trailer</td>
            </tr>
            <tr>
              <td>全媒体广告</td>
              <td>100</td>
              <td>包含所有网络广告，楼宇广告，电梯广告，TVC广告</td>
            </tr>
            <tr>
              <td>APP背景音乐</td>
              <td>100</td>
              <td>包含APP游戏音乐，UGC音乐素材，APP内置内容</td>
            </tr>
            <tr>
              <td>硬件内置音乐</td>
              <td>100</td>
              <td>包含智能硬件、穿戴设备内置音乐</td>
            </tr>
            <tr>
              <td>院线电影</td>
              <td>100</td>
              <td>包含院线电影内使用的音乐</td>
            </tr>
            <tr>
              <td>店铺公播音乐</td>
              <td>100</td>
              <td>针对少于10家的连锁店铺内使用，大于10家请联系我们</td>
            </tr>
            <tr>
              <td>其他授权</td>
              <td>。。。。</td>
              <td>如有其他授权需求，<a href='#'>请联系我们</a></td>
            </tr>

        </table>

          <el-button type="text">查看详情</el-button>
          <el-button type="text">权限编辑</el-button>
          <el-button type="text">删除权限</el-button>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: ''
}
</script>
