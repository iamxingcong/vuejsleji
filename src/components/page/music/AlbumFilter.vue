<template>
  <div id='AlbumFilter'>
    <div class="whitewraps">
      <div class="filterwrap mt15"   v-show ='filtershow'>
        <div class='cssinglgex'>
           <el-dropdown
            placement='top-start'>
            <span class="cktit left mr15"> 厂牌 </span>
            <el-dropdown-menu slot="dropdown">
            <el-radio-group v-model="radiom"
              @change="handleCheckedLabelsChange">
              <el-radio
                v-for="s in labeluids"
                :label="s"
                :key="s.uuid"
                :border="false"
              >
                {{s.name}}
              </el-radio>
              </el-radio-group>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class='cssinglgex'>
           <el-dropdown
            placement='top-start'>
            <span class="cktit left mr15"> 艺术家 </span>
            <el-dropdown-menu slot="dropdown">
            <el-radio-group v-model="radioa"
              @change="mhandleCheckedLabelsChange">
              <el-radio
                v-for="s in musicianuids"
                :label="s"
                :key="s.uuid"
                :border="false"
              >
                {{s.name.substr(0, 6)}}
              </el-radio>
              </el-radio-group>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
         <span class="right mr15 btngroupsx">
            <el-button type="primary"  @click='searchShow'  icon="el-icon-search" size="mini">搜索</el-button>
            <el-button type="primary" size="mini" @click='openaddalbum'>添加专辑</el-button>
          </span>
        <el-row>
          <span v-if='radiom.name' class='el-tag el-tag--medium el-tag--light right'>
            {{ radiom.name }}
             <i class="el-tag__close el-icon-close"  @click='xclearsearch()'></i>
          </span>
          <span v-if='radioa.name' class='el-tag el-tag--medium el-tag--light right'>
            {{ radioa.name }}
             <i class="el-tag__close el-icon-close"  @click='clearsearch()'></i>
          </span>
        </el-row>
      </div>
      <div class='searchinput'   v-show ='!filtershow'>
          <el-input placeholder="请输入搜索内容" v-model='pkeywords' @keyup.13.native="searching" class="input-with-select">
            <el-button slot="prepend" icon="el-icon-search" v-on:click="searching">搜索</el-button>
            <template slot="append">
              <el-button @click='clearsearchX' class='el-icon-close'></el-button>
            </template>
        </el-input>
      </div>

      <div class="pd15">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column label="ID" width="300">
           <template slot-scope="scope">
              <div class='avt' @click="checkAlbum(scope.row.uuid)">
                <img class='avatars' :src='`${ scope.row.cover }`' />
              </div>
              <i class='uuidx'> {{ scope.row.uuid }} </i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="专辑"
            width="170px"
           >
          </el-table-column>
          <el-table-column
            prop="musician_info.name"
            label="艺术家">
          </el-table-column>
          <el-table-column
            prop="music_count"
            label="作品数">
          </el-table-column>
          <el-table-column
            prop="uuid"
            label="操作"
            width="145">
              <template slot-scope="scope">
                <el-button
                  type="text"
                 @click="checkAlbum(scope.row.uuid)">查看</el-button>
                <el-button
                  type="text"
                  @click="editAlbum(scope.row.uuid)">编辑</el-button>
                <el-button
                  type="text"
                  @click="deleteAlbum(scope.row.uuid)">删除</el-button>
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
    <div id='openaddalbum'>
      <el-dialog title='添加专辑：'
      width='500px'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisiblea'>
        <el-form :model='formb'  :rules="rulesb" ref="formb" >
          <el-form-item label='专辑名称'  prop='name' :label-width='formLabelWidth'>
            <el-input v-model='formb.name' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='专辑作者' :label-width='formLabelWidth'>
            <el-select v-model="formb.musician_id" placeholder="请选择">
              <el-option
                v-for="(item, indx) in musicianuids"
                :key="indx"
                :label="item.name"
                :value="item.uuid">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='厂牌：' prop='label_id' autocomplete='on' :label-width='formLabelWidth'>
            <el-select v-model="formb.label_id" placeholder="请选择">
              <el-option
                v-for="(item, indx) in labeluids"
                :key="indx"
                :label="item.name"
                :value="item.uuid">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='专辑封面' :label-width='formLabelWidth'>
            <el-upload
              class="avatar-uploader"
              :action="urls"
              :data='updatas'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
           <el-form-item label='专辑描述' :label-width='formLabelWidth'>
            <el-input
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入专辑描述'
              v-model='formb.desc'>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisiblea = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='addalbums("formb")'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='editalbum'>
      <el-dialog title='编辑专辑：'
      width='500px'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisibleedit'>
        <el-form :model='formedit'>
          <el-form-item label='专辑名称'  :label-width='formLabelWidth'>
            <el-input v-model='formedit.name' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='专辑作者' :label-width='formLabelWidth'>
             <el-select v-model="formedit.musician_id" placeholder="请选择">
              <el-option
                v-for="(item, indx) in musicianuids"
                :key="indx"
                :label="item.name"
                :value="item.uuid">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='厂牌' autocomplete='on' :label-width='formLabelWidth'>
            <el-select v-model="formedit.label_id" placeholder="请选择">
              <el-option
                v-for="item in labeluids"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='专辑封面：' :label-width='formLabelWidth'>

            <el-upload
              class="avatar-uploader"
              :action="urls"
              :data='updatas'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label='专辑描述' :label-width='formLabelWidth'>
            <el-input
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入专辑描述'
              v-model='formedit.desc'>
            </el-input>
          </el-form-item>

        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisibleedit = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='editalbumConfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='dialogues'>
       <el-dialog
        title='确认提示'
        :visible.sync='dialogVisible'
        :close-on-click-modal='false'
        width='30%'>
        <span class='fw700'>
          <i class='el-icon-warning'></i>
            是否确定删除专辑: {{uuid}}
        </span>
        <span>专辑删除后不可恢复</span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>
