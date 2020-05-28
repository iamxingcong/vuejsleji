<template>
  <div id='MusicListMusicDetail'>
     <div class="white crs">
      <div class="brnaLogo"  :style='{ backgroundImage: `url(${ mldetail.cover ? mldetail.cover : img})` }'></div>
      <div class="logotitle"> {{ mldetail.name }}</div>
      <span class="right  mt15  mr15 btngroupsx">
        <el-button size="mini" type='primary' @click='addmus'> 上传音乐 </el-button>
        <el-button size="mini" type='primary' @click='editmus'> 编辑曲单 </el-button>
      </span>
      <div class="logointro"> {{ mldetail.desc }} </div>
      <div class='tagx'>
        <i v-for='z in mldetail.category_info_list' :key='z.id' > {{ z.name }} </i>
      </div>
    </div>
    <div class="white">
      <el-row>
        <span class="tit left">音乐列表</span>
      </el-row>
      <div class="pd15">
        <el-table
          :data="playmlist"
          style="width: 100%">
          <el-table-column
            prop="uuid"
            width="300px"
            label="ID">
            <template slot-scope="scope">
              <div class='avt'>
                <div class='avatars'   :style='{ backgroundImage: `url(${ scope.row.avatar })` }'></div>
               </div>
               <i class='uuidx'> {{ scope.row.uuid }} </i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="音乐名称">
          </el-table-column>
          <el-table-column
            prop="composer"
            label="艺术家">
          </el-table-column>
          <el-table-column
            prop="album_info.name"
            label="专辑">
          </el-table-column>
          <el-table-column
            prop="length"
            label="时长">
          </el-table-column>
          <el-table-column
            prop="length"
            label="标签">
             <template slot-scope="scope">
             <div class='tagt'  v-if='scope.row.category_info_list.length > 0'>
              <i class='tagx' v-for='x in scope.row.category_info_list' :key='x.id'>
                {{ x.name }}、
              </i>
             </div>
             <div v-if='scope.row.category_info_list.length === 0'>
              -
             </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
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
            prop="uuid"
            width="90"
            label="操作">
            <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="deleteMusic(scope.row)">删除</el-button>
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

    <div id='addRelateVersion'>
      <el-dialog title='添加音乐'
      :close-on-click-modal='false'
      :visible.sync='daddRelateVersionPop'>
        <el-form :model='formaddrelate'>
            <el-col :span="24">
              <el-input v-model="addrelatesearch"
               @input='searchm'
               @change='searchm'
               @blur='searchm'
              placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search"  @click='searchm'></el-button>
              </el-input>
            </el-col>
            <el-col :span="17" class='left'>
              <el-form-item label="选择音乐">
                <el-checkbox-group v-model="xmusiclistscheckeds" @change="handlemusiclistss">
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
                v-for="tag in tagss"
                :key="tag.uuid"
                closable
                @close="handleCloses(tag)"
              >
                {{tag.name.substr(0, 8)}}
              </el-tag>
            </el-form-item>
            </el-col>
        </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='daddRelateVersionPop = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='daddRelateVersionPopcfm'>确 定</el-button>
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
            是否确定删除音乐: {{ mname }}
        </span>
        <span class='cross'>音乐删除后不可恢复</span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div id='editmusicl'>
      <el-dialog title='编辑曲单'
      width="500px"
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisibleedit'>
        <el-form :model='formedit'>
            <el-form-item label='曲单名称：' :label-width='formLabelWidth'>
              <el-input v-model='formedit.name' autocomplete='off'></el-input>
            </el-form-item>
            <el-form-item label='展示位置：' :label-width='formLabelWidth'>
              <el-select v-model="formedit.is_recommend" placeholder="请选择">
                <el-option
                  label="推荐页"
                  :value="true">
                </el-option>
                <el-option
                  label="其他"
                  :value="false">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label='曲单状态：' :label-width='formLabelWidth'>
              <el-switch
                style="display: block"
                v-model="formedit.is_active"
                active-color="#029D75"
                inactive-color="#e2e2e2">
              </el-switch>
            </el-form-item>

            <el-form-item label='曲单封面：' :label-width='formLabelWidth'>
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
            <el-form-item label='标签' :label-width='formLabelWidth'>
               <el-select v-model="checkedcatories" multiple placeholder="请选择">
                <el-option
                  v-for="item in catetorieslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label='曲单描述：' :label-width='formLabelWidth'>
              <el-input
                type='textarea'
                :autosize='{ minRows: 3, maxRows: 4}'
                placeholder='请输入曲单描述：'
                v-model='formedit.desc'></el-input>
            </el-form-item>

        </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogFormVisibleedit = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='editmusicconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script src="@/assets/js/musiclistmusicdetail">

</script>
<style  scoped>
  .desc{
    padding: 5px 15px;
    display: block;
    float: left;
    text-align: left;
    color: #434343;
  }
  .white .el-row{
    margin-bottom: 15px;
  }
  .white{
    padding-bottom: 15px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100% !important;
}

#addRelateVersion .el-checkbox{
  display: block;
  line-height: 45px;
}
#addRelateVersion .el-checkbox-group{
  display: block;
  clear: both;
}
#editmusicl .el-tag,
#editmusicl .el-checkbox-group,
#editmusicl .el-checkbox{
  display: block;
  float: left;
}
#addRelateVersion .el-tag{
  display: block;
  float: left;
  clear: both;
  margin: 6px 5px;
}
.crs{
  overflow: auto;
}
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
.logotitle, .logointro{
  width: calc(100% - 325px);
  display: block;
  float: left;
  text-align: left;
  color: #434344;
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
  height: 50px;
}
.tagx{
  display: block;
  margin-left: 30px;
  float: left;
}
.tagx i{
  height: 20px;
  line-height: 20px;
  display: block;
  float: left;
  padding: 0px 10px;
  margin-right: 10px;
  border:1px solid rgba(52,54,58,1);
  margin-bottom: 10px;
  font-size: 0.9em;
}
.el-select{
  width: 100%;
}
.el-switch{
  margin-top: 8px;
}
</style>
