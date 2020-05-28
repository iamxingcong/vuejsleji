<template>
  <div id='MusicFilter'>
    <div class="whitewraps">

      <div class="filterwrap">
        <span class="right mr15 btngroupsx">
          <el-button size="mini" @click="addmusicpop" type='primary'>添加音乐</el-button>
        </span>
        <div class='cssinglgex' v-for="i in searchTotal"  :key="i.id" >
          <template v-if="i.type !== 'SPEED'">
            <el-dropdown
              placement='top-start'>
            <span class="cktit left mr15"> {{ i.name }} </span>
            <el-dropdown-menu slot="dropdown">
              <el-checkbox-group   v-model="filtervs"   @change="btnstyle">
                <el-checkbox
                  v-for="s in i.children"
                  :label="s"
                  :key="s.id"
                  :border="false"
                >
                  {{s.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-if="i.type === 'SPEED'">
            <el-dropdown
              placement='top-start'>
              <span class="cktit left mr15"> {{ i.name }} </span>
              <el-dropdown-menu slot="dropdown">
              <el-radio-group v-model="speeds"
              @change="btnstyleradio"
              >
                <el-radio
                  v-for="s in i.children"
                  :label="s"
                  :key="s.id"
                  :border="false"
                  @click.native.prevent="clickitem(s)"
                >
                  {{s.name}}
                </el-radio>
              </el-radio-group>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </div>

        <el-row v-if="clearAll" class="filteralreay">
          <el-tag
            v-for="tag in tags"
            :key="tag.id"
            @close="cltag(tag)"
            closable
            size="medium"
          >
            {{tag.name}}
          </el-tag>
          <el-button  type="text" size="mini" class="mgl15" @click="clicktagsall">清除全部</el-button>
        </el-row>

      </div>
    </div>

    <div class="whitewraps">

      <div class="pd15">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column
            prop="avatar"
            label="听"
            width="55"
          >

            <template slot-scope="scope">
              <div class='avatars'   :style='{ backgroundImage: `url(${ scope.row.avatar })` }'></div>
                <i class='play'  v-if='playstatus[scope.$index].pl === false'  :style='{ backgroundImage: `url(${ play })` }' @click='playing(scope)'></i>
                <i v-if='playstatus[scope.$index].pl === true' class='stop' :style='{ backgroundImage: `url(${ stop })` }' @click='stopplaying(scope)'></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="uuid"
            label="音乐ID"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            label="音乐名称"
           >
            <template slot-scope="scope">
                <i class='gotosome'
                  type="text"
                @click="checkMusic(scope.row.uuid)">{{scope.row.name}}</i>
            </template>
          </el-table-column>
          <el-table-column
            prop="composer"
            label="艺术家"
           >
          </el-table-column>
          <el-table-column
            prop="album_name"
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
            label="音乐描述"
           >
          </el-table-column>
          <el-table-column
            prop="track_count"
            label="版本数"
            width="65">
          </el-table-column>
          <el-table-column
            prop="uuid"
            label="操作"
            width="105">
            <template slot-scope="scope">
                <el-button
                  type="text"
                @click="checkMusic(scope.row.uuid)">查看</el-button>
                <el-button
                  type="text"
                  @click="downloadMusic(scope.row.uuid)">下载</el-button>
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

    <div id='addlabel'>
      <el-dialog title='添加音乐'
      :close-on-click-modal='false'
      top='15px'
      width='1000px'
      :visible.sync='dialogFormVisible'>
        <el-form :model='form'>
          <el-col :xl="11"  :sm="22" >
            <el-form-item label='音乐名称：' :label-width='formLabelWidth'>
              <el-input v-model='form.name' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="11"  :sm="22" >
            <el-form-item label='音乐编号：' :label-width='formLabelWidth'>
              <el-input v-model='form.music_no' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="11"  :sm="22" >
            <el-form-item label='编曲作者：' :label-width='formLabelWidth'>
              <el-input v-model='form.arranged_by' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="11"  :sm="22" >
            <el-form-item label='曲作者：' :label-width='formLabelWidth'>
              <el-input v-model='form.composer' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="11"  :sm="22" >
            <el-form-item label='词作者：' :label-width='formLabelWidth'>
              <el-input v-model='form.lyricist' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="11"  :sm="22" >
            <el-form-item label='上传音乐文件：' :label-width='formLabelWidth'>

              <el-upload
                class="avatar-uploader"
                :action="urls"
                :data='updatas'
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <i v-if="imageUrl"  class="avatar">{{imageUrl}}</i>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label='音乐描述：' :label-width='formLabelWidth'>
              <el-input
                type='textarea'
                :autosize='{ minRows: 3, maxRows: 4}'
                placeholder='请输入音乐描述：'
                v-model='form.desc'>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='addmusics'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script src="@/assets/js/musicfilter.js"></script>
<style scoped>
.el-checkbox-button, .el-checkbox-button__inner,
.el-radio-button, .el-radio-button--mini{
    position: relative;
    display: block;
    opacity: 0.9;
}
.filterwrap{
  margin-top: 15px;
}
.cktit{
    line-height: 25px;
    color: #443344;
    padding: 0px 25px;
    font-size: 16px;
    text-align: left;
    font-weight: 600;
}
.filterwrap .el-row{
  margin-bottom: 5px;
  display: block;
  clear: both;
}
.whitewraps  .el-tag{
  margin-bottom: 15px;
  margin-left: 15px;
  float: left;
}
.whitewraps .el-row  .el-button--text{
  float: left;
}
.el-table::before {

    height: 0px !important;
}
.avatar{
  line-height: 20px;
  display: block;
  text-align: left;
  font-style: normal;
  font-size: 0.8em;
}
.mgl15{
  margin-left: 15px;
}
.filteralreay{
  padding-top: 30px;
}
.el-checkbox-group,
.el-radio-group {
    display: block;
    z-index: 999;
    background: #fff;
    width: 603px;
}
.el-checkbox-button{
  margin-bottom: 5px;
  margin-right: 5px;
}
.avatars,.play, .stop{
  width: 43px;
  height: 43px;
  display: block;
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;
}
.play,.stop{
  background-size: 100% 100%;

}
.el-dropdown-menu{
  background:rgba(255,255,255,1);
  box-shadow:0px 5px 15px 0px rgba(0,0,0,0.15);
}
.play{
  z-index: 9999;
}

.gotosome{
  font-style: normal;
  cursor: pointer;
}
.cssinglgex{
  display: block;
  float: left;
}
.el-radio,
.el-radio__input,
.el-checkbox, .el-checkbox__input{
  display: block;
  float: left;
  margin-bottom: 26px;
  width: 160px;
  height: 35px;
  line-height: 35px;
  margin: 0px 10px;
  padding: 0px 10px;
  margin-right: 0px;
  z-index: 949;
  position: relative;
}
.el-checkbox:hover{
  background-color: #EFEFF5;
}

</style>
