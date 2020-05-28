<template>
<div id='Artistlist' class='whitewraps'>
  <div class='wrapx'>
    <div class='searchinput'   v-show ='!filtershow'>
      <el-input placeholder="请输入搜索内容" v-model='pkeywords' @keyup.13.native="searching" class="input-with-select">
        <el-button slot="prepend" icon="el-icon-search" v-on:click="searching">搜索</el-button>
        <template slot="append">
          <el-button @click='clearsearchX' class='el-icon-close'></el-button>
        </template>
      </el-input>
    </div>
    <el-row   v-show ='filtershow'>
      <div class='btngroupsx right mt15 mgr15'>
        <el-button size='mini'  @click='searchShow'  type="primary" icon="el-icon-search"> 搜索 </el-button>
        <el-button size='mini' @click='addartisx'> 添加艺术家 </el-button>
      </div>
    </el-row>
    <div class='sinart' v-for='n in dtl' :key='n.uuid'>
      <i class='aravatarx' :style='{ backgroundImage: `url(${ n.avatar ? n.avatar : img })` }'  @click='gotoDetail(n)'></i>
      <span class='bgngroupsx mgr15 mt15'>
        <el-button size='mini' type='text' @click='edit(n)'> 编辑 </el-button>
        <el-button size='mini' type='text' @click='delx(n)'> 删除 </el-button>
      </span>
      <i class='name'> {{ n.name }} </i>
      <div class='wraprt'>
        <span class='mcount mr15'> 音乐 <i> {{ n.music_count }} </i> </span>
        <span class='mcount'> 专辑 <i> {{n.album_count }}</i> </span>
      </div>
      <span class='desc'> {{ n.desc }} </span>
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
      <el-dialog title='添加艺术家'
      :close-on-click-modal='false'
      top='15px'
      width='500px'
      :visible.sync='dialogAddFormVisible'>
        <el-form :model='form'
        :label-width='formLabelWidth'>

            <el-form-item label='姓名' >
              <el-input v-model='form.name' autocomplete='off'></el-input>
            </el-form-item>

            <el-form-item label='头像' >

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

            <el-form-item label='选择厂牌：' prop='label_id' autocomplete='on' :label-width='formLabelWidth'>
            <el-select v-model="form.label_id" placeholder="请选择">
              <el-option
                v-for="(item, indx) in labeluids"
                :key="indx"
                :label="item.name"
                :value="item.uuid">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label='艺术家描述：' >
            <el-input
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入艺术家描述：'
              v-model='form.desc'>
            </el-input>
          </el-form-item>

        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogAddFormVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='addartstcfm'>确 定</el-button>
        </div>
      </el-dialog>
  </div>

   <div id='dialogues'>
      <el-dialog
      title='确认提示'
      :visible.sync='dialogDelVisible'
      :close-on-click-modal='false'
      width='30%'>
      <span class='fw700 cross'>
        <i class='el-icon-warning'></i>
          艺术家: {{name}}
      </span>
      <span class='cross'>艺术家删除后不可恢复</span>
      <span slot='footer' class='dialog-footer'>
        <el-button size='mini' @click='dialogDelVisible = false'>取 消</el-button>
        <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
      </span>
    </el-dialog>
  </div>

  <div id='editlabel'>
      <el-dialog title='编辑艺术家'
      :close-on-click-modal='false'
      top='15px'
      width='500px'
      :visible.sync='dialogeditFormVisible'>
        <el-form :model='eform'
        :label-width='formLabelWidth'>

            <el-form-item label='姓名' >
              <el-input v-model='eform.name' autocomplete='off'></el-input>
            </el-form-item>

            <el-form-item label='头像' >

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

            <el-form-item label='选择厂牌：' prop='label_id' autocomplete='on' :label-width='formLabelWidth'>
            <el-select v-model="eform.label_id" placeholder="请选择">
              <el-option
                v-for="(item, indx) in labeluids"
                :key="indx"
                :label="item.name"
                :value="item.uuid">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label='音乐描述：' >
            <el-input
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入音乐描述：'
              v-model='eform.desc'>
            </el-input>
          </el-form-item>

        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogeditFormVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='editartstcfm'>确 定</el-button>
        </div>
      </el-dialog>
  </div>

</div>
</template>
<script src='@/assets/js/artistlist.js'></script>
<style scoped>
.sinart{
  width:330px;
  height:230px;
  border:1px solid rgba(218,219,224,1);
  float: left;
  margin: 20px 39px;
  margin-bottom: 40px;
}
.aravatarx{
  width:98px;
  height:99px;
  margin-top: 33px;
  margin-left: 20px;
  display: block;
  background-size: 100% 100%;
  float: left;
  cursor: pointer;
  margin-right: 21px;
}
.name{
  margin-top: 18px;
  font-weight: bold;
  float: left;
  width: 172px;
  text-align: left;
  color: #34363A;
  line-height: 20px;
  height: 20px;
  font-size: 1.5em;
  text-overflow: ellipsis;
  overflow: hidden;
}
.wraprt{
  display: block;
  float: left;
  margin-top: 15px;
  width: 172px;
  text-align: left;
  color: #6C717A;
}
.mcount i{
  color: #34363A;
  font-weight: bold;
  font-size: 1.1em;
}
.desc{
  width: 290px;
  padding-top: 26px;
  margin-left: 20px;
  text-align: left;
  display: block;
  line-height: 20px;
  height: 40px;
  clear: both;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-select{
  width: 340px;
}
.bgngroupsx{
  float: right;
  height: 30px;
  width: 90px;
  display: block;
  float: right;
}
.sinart  button{
  display: none;
}
.sinart:hover  button{
  display: inline-block;
  color:#6C717A !important;
}
.searchinput{
  max-width: 400px;
  margin: 20px auto;
}
</style>