<script src="@/assets/js/albumfilter.js"></script>
<style scoped>
.el-select{
  width: 100%;
}
.el-checkbox-button, .el-checkbox-button__inner{
    position: relative;
    display: block;
    float: left;
    margin-left: 15px;
    opacity: 0.9;
    margin-bottom: 5px;
}
.filterwrap .el-row{
  margin-bottom: 5px;
}
.whitewraps  .el-tag{
  margin-bottom: 3px;
  margin-left: 15px;
  float: left;
}
.whitewraps  .el-row .el-button--text{
  display: block;
  float: left;
  color: #e2e2e2;
  margin-left: 15px;
  margin-top: -3.5px;
}
.el-table::before {

    height: 0px !important;
}
.el-row .el-form{
  width: 300px;
}
.el-row .inline{
  display: block;
  float: left;
  margin: 10px auto;
}
.el-row .inline:nth-child(2),
.el-row .inline:nth-child(3) {
  margin-left: 15px;

}
.el-tag{
  height: 25px;
  line-height: 25px;
}
.el-dialog__body span{
  display: block;
  clear: both;
  line-height: 2em;
}
.tagsright{
  display: block;
  float: right;
  width: calc(100% - 100px);
  text-align: left;
}
.el-radio-button{
  float: left;
  margin-bottom: 15px;
}

.el-dropdown{
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
}
.cssinglgex .el-dropdown{
  margin-right: 16px;
}
.cell button{
  float: left;
}
.tagt{
  height: 40px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 20px;
}
.tagt .tagx{
  height: 20px;
  line-height: 20px;
}
.cose{
  margin-left: 60px;
}
.filwrapx{
  margin-top: 30px;
  display: block;
  overflow: auto;
  position: relative;
}
.filwrapx .cssinglgex{
  padding-top: 24px;
}
.filwrapx::before{
  width: calc(100% - 30px);
  height: 1px;
  content: '';
  display: block;
  position: absolute;
  top: 0px;
  left: 15px;
  background:#DADBE0;
}
.active{
  background-color: #181932;
  color:#fff;
}
.el-dropdown-menu__item{
  padding: 0px;
}
.el-dropdown-menu__item i{
  width: 140px;
  display: block;
  text-align: center;
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
.searchinput{
  max-width: 400px;
  margin: 20px auto;
}
.avt{
  display: block;
  cursor: pointer;
}
</style>
