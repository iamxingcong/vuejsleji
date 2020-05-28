<template>
  <div id='UserManage'>
    <div class="white">
      <div class='filterwrap'>
        <div class='cssinglgex' >
          <el-dropdown
            placement='top-start'>
            <span class="cktit left mr15"> 用户类型 </span>
            <el-dropdown-menu slot="dropdown">
            <el-radio-group v-model="vip_type" @click="uuidinput">
              <el-radio
                v-for="s in options"
                :label="s"
                :key="s.value"
                :border="false"
                @click.native.prevent="clickitem(s)"
              >
                {{s.label}}
              </el-radio>
            </el-radio-group>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div  class='cssinglgex'>
          <el-dropdown
            placement='top-start'>
            <span class="cktit left mr15"> 账号状态 </span>
            <el-dropdown-menu slot="dropdown">
            <el-radio-group v-model="is_active" @click="uuidinput">
              <el-radio
                v-for="s in isactivd"
                :label="s"
                :key="s.value"
                :border="false"
                @click.native.prevent="sclickitem(s)"
              >
                {{s.label}}
              </el-radio>
            </el-radio-group>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div  class='cssinglgex'>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
                注册时间
              </i>
            </span>
            <el-dropdown-menu slot="dropdown" class='specialtm'>
              <el-dropdown-item>
                <el-date-picker
                @change='uuidinput'
                v-model="created_at__gte"
                type="datetime"
                value-format='yyyy-MM-dd HH:mm:ss'
                placeholder="选择日期时间">
              </el-date-picker>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-date-picker
                @change='uuidinput'
                v-model="created_at__lte"
                type="datetime"
                value-format='yyyy-MM-dd HH:mm:ss'
                placeholder="选择日期时间">
              </el-date-picker>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="addUser"  type="primary"  >新增用户</el-button>
        </div>
        <span class="right mt15 mr15 orderlists">
          <el-input placeholder="ID/账号" v-model="suuid" :class='largesmallx'  @focus='smlg' @blur='smsmx'>
            <template slot="prepend"> 查询内容 </template>
            <el-button slot="append" type='text'  @click='uuidinput'> 查找 </el-button>
          </el-input>
        </span>
      </div>
       <el-row class="filteralreay">
          <span v-if='vip_type.label.length > 0'  class='el-tag el-tag--medium el-tag--light left'>
            {{ vip_type.label }}
            <i class="el-tag__close el-icon-close"  @click='clearvip()'></i>
          </span>
          <span v-if='is_active.label.length > 0'  class='el-tag el-tag--medium el-tag--light left'>
            {{ is_active.label }}
            <i class="el-tag__close el-icon-close"  @click='clearlabel()'></i>
          </span>
       </el-row>
      <div class="pd15">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="uuid"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="is_vip"
            label="用户类型">
            <template slot-scope="scope">
              <span> {{ scope.row.vip_type == 'VIP' ?  '高级会员' :   '普通会员' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="download_origin_count"
            label="剩余下载量">
          </el-table-column>
          <el-table-column
            prop="cumulative_pay"
            label="总消费金额">
          </el-table-column>
          <el-table-column
            prop="last_login"
            width="150px"
            label="上次登录时间">
          </el-table-column>
          <el-table-column
            prop="is_active"
            label="状态">
            <template slot-scope="scope">
              <el-switch
                  active-color="#5B7BFA"
                  inactive-color="#dadde5"
                  v-model="scope.row.is_active"
                  @change="schange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            prop="addresse"
            label="操作">
            <template slot-scope="scope">
               <el-button
                type="text"
                @click="detailedUser(scope.row)">查看</el-button>
               <el-button
                type="text"
                @click="edit(scope.row)">编辑</el-button>
               <el-button
                type="text"
                @click="hddelete(scope.row)"
               >
                删除
               </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class='paginationcenters'>
        <el-pagination
          @current-change="handleCurrentChangeg"
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
<script src='@/assets/js/usermanage.js'>
</script>
<style scoped>
  .white{
    padding-bottom: 15px;
  }
  .flex4  .demo-input-suffix{
    text-align: left;
    margin-left: 20px;
  }
  .demo-input-suffix .el-input{
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
  .el-checkbox-group{
      display: block;
      z-index: 999;
      background: #fff;
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
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner,
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #60dd48;
    background: #60dd48;
  }
  .cssinglgex{
    margin-top: 15px;
  }
  .filterwrap{
    overflow: auto;
    padding-bottom: 15px;
  }
  .filteralreay  .el-tag{
    margin-left: 30px;
  }
  input{
    cursor: pointer;
  }
</style>
