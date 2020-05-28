<template>
  <div id='AlbumDetail'>
     <div class="crs">
      <div class="brnaLogo"  :style='{ backgroundImage: `url(${ alblist.cover ? alblist.cover : img})` }'></div>
      <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini"   @click="addmusicpop" > 上传音乐 </el-button>
          <el-button size="mini"   @click="editAlbum" > 编辑专辑 </el-button>
        </span>

      <div class="logotitle">
        {{ alblist.name }}
      </div>
      <div class="logointro">
       <i v-if='alblist.musician_info'>  {{alblist.musician_info.name }} / </i>
       <i v-if='alblist.created_at' > 发布于  {{ alblist.created_at.substr(0,4) }} </i>
      </div>
      <div class="logointro">
        {{ alblist.desc }}
      </div>

    </div>
    <div class="crs mt15">
      <el-row>
        <span class="tit left">音乐列表</span>
      </el-row>
      <div class="mg15">
        <el-table
          :data="tableDatab"
          style="width: 100%"
        >
          <el-table-column
            prop="uuid"
            label="ID"
            width="230px"
           >
            <template slot-scope="scope">
               <div class='avt'>
                <img class='avatars' :src="scope.row.avatar ? scope.row.avatar : img" />
                <i class='play'  v-if='playstatus[scope.$index].pl === false'  :style='{ backgroundImage: `url(${ play })` }' @click='playing(scope)'></i>
                <i v-if='playstatus[scope.$index].pl === true' class='stop' :style='{ backgroundImage: `url(${ stop })` }' @click='stopplaying(scope)'></i>
              </div>
              <i class='uuidx'> {{ scope.row.uuid }} </i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="音乐名称"
          >
          </el-table-column>
          <el-table-column
            prop="composer"
            label="艺术家"
            width='150'
           >
           <template slot-scope="scope">
             <i v-if='scope.row.composer' class='composerau'> {{ scope.row.composer }} </i>
             <i v-else> - </i>
           </template>
          </el-table-column>
          <el-table-column
            prop="keyword"
            label="关键词"
           >
           <template slot-scope="scope">
              <div class='keywr' v-if='scope.row.keyword'>
                  {{ scope.row.keyword }}
              </div>
              <i v-else> - </i>
           </template>
          </el-table-column>
          <el-table-column
            prop="length"
            label="时长"
            width='60px'
           >
           <template slot-scope="scope">
               {{ scope.row.length  | changeseconds(scope.row.length)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="标签"
           >
            <template slot-scope="scope">
              <div class='tagt'  v-if='scope.row.category_info_list.length > 0'>
                <i class='tagx' v-for='x in scope.row.category_info_list' :key='x.id'>
                  {{ x.name }}
                </i>
              <div v-if='scope.row.category_info_list.length === 0'>
                -
              </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="track_count"
            width='140'
            label="状态">
             <template   slot-scope="scope">
                <i v-if='scope.row.status === "WAITING"'> 待上线 </i>
                <i v-if='scope.row.status === "ONLINE"'> 上线 </i>
                <i v-if='scope.row.status === "OFFLINE"'> 下线 </i>
                <span v-if='scope.row.price_id'>
                  <i class='slash'> / </i>
                  <i v-if='scope.row.price_id.length > 1'> 已定价 </i>
                  <i v-if='scope.row.price_id.length === 1'> 未定价 </i>
                </span>
                <span>
                  <i class='slash'> / </i>
                  {{ scope.row.level }}
                </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="namee"
            label="操作"
            width="150"
          >
           <template slot-scope="scope">
                <el-button
                  type="text"
                 @click="checkMusic(scope.row.uuid)">查看</el-button>
                <el-button
                  type="text"
                  @click="editMusic(scope.row.uuid)">编辑</el-button>
                <el-button
                  type="text"
                  @click="deleteMusic(scope.row.uuid)">删除</el-button>
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

    <div id='addlabel'>
      <el-dialog title='添加音乐'
      :close-on-click-modal='false'
      top='15px'
      width='1000px'
      :visible.sync='dialogFormVisible'>
        <el-form :model='formaddversion'>
            <el-col :span="24">
              <el-input v-model="addversionsearch" placeholder="请输入内容"
               @input='searchm'
               @change='searchm'
               @blur='searchm'>
                  <el-button slot="append" icon="el-icon-search"  @click='searchm'></el-button>
              </el-input>
            </el-col>
            <el-col :span="17" class='left'>
              <el-form-item label="选择音乐">
                <el-checkbox-group v-model="musiclistschecked" @change="handlemusiclists">
                  <el-checkbox v-for="i in musiclists" :label="i" :key="i.uuid">
                     <i class='mnames'> {{i.name}} </i>
                    <i class='mcomposers'>  {{i.composer}}</i>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="6" class='right'>
            <el-form-item label="已选">
              <el-tag
                v-for="tag in tags"
                :key="tag.uuid"
                closable
                @close="handleClose(tag)"
              >
                {{tag.name.substr(0, 8)}}
              </el-tag>
            </el-form-item>
            </el-col>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='addmusics'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='editmusic'>
      <el-dialog title='编辑音乐'
      :close-on-click-modal='false'
      :visible.sync='adialogFormVisibleedit'>
        <el-form :model='formedit'>
          <el-col :span="11">
            <el-form-item label='音乐名称：' :label-width='formLabelWidth'>
              <el-input v-model='formedit.name' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label='音乐编号：' :label-width='formLabelWidth'>
              <el-input v-model='formedit.music_no' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label='编曲作者：' :label-width='formLabelWidth'>
              <el-input v-model='formedit.arranged_by' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label='曲作者：' :label-width='formLabelWidth'>
              <el-input v-model='formedit.composer' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label='词作者：' :label-width='formLabelWidth'>
              <el-input v-model='formedit.lyricist' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label='上传音乐文件：' :label-width='formLabelWidth'>

              <el-upload
                class="avatar-uploader"
                :action="urls"
                :data='audiodatas'
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
                v-model='formedit.desc'>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button @click='dialogFormVisibleedit = false'>取 消</el-button>
          <el-button type='primary' @click='editmusicconfirm'>确 定</el-button>
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
            是否删除音乐: {{uuid}}
        </span>
        <span>与该专辑的关联？</span>
        <span slot='footer' class='dialog-footer'>
          <el-button @click='dialogVisible = false'>取 消</el-button>
          <el-button type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div id='addlabel'>
      <el-dialog title='添加音乐'
      :close-on-click-modal='false'
      top='15px'
      width='500px'
      :visible.sync='dialogFormVisibleaddmusic'>
        <el-form :model='form'>
            <el-form-item label='音乐标题' :label-width='formLabelWidth'>
              <el-input v-model='form.name' autocomplete='off'></el-input>
            </el-form-item>

            <el-form-item label='音乐作者' :label-width='formLabelWidth'>
              <el-input  v-model='albumcomposer' disabled></el-input>
            </el-form-item>

            <el-form-item label='音乐专辑' :label-width='formLabelWidth'>
              <el-input v-model='alblist.name' disabled></el-input>
            </el-form-item>

            <el-form-item label='音乐描述' :label-width='formLabelWidth'>
              <el-input
                type='textarea'
                :autosize='{ minRows: 3, maxRows: 5}'
                placeholder='请输入音乐描述：'
                v-model='form.desc'>
              </el-input>
            </el-form-item>

            <el-form-item label='音乐文件' :label-width='formLabelWidth'>

              <el-upload
                class="avatar-uploader"
                :action="urls"
                :data='audiodatas'
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error='handErrox'
                :before-upload="beforeAvatarUpload">
                <i v-if="imageUrl"  class="avatar">{{imageUrl}}</i>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </el-form-item>

        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisibleaddmusic = false'>取 消</el-button>
          <el-button :disabled='!ready' size='mini' type='primary' @click='addmusics'>确 定</el-button>
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
            <el-input v-model='aformedit.name' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='专辑作者' :label-width='formLabelWidth'>
             <el-select
              filterable
              clearable
              remote
              :remote-method="remoteMethod"
              v-model="aformedit.musician_id"
              placeholder="请选择">
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
            <el-select v-model="aformedit.label_id" placeholder="请选择">
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
              :action="aurls"
              :data='picdatas'
              :show-file-list="false"
              :on-success="ahandleAvatarSuccess"
              :before-upload="abeforeAvatarUpload">
              <img v-if="aimageUrl" :src="aimageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label='专辑描述' :label-width='formLabelWidth'>
            <el-input
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入专辑描述'
              v-model='aformedit.desc'>
            </el-input>
          </el-form-item>

        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisibleedit = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='editalbumConfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script src="@/assets/js/albumdetail.js"></script>
<style scoped>
.brnaLogo{
    width: 120px;
    height: 120px;
    background-position: center center;
    background-size: 100% auto;
    border-radius: 4px;
    margin-left: 30px;
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid #e2e2e2;
    float: left;
    background-repeat: no-repeat;
}
.crs{
  overflow: auto;
  background-color: #fff;
}
.logotitle, .logointro{
  width: calc(100% - 485px);
  display: block;
  float: left;
  text-align: left;
  color: #34363A;
  margin-left: 30px;
}
.logotitle{
  line-height: 110px;
  height: 70px;
  font-weight: 700;
  font-size: 18px;
}
.logointro{
  line-height: 30px;
  font-size: 14px;
}
#BrandDetail .el-table th{
  background-color: #fff !important;
}
.el-table__header-wrapper{
    border-bottom: 1px solid #EBEEF5 !important;
}
.cell .avt img{
  width: 40px;
  height: 40px;
  display: block;
  float: left;
  margin-right: 20px;
  cursor: pointer;
}
.el-select{
  width: 100%;
}
</style>
