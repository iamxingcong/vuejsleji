<template>
<div id='UserAuthList'>
  <div class="whitewraps">
    <div class="top15x">
      <el-row>
        <div class='cssinglgex mt15'>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
                授权状态
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i  @click='statusx("", "")'> 全部 </i> </el-dropdown-item>
              <el-dropdown-item><i  @click='statusx("WAITING", "等待授权")'> 等待授权 </i> </el-dropdown-item>
              <el-dropdown-item><i  @click='statusx("SUCCEED", "授权成功")'> 授权成功 </i></el-dropdown-item>
              <el-dropdown-item><i  @click='statusx("CANCELED", "取消授权")'> 取消授权 </i></el-dropdown-item>
              <el-dropdown-item><i  @click='statusx("FAILED", "授权失败")'> 授权失败 </i></el-dropdown-item>
              <!-- WAITING(等待授权)/SUCCEED(授权成功)/FAILED(授权失败)/CANCELED(取消授权) -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span class="right mt15 mr15 orderlists">
          <el-input placeholder="ID/账号" v-model="keywordsx" :class='largesmallx' @focus='smlg' @blur='smsmx'>
            <template slot="prepend"> 查询内容 </template>
            <el-button slot="append" type='text'  @click='searchxt'> 查找 </el-button>
          </el-input>
        </span>
        <span class='cross left mgl25' v-if='statusName'> {{ statusName }} </span>
      </el-row>
    </div>
    <div class="mg15"  :gutter='15'>
          <el-table
            :data="tblist"
            style="width: 100%">
            <el-table-column
              width='357px'
              label="授权编号">
              <template slot-scope="scope">
                 <img :src='scope.row.music_info.avatar' />
                 <i> {{ scope.row.uuid }} </i>
              </template>
            </el-table-column>

             <el-table-column
              label="音乐名称"
              prop='name'>
              <template slot-scope="scope">
                {{ scope.row.music_info.name }}
              </template>
            </el-table-column>
             <el-table-column
              label="授权信息"
              prop='data.area.name'>
            </el-table-column>
             <el-table-column
              width='200px'
              label="授权起止时间"
              prop='name'>
               <template slot-scope="scope">
                <i> {{ scope.row.created_at }} </i>
                <i v-if='scope.row.expire_time'> {{ scope.row.expire_time }} </i>
               </template>
            </el-table-column>
             <el-table-column
              label="授权状态"
              prop='name'>
              <template slot-scope="scope">
                <i> {{ scope.row.status | filstatus(scope.row.status )  }} </i>
               </template>
            </el-table-column>

             <el-table-column
              width='130px'
              label="授权价格"
              prop='amount'>
              <template slot-scope="scope">
              <i> ￥ {{scope.row.amount }}</i>
              </template>
            </el-table-column>
             <el-table-column
              width='110px'
              label="操作"
              prop='name'>
               <template slot-scope="scope">
                <el-button
                  type="text"
                @click="checks(scope.row.uuid)">查看</el-button>

              </template>
            </el-table-column>
          </el-table>
    </div>

      <div class='paginationcenters'>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        layout="prev, pager, next"
        :total="count">
      </el-pagination>
      </div>
   </div>

</div>
</template>
<script src='@/assets/js/userauthlist.js'></script>
<style scoped>

.el-dropdown{
  float: left;
  margin-left: 25px;
}
i{
  font-style: normal;
}
.el-dropdown-menu  li i{
  display: block;
  width: 100px;
  color: #34363A;
  padding: 0px 10px;
}
.specialtm{
  min-width: 240px;
}
.el-dropdown-menu  li{
  width: 120px;
  padding: 0px  10px;
}
.el-dropdown-menu  li:hover i{
  background-color: #EDEDF3;
}
.el-dropdown-menu  li:hover{
  background-color: #ffffff;
}
.el-table th.is-leaf{
  background-color: #ffffff;
}

</style>
