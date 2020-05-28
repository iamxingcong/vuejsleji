<template>
  <div class='MusicList'>
     <el-row>
        <span class="title left">播放排行</span>
        <div class='right keywords'>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-button size='mini'>
                  {{ playcgtitle }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item> <i @click='totalRank'> 总排行</i> </el-dropdown-item>
                <el-dropdown-item> <i @click='todayRank'> 今日排行 </i></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

             <el-dropdown>
              <span class="el-dropdown-link">
                <el-button size='mini'>
                  时间筛选<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item>
                    <el-date-picker
                      v-model="created_at__gt"
                      @change='orderstt'
                      type="datetime"
                      format='yyyy-MM-dd HH:mm:ss'
                      placeholder="选择下单开始时间">
                    </el-date-picker>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-date-picker
                      v-model="created_at__lte"
                      @change='ordersttover'
                      type="datetime"
                      format='yyyy-MM-dd HH:mm:ss'
                      placeholder="选择下单结束时间">
                    </el-date-picker>

                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
      </el-row>
    <div class='single cross bdbtm'>
      <span> # </span>
      <span> 歌曲 </span>
      <span> 歌手 </span>
      <span> 专辑 </span>
      <span> 播放量 </span>
    </div>
    <div class='liswraps'>
      <div class='cross single'    v-for="(i,index) in plis"  :key="index">
        <span>NO. {{ index + 1 }} </span>
        <span>
          <i class='rankxavatar' :style='{ backgroundImage: `url(${ i.music_info.avatar })` }'></i>
          <i class='mnamex'> {{i.music_info.name}} </i>
        </span>
        <span>
          <i  v-if='i.music_info'> {{i.music_info.composer}} </i>
          <i v-else>--</i>
        </span>
        <span>
          <i v-if='i.music_info.album_info'> {{i.music_info.album_info.name}}</i>
          <i v-else>--</i>
         </span>
        <span> {{i.play_count }} </span>
      </div>
    </div>
  </div>
</template>
<script src='@/assets/js/musiclistdetail.js'></script>
<style scoped src='@/assets/css/musiclist.css'></style>
<style scoped src='@/assets/css/datamanage.css'></style>
