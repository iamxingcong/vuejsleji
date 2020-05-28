<template>
  <div id='ProjectList'>
     <div class="white pd15">
      <el-row>
        <span class='left titlex'> 项目名称： {{ name }}</span>
        <span class='left titlex'> 创建时间： {{ created_at }}</span>
        <span class='left titlex'> 音乐数：{{ count }} </span>
        <span class='right'>
          <el-button type='default' size='mini' round @click='editpro'> 编辑项目 </el-button>
          <el-button type='default' size='mini' round @click='gotoMassxt'> 批量操作 </el-button>
        </span>
      </el-row>
      <el-row>
        <span class="desc"> 项目描述： {{ desc }} </span>
      </el-row>
        <el-table
          :data="tableData"
          :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="ID"
            width="240">
             <template slot-scope="scope">
              <div class='avt'>
                <div class='avatars'   :style='{ backgroundImage: `url(${ scope.row.avatar })` }'></div>
                <i class='play'  v-if='playstatus[scope.$index].pl === false'  :style='{ backgroundImage: `url(${ play })` }' @click='playing(scope)'></i>
                <i v-if='playstatus[scope.$index].pl === true' class='stop' :style='{ backgroundImage: `url(${ stop })` }' @click='stopplaying(scope)'></i>
              </div>
              <i class='uuidx'> {{ scope.row.uuid }} </i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="音乐名称"
            width="100">
          </el-table-column>
          <el-table-column
            width='200'
            prop="musician_info.name"
            label="艺术家">
          </el-table-column>
          <el-table-column
            prop="keyword"
            label="关键词">
            <template slot-scope="scope">
              <i class='keywr' v-if='scope.row.keyword'> {{ scope.row.keyword }} </i>
              <i v-else> - </i>
           </template>
          </el-table-column>
          <el-table-column
            prop="length"
            width='120'
            label="时长">
          </el-table-column>
          <el-table-column
            prop="uuid"
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
            prop="uuid"
            width="165"
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
            label="操作"
            width="155">
            <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="checkMusic(scope.row.uuid)">查看</el-button>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    更多
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <i @click='dialogVisibleGradepop(scope.row)'> 设置等级 </i>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i @click='onoffline(1, scope.row)' v-if='scope.row.status === "WAITING" || scope.row.status === "OFFLINE"'> 上线  </i>
                      <i @click='onoffline(2, scope.row)' v-if='scope.row.status === "ONLINE"'> 下线  </i>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i  @click="downloadMusic(scope.row)">下载 </i>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i @click="addMarks(scope.row.uuid)"> 打标签 </i>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </template>
          </el-table-column>

        </el-table>
        <div class="paginationcenters">
          <el-pagination
            @current-change="handleCurrentChangeg"
            :current-page="currentPage3"
            :page-size='15'
            layout="prev, pager, next"
            :total="count">
          </el-pagination>
        </div>
    </div>

    <div id='setMusicGrade'>
       <el-dialog
        :visible.sync='dialogVisibleGrade'
        :close-on-click-modal='false'
        width='500px'>
        <span class='cross'>
          <i class='cross title'> 请设置音乐等级 </i>
          <i  class='cross'> {{ setMuiscName }} </i>
        </span>
          <el-select v-model="level" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisibleGrade = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='dialogVisibleGradecfm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div id='dialogues'>
       <el-dialog
        title='确认提示'
        :visible.sync='dialogVisible'
        :close-on-click-modal='false'
        width='500px'>
        <span class='fw700 cross'>
            是否确定{{ onoftips }} ?
        </span>

        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='onofflinecfm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <el-dialog
      title='确认提示'
      :visible.sync='dlddialogVisible'
      :close-on-click-modal='false'
      width='500px'>
      <span class='fw700 cross'>
          是否确定下载音乐  {{ downloadname }} ?
      </span>

      <span slot='footer' class='dialog-footer'>
        <el-button size='mini' @click='dlddialogVisible = false'>取 消</el-button>
        <el-button size='mini' type='primary' @click='downloadMusiccfm'>确 定</el-button>
      </span>
    </el-dialog>

    <div id='composeredit'>
      <el-dialog
        title='编辑音乐'
        top='15px'
        width='800px'
        :close-on-click-modal='false'
        :visible.sync='dialogFormVisiblecomposer'>
        <el-form :model='formedit'>
           <el-form-item label='音乐标题' :label-width='formLabelWidth'>
              <el-input v-model='formedit.name' autocomplete='off'></el-input>
            </el-form-item>
            <el-form-item label='风格' :label-width='formLabelWidth'>
              <el-select v-model="checkedstyle" multiple placeholder="请选择">
                <el-option
                  v-for="item in style"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='情绪' :label-width='formLabelWidth'>
               <el-select v-model="checkedmood" multiple placeholder="请选择">
                <el-option
                  v-for="item in mood"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label='速度' :label-width='formLabelWidth'>
              <el-select v-model="formedit.tempo_notes_id" placeholder="请选择">
                <el-option
                  v-for="item in xspeed"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label='主奏乐器' :label-width='formLabelWidth'>

               <el-select v-model="checkedinstruments" multiple placeholder="请选择">
                <el-option
                  v-for="item in instrument"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='伴奏乐器' :label-width='formLabelWidth'>
               <el-select v-model="checkedinstrument" multiple placeholder="请选择">
                <el-option
                  v-for="item in instrument"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

             <el-form-item label='文件格式' :label-width='formLabelWidth'>
            <el-input v-model='formedit.format' autocomplete='off'></el-input>
          </el-form-item>

          <el-form-item label='节拍' :label-width='formLabelWidth'>
            <el-select v-model="formedit.metre" placeholder="请选择">
              <el-option
                v-for="item in meterlist"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label='Open Key' :label-width='formLabelWidth'>
                <el-select  v-model="formedit.opening_key" clearable placeholder="请选择">
                  <el-option
                    v-for="item in vtone"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label='End Key' :label-width='formLabelWidth'>
                <el-select  v-model="formedit.closing_key" clearable placeholder="请选择">
                  <el-option
                    v-for="item in vtone"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
               <el-form-item label='Tempo Open' :label-width='formLabelWidth'>
                <el-select  v-model="formedit.tempo_open_id" clearable placeholder="请选择">
                  <el-option
                    v-for="item in xspeed"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label='Tempo End' :label-width='formLabelWidth'>
                <el-select  v-model="formedit.tempo_end_id" clearable placeholder="请选择">
                  <el-option
                    v-for="item in xspeed"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label='BPM' :label-width='formLabelWidth'>
            <el-input v-model='formedit.bpm' autocomplete='off' ></el-input>
          </el-form-item>
          <el-form-item label='关键词' :label-width='formLabelWidth'>
            <el-input v-model='formedit.keyword' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='描述' :label-width='formLabelWidth'>
            <el-input type="textarea" :rows="2" v-model='formedit.desc' autocomplete='off'></el-input>
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisiblecomposer = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='composermusicconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <el-dialog
      title="创建项目"
      :visible.sync="editProdialogVisible"
      :close-on-click-modal='false'
      top='15px'
      width="500px">

      <el-form ref="form" :model="editproform" label-width="80px">

        <el-form-item label="项目名称">
          <el-input v-model="editproform.name" maxlength='30'></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" v-model="editproform.desc" maxlength='100'></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editProdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProdialogVisiblecfm">确 定</el-button>
      </span>
    </el-dialog>

</div>
</template>
<script src='@/assets/js/projectList.js'></script>
<style  scoped>
  .desc{
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
  .el-dropdown{
    margin-left: 10px;
    line-height: 40px;
    cursor: pointer;
    float: left;
  }
  .el-button--text{
    float: left;
  }
  #setMusicGrade .cross{
    text-align: center;
  }
  .el-dialog__body .title{
    font-weight: bold;
    margin-bottom: 10px;
  }
  #setMusicGrade .el-select,
  #setMusicGrade .el-dialog__body{
    width: 360px;
    margin-left: 50px;
  }
  #setMusicGrade .el-select{
    margin-top: 25px;
  }
  .titlex{
    margin-right: 25px;
  }
</style>
