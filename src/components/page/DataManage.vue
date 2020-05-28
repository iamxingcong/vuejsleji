<template>
  <div id='DataManage'>

    <div id="Statics">

      <div class="single ce"   :style='{ backgroundImage: `url(${b1})` }'>
        <span class="number"> {{ tt.music_count }} </span>
        <span class="title">  音乐数量  </span>
      </div>

      <div class="single cf"   :style='{ backgroundImage: `url(${b2})` }'>
        <span class="number"> {{ tt.order_count }} </span>
        <span class="title"> 总订单数  </span>
      </div>

      <div class="single ca"   :style='{ backgroundImage: `url(${b3})` }'>
        <span class="number"> {{ tt.total_income }} </span>
        <span class="title"> 总收益  </span>
      </div>
      <div class="single cg"   :style='{ backgroundImage: `url(${b4})` }'>
        <span class="number"> {{ tt.yesterday_visit_count }} </span>
        <span class="title"> 昨日访问人数  </span>
      </div>

    </div>

    <div class='asidexd'>
      <el-row>
        <span class='left title'> 近7日订单量 </span>
        <span class='right mgr15'>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-button size='mini'>
                总订单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item> <i @click='totalOrder'> 总订单</i> </el-dropdown-item>
              <el-dropdown-item> <i @click='payOrder'> 支付订单 </i></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-row>
      <div id='chartColumn'  :style="{height: '251px'}"></div>
    </div>
    <div class="ranks left mr13">
      <MusicListDetail />
    </div>

    <div class='Basidexd'>
      <el-row>
        <span class='left title'> 近7日收益 </span>
      </el-row>
      <div id='earnChartColumn'  :style="{height: '251px'}"></div>
    </div>

    <div class='Casidexd'>
      <el-row>
        <span class='left title'> 用户数量 </span>
      </el-row>
      <div id='userCount'  :style="{height: '251px'}"></div>
    </div>

    <div class="ranks left">
      <DownloadList />
    </div>

    <div class='Basidexd'>
      <el-row>
        <span class='left title'> 热选标签 </span>
      </el-row>
      <div id='hotwordx'  :style="{height: '251px'}"></div>
    </div>

   <div id="hotWords">
      <span class="tit left keywordtit">热词检索</span>
      <div class='keywords left'>
        <el-button v-for='(x, ind) in tt.hot_keyword_records' :key='ind' size='mini'>
            {{ x.keyword }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script src='@/assets/js/datamanage.js'></script>
<style scoped src='@/assets/css/datamanage.css'></style>
