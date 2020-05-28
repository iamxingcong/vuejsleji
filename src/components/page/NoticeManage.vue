<template>
  <div id='NoticeManage'>
    <div class="white">
        <el-row>
          <div class="filterwrap mt15 left">
            <div  class='cssinglgex'>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="cktit left mr15">
                    消息状态
                  </i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <i @click='mstatus("WAITING", "等待发送")' :class='status === "WAITING" ? "active" : "noac"'> 等待发送 </i>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i @click='mstatus("SENT", "已发送")' :class='status === "SENT" ? "active" : "noac"'> 已发送 </i>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i @click='mstatus("REVERT", "撤回消息")' :class='status === "REVERT" ? "active" : "noac"'>撤回消息</i>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div  class='cssinglgex'>
              <el-dropdown
                placement='top-start'>
                <span class="cktit left mr15"> 栏目 </span>
                <el-dropdown-menu slot="dropdown">
                <el-radio-group v-model="column" @click="uuidinput">
                  <el-radio
                    v-for="s in columnlst"
                    :label="s"
                    :key="s.id"
                    :border="false"
                    @click.native.prevent="sclickitem(s)"
                  >
                    {{s.name}}
                  </el-radio>
                </el-radio-group>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <span class="right mt15 mr15 btngroupsx">
            <el-button size="mini" @click="createNotice">新增消息</el-button>
          </span>
          <span class="right mt15 mr15 orderlists">
            <el-input placeholder="ID/账号" v-model="search" :class='largesmallx'  @focus='smlg' @blur='smsmx'>
              <template slot="prepend"> 用户ID/账号 </template>
              <el-button slot="append" type='text'  @click='searchk'> 查找 </el-button>
            </el-input>
          </span>
        </el-row>
    </div>

    <div class="white mt15">
      <div class="pd15">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="60">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="250">
          </el-table-column>
          <el-table-column
            prop="updated_at"
            width="160"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="发布人员">
          </el-table-column>
          <el-table-column
            prop="column_name"
            label="栏目">
          </el-table-column>
          <el-table-column
            prop="status"
            label="消息分类">
              <template slot-scope="scope">
                {{ scope.row.status | stfil(scope.row.status) }}
              </template>
          </el-table-column>
          <el-table-column
            width="200"
            prop="id"
            label="操作">
            <template slot-scope="scope">
               <el-button
                type="text"
                @click="checkNotice(scope.row)">查看</el-button>
              <el-button
                type="text"
                 v-if='scope.row.status === "WAITING"'
                @click="editNotice(scope.row)">编辑</el-button>
              <el-button
                type="text"
                v-if='scope.row.status !== "SENT"'
                @click="deleteNotice(scope.row)">删除</el-button>
              <el-button
                v-if='scope.row.status === "WAITING"'
                type="text"
                @click="sents(scope.row)"> 发布 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='paginationcenters'>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage3"
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
            是否确定删除消息: {{ title }}
        </span>
        <span class='cross'>消息删除后不可恢复</span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>
<script src='@/assets/js/noticemanage.js'></script>

<style scoped>
  .white{
    padding-bottom: 15px;
  }
  .flex4  .demo-input-suffix{
    flex: 4;
    text-align: left;
    margin-left: 20px;
  }
  .demo-input-suffix .el-input,
  .demo-input-suffix .el-select{
    width: 200px;
  }
  .white .el-row{
    margin-bottom: 15px;
  }
  .demo-input-suffix button{
    float: right;
    margin-right: 15px;
  }
  .cell{
    display: flex;
  }
  .cell button{
    flex: 3;
  }
  i{
    font-style: normal;
  }
  .el-radio,
  .el-radio__input{
    display: block;
    margin-bottom: 26px;
    width: 160px;
    height: 35px;
    line-height: 35px;
    margin: 0px 10px;
    padding: 0px 10px;
    z-index: 949;
    position: relative;
  }
  .el-radio-group .el-radio:hover{
    background-color: #EFEFF5;
  }
  .active{
    background-color: #181932;
    color:#fff;
  }
</style>
