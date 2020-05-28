<template>
  <div id='MusicLists'>
    <div class="whitewraps">
        <div class="filterwrap"   v-show ='filtershow'>
            <div class='cssinglgex'>
              <el-dropdown
                placement='top-start'>
                <span class="cktit left mr15"> 创建时间 </span>
                <el-dropdown-menu slot="dropdown">
                  <el-date-picker
                  v-model="created_at__gte"
                  @change='timepickerx'
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <span class="right mt15 mr15 btngroupsx">
              <el-button size='mini'  @click='searchShow'  type="primary" icon="el-icon-search"> 搜索 </el-button>
              <el-button size="mini" type='primary' @click="addplaylists">新建曲单</el-button>
            </span>
        </div>
        <div class='searchinput'   v-show ='!filtershow'>
          <el-input placeholder="请输入搜索内容" v-model='pkeywords' @keyup.13.native="searching" class="input-with-select">
            <el-button slot="prepend" icon="el-icon-search" v-on:click="searching">搜索</el-button>
            <template slot="append">
              <el-button @click='clearsearchX' class='el-icon-close'></el-button>
            </template>
          </el-input>
        </div>
    </div>
    <div class="white mt15 pd15">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="uuid"
            label="ID"
            width="300">
             <template slot-scope="scope">
              <div class='avt' @click="detailedUser(scope.row.uuid)">
                <img class='avatars' :src='`${ scope.row.cover }`' />
               </div>
               <i class='uuidx'> {{ scope.row.uuid }} </i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="单曲"
            width="180">
             <template slot-scope="scope">
               <el-button
                @click="detailedUser(scope.row.uuid)"
                type="text">
                {{ scope.row.name }}
               </el-button>
             </template>
          </el-table-column>
          <el-table-column
            width='250px'
            prop="categories"
            label="标签">
            <template slot-scope="scope">
             <i v-for='x in scope.row.category_info_list' :key='x.id'>{{ x.name}} 、</i>
            </template>
          </el-table-column>
           <el-table-column
            prop="music_count"
            label="作品数">
          </el-table-column>
           <el-table-column
            prop="is_recommend"
            label="显示位置">
            <template slot-scope="scope">
              <span> {{ scope.row.is_recommend ?  '推荐页' :   '' }}</span>
            </template>
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
            width="120"
            prop="addresse"
            label="操作">
            <template slot-scope="scope">
               <el-button
                type="text"
                @click="detailedUser(scope.row.uuid)">查看</el-button>
               <el-button
                type="text"
                @click="hddelete(scope.row)"
               >
                删除
               </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div class='paginationcenters'>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage3"
          layout="prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
    <div id='addplaylist'>
      <el-dialog title='添加曲单：'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisible'>
        <el-form :model='form'>
          <el-form-item label='曲单名称：' :label-width='formLabelWidth'>
            <el-input v-model='form.name' placeholder="请输入曲单名称：" maxlength='12' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='曲单描述：' :label-width='formLabelWidth'>
            <el-input
            maxlength='50'
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入曲单介绍'
              v-model='form.desc'>
            </el-input>
          </el-form-item>
           <el-form-item label='添加封面：' :label-width='formLabelWidth'>

            <el-upload
              class="avatar-uploader"
              :action="urls"
              :data='updata'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label='标签：' :label-width='formLabelWidth'>
             <el-select v-model="form.categories" multiple placeholder="请选择">
              <el-option
                v-for="item in catetorys"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label='是否曲单推荐页显示:'  :label-width='formLabelWidth'>
            <el-switch
              v-model='form.is_recommend'
              active-color='#13ce66'
              inactive-color='#e2e2e2'>
            </el-switch>
          </el-form-item>

          <el-form-item label='曲单状态：' :label-width='formLabelWidth'>
            <el-switch
              v-model='form.is_active'
              active-color='#13ce66'
              inactive-color='#e2e2e2'>
            </el-switch>
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='addplay'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='dialogues'>
       <el-dialog
        title='确认提示'
        :visible.sync='dialogVisible'
        :close-on-click-modal='false'
        width='30%'>
        <span class='fw700 cross'>
          <i class='el-icon-warning'></i>
            是否确定删除曲单: {{ uuid }}
        </span>
        <span class='cross'>曲单删除后不可恢复</span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>
<script src="../../assets/js/musiclist.js"></script>
<style scoped>
  .white{
    padding-bottom: 15px;
  }
  .flex3  .demo-input-suffix{
    flex: 3;
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
  .cell i{
    display: block;
    float: left;
  }
  .searchinput{
    max-width: 400px;
    margin: 20px auto;
  }
  .avt{
    cursor: pointer;
  }
</style>
