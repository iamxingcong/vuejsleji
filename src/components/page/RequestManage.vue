<template>
  <div id='RequestManage'>
    <div class="white">
      <div class="filterwrap mt15 left">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
                请求状态
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>
                <i @click='filtx("all", "全部")'> 全部 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i @click='filtx("WAITING", "等待审核")' :class='status === "WAITING" ? "active" : "noac"'> 等待审核 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='filtx("SUCCEED", "申请通过")'  :class='status === "SUCCEED" ? "active" : "noac"'> 申请通过 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='filtx("REJECTED", "拒绝")'  :class='status === "REJECTED" ? "active" : "noac"'> 拒绝 </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
      <div class="filteralreay">
         <span v-if='statusLabel'  class='el-tag el-tag--medium el-tag--light right'>
            {{ statusLabel }}
            <i class="el-tag__close el-icon-close"  @click='clearstatus()'></i>
          </span>
      </div>
      <div class="mg15">
        <el-table
          :data="tableDatab"
          style="width: 100%"
        >
          <el-table-column
            prop="uuid"
            label="音乐ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名称">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="请求时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="company_name"
            label="公司名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱地址"
            width="150">
          </el-table-column>
           <el-table-column
            prop="status"
            label="状态"
          >
            <template slot-scope="scope">
              {{ scope.row.status | optfil(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="uuid"
            label="操作"
            width="150"
          >
          <template slot-scope="scope">
               <el-button
                type="text"
                @click="RequestDetail(scope.row)">查看</el-button>
               <el-button
                type="text"
                v-if='scope.row.status === "WAITING"'
                @click="agree(scope.row)">通过</el-button>
               <el-button
                type="text"
                 v-if='scope.row.status === "WAITING"'
                @click="refuse(scope.row)"
               >
                拒绝
               </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

       <div class='paginationcenters'>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          layout="prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script src='@/assets/js/requestmanage.js'>
</script>
<style scoped>
.paginations{
  padding-bottom: 35px;
}
.active{
  background-color: #181932;
  color:#fff;
}
.el-dropdown-menu__item i{
  width: 140px;
  display: block;
  text-align: center;
}
.el-dropdown-menu__item{
  padding: 0px;
}
.filteralreay .el-tag{
  float: left;
  margin-left: 15px;
}
.filteralreay{
  display: block;
  clear: both;
  margin-top: 15px;
  padding-top: 15px;
  overflow: auto;
}
</style>
