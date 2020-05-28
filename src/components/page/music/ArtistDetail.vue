<template>
<div id='artistDetail' class="white">
  <div class='artdx'>
    <div class='btngroupsx right mt15 mgr15'>
      <el-button size='mini'> 上传音乐 </el-button>
      <el-button size='mini'> 添加专辑 </el-button>
    </div>
    <i class='avatariconx' v-if='detail.avatar' :style='{ backgroundImage: `url(${ detail.avatar })` }'  ></i>
    <span class='title' v-if='detail.name'> {{ detail.name }} </span>
    <span class='desc' v-if='detail.desc'> {{ detail.desc }} </span>
  </div>
  <div id='tabsx'>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="专辑列表" name="first">

          <el-table
            :data="albl"
            style="width: 100%">
            <el-table-column
              label="ID"
              width="300"
            >
              <template slot-scope="scope">
                <div class='avt' >
                  <img class='avatars' :src='`${ scope.row.cover }`' />
                </div>
                <i class='uuidx'> {{ scope.row.uuid }}</i>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="专辑"
            >
            </el-table-column>
            <el-table-column
              prop="musician_info.name"
              label="艺术家"
            >
            <template slot-scope="scope">
              <i v-if='scope.row.musician_info.name'> {{ scope.row.musician_info.name }} </i>
              <i v-else> -- </i>
            </template>
            </el-table-column>
            <el-table-column
              prop="music_count"
              width="120"
              label="作品数"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="操作"
              width="185">
              <template slot-scope="scope">
                <el-button
                  type="text"
                @click="checkalbum(scope.row.uuid)">查看</el-button>
                <el-button
                  type="text"
                  @click="editalbum(scope.row.uuid)">编辑</el-button>
                  <el-button
                  type="text"
                  @click="delalbum(scope.row)"> 移除 </el-button>
              </template>
            </el-table-column>
          </el-table>
            <div class='paginationcenters'>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                layout="prev, pager, next"
                :total="count">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="音乐列表" name="second">

          <el-table
          :data="dtl"
          style="width: 100%">

          <el-table-column
            prop="avatar"
            label="ID"
            width="300"
          >
            <template slot-scope="scope">
              <div class='avt' >
                <div class='avatars'   :style='{ backgroundImage: `url(${ scope.row.avatar })` }'></div>
              </div>
              <i class='uuidx'> {{ scope.row.uuid }}</i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="音乐名称"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            label="艺术家"
           >
          </el-table-column>
          <el-table-column
            prop="album_info.name"
            label="专辑名称"
           >
          </el-table-column>
          <el-table-column
            prop="length"
            label="时长"
            width="55"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            label="标签"
            width='220'
           >
           <template  slot-scope="scope">
             <i class='tagx' v-for='x in scope.row.category_info_list' :key='x.id'> {{ x.name }} 、</i>
           </template>
          </el-table-column>
          <el-table-column
            prop="track_count"
            label="状态"
            width="165">
            <template   slot-scope="scope">
              <i v-if='scope.row.status === "WAITING"'> 等待上线 </i>
              <i v-if='scope.row.status === "ONLINE"'> 已上线 </i>
              <i v-if='scope.row.status === "OFFLINE"'> 已下线 </i>
              <i> / </i>
              <span v-if='scope.row.price_id'>
              <i v-if='scope.row.price_id.length > 1'> 已定价 </i>
              <i v-if='scope.row.price_id.length === 1'> 未定价 </i>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="uuid"
            label="操作"
            width="135">
            <template slot-scope="scope">
                <el-button
                  type="text"
                @click="checkMusic(scope.row.uuid)">查看</el-button>
                <el-button
                  type="text"
                  @click="downloadMusic(scope.row.uuid)">下载</el-button>
                   <el-button
                  type="text"
                  @click="delmusic(scope.row)"> 移除 </el-button>
            </template>
          </el-table-column>
        </el-table>
            <div class='paginationcenters'>
            <el-pagination
              @current-change="handleCurrentChangea"
              :current-page="currentPage2"
              layout="prev, pager, next"
              :total="counta">
            </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
        </el-col>
    </el-row>
  </div>

  <div id='dialogues'>
      <el-dialog
      title='确认提示'
      :visible.sync='dialogDelVisible'
      :close-on-click-modal='false'
      width='30%'>
      <span class='fw700 cross'>
        <i class='el-icon-warning'></i>
          专辑: {{name}}
      </span>
      <span class='cross'>专辑移除后不可恢复</span>
      <span slot='footer' class='dialog-footer'>
        <el-button size='mini' @click='dialogDelVisible = false'>取 消</el-button>
        <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
      </span>
    </el-dialog>
  </div>

  <div id='dialoguesdel'>
      <el-dialog
      title='确认提示'
      :visible.sync='adialogDelVisible'
      :close-on-click-modal='false'
      width='30%'>
      <span class='fw700 cross'>
        <i class='el-icon-warning'></i>
          音乐: {{aname}}
      </span>
      <span class='cross'>音乐移除后不可恢复</span>
      <span slot='footer' class='dialog-footer'>
        <el-button size='mini' @click='adialogDelVisible = false'>取 消</el-button>
        <el-button size='mini' type='primary' @click='adeleteconfirm'>确 定</el-button>
      </span>
    </el-dialog>
  </div>

</div>
</template>
<script src='@/assets/js/artistdetail.js'></script>
<style scoped>
.avatariconx{
    width: 180px;
    height: 180px;
    margin-top: 50px;
    margin-left: 30px;
    margin-bottom: 50px;
    display: block;
    float: left;
    background-size: 100% 100%;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.3);
}
#artistDetail{
  overflow: auto;
}
.title{
  color: #34363A;
  font-size: 1.8em;
  display: block;
  float: left;
  margin-top: 107px;
  margin-left: 30px;
  float: left;
  width: calc(100% - 570px);
  text-align: left;
}
.desc{
  display: block;
  float: left;
  width: calc(100% - 270px);
  text-align: left;
  margin-top: 15px;
  margin-left: 30px;
}
.cell img{
  width: 40px;
  height: 40px;
  display: block;
  float: left;
  margin-right: 10px;
}
.cell i{
  display: block;
  float: left;
}
#tabsx{
  padding: 0px 15px;
  display: block;
  clear: both;
  overflow: auto;
  border-top: 1px solid #e2e2e2;
  padding-top: 40px;
}

.paginationcenters{
  padding: 50px 0px;
}

.el-table__row:hover{
  background-color: inherit;
}
</style>
