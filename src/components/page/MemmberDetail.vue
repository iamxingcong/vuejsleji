<template>
  <div id='MemmberDetail'>
    <div class="white">
      <div class="brnaLogo"  :style='{ backgroundImage: `url(${img})` }'></div>
      <div class="logotitle">
        {{ detail.name }}
        ({{ detail.type === 'VIP' ? '高级会员' : '普通会员'}})
      </div>
      <span class='desc'> {{detail.desc}} </span>
    </div>

    <div class="white mt15 pt15">
      <el-table
          :data="tableDatab"
          style="width: 100%"
        >
          <el-table-column
            prop="user_name"
            label="用户名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="download_origin_count"
            label="剩余下载数"
          >
          </el-table-column>
          <el-table-column
            prop="order_count"
            label="订单数"
          >
          </el-table-column>
          <el-table-column
            prop="project_count"
            label="创建项目数"
          >
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="注册时间"
          >
          <template slot-scope="scope">
            {{ scope.row.created_at.substr(0, 10)}}
          </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建会员时间"
          >
            <template slot-scope="scope">
              {{ scope.row.created_at.substr(0, 10)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="expire_time"
            label="会员到期时间"
          >
          <template slot-scope="scope">
            {{ scope.row.expire_time.substr(0, 10)}}
          </template>
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="操作"
            width="250"
          >
          <template slot-scope="scope">
               <el-button
                type="text"
                @click="RequestDetail(scope.row)">用户详情</el-button>
               <!-- <el-button
                type="text"
                @click="hddelete(scope.row)"
               >
                删除
               </el-button> -->
            </template>
          </el-table-column>
        </el-table>

        <div class="paginationcenters">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            layout="prev, pager, next"
            :total="count">
          </el-pagination>
        </div>
    </div>

    <div id='dialogues'>
       <el-dialog
        title='确认提示'
        :visible.sync='dialogVisible'
        :close-on-click-modal='false'
        width='30%'>
        <span class='fw700 cross'>
          <i class='el-icon-warning'></i>
            是否确定删除用户: {{ name }}
        </span>
        <span class='cross'>用户删除后不可恢复</span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>
<script src='@/assets/js/memberdetail.js'></script>
<style scoped>
.white{
  padding: 0px 15px;
  overflow: auto;
}
.brnaLogo{
    width: 86px;
    height: 86px;
    background-position: center center;
    background-size: 100% auto;
    border-radius: 86px;
    margin-left: 30px;
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid #e2e2e2;
    float: left;
}
.logotitle{
    line-height: 110px;
    height: 70px;
    font-weight: 700;
    font-size: 18px;
    width: calc(100% - 135px);
    display: block;
    float: right;
    text-align: left;
}
.paginations{
  padding-top: 15px;
}
.membernews .title{
  font-weight: 700;
  clear: both;
  text-align: left;
  line-height: 2em;
  display: block;
}
.single  .logop{
  width: 40px;
  height: 40px;
  display: block;
  float: left;
  border-radius: 40px;
  background-position: center center;
}
.single{
  overflow: auto;
}
.membernews{
  padding-bottom: 45px;
}
.single .tts,
.single .time{
  width: calc(100% - 70px);
  text-align: left;
  display: block;
  float: right;
  line-height: 20px;
}
.single .time{
  color: #434343;
  opacity: 0.8;
}
a{
  text-decoration: none;
  color: #0079FE;
  cursor: pointer;
}
.single {
  margin-bottom: 10px;
  padding-top: 15px;
  padding-bottom: 5px;
  border-top: 1px solid #e2e2e2;
}
.desc{
    line-height: 40px;
    width: calc(100% - 135px);
    display: block;
    float: right;
    text-align: left;
}
</style>
