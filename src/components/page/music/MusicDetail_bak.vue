<template>
  <div id='MusicDetail'>
    <div class="whitewraps">

      <el-row>
        <span class="tit left">音乐信息</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click='updatelyrics'>上传歌词</el-button>
          <el-button size="mini" @click="dialogFormVisibleeditclk">编辑音乐信息</el-button>
           <el-button size="mini"  @click="goback">返回</el-button>
        </span>
      </el-row>

      <div class="musicinfo mg15">
        <div class="left sq250">
            <div id='avantar' :style='{ backgroundImage: `url(${ detail.avatar  ?  detail.avatar : img })` }'></div>
            <span class="iconname"> {{ detail.name }}</span>
        </div>
        <div class="right wdp252">
            <div class="crs">
              <span> 专辑ID </span>
              <span> {{ detail.album_id }}</span>
              <span> Open/End Key </span>
              <span> {{ detail.opening_key }} || {{ detail.closing_key }}</span>
            </div>
            <div class="crs">
              <span> 音乐编号 </span>
              <span> {{ detail.music_no }}</span>
              <span> Key Mood </span>
              <span> {{ detail.key_mood === 'Minor' ? '小调' : '大调' }}</span>
            </div>
            <div class="crs">
              <span> 文件格式 </span>
              <span> {{ detail.format }}</span>
              <span> Tempo Open </span>
              <span> {{ detail.tempo_open_id | fis(detail.tempo_open_id) }} </span>
            </div>
            <div class="crs">
              <span> 节拍 </span>
              <span> {{ detail.metre }}</span>
              <span> Tempo End </span>
              <span> {{ detail.tempo_end_id  | fis(detail.tempo_end_id) }} </span>
            </div>
            <div class="crs l50">
              <span> 时长 </span>
              <span> {{ detail.length + "'" }}</span>
              <span> 速度 </span>
              <span> {{detail.tempo_notes_id | fis(detail.tempo_notes_id) }} </span>
            </div>
        </div>
      </div>

      <el-row>
        <span class="tit left">创作人信息</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="dialogFormVisiblecomposer = true">编辑创作人信息</el-button>
        </span>
      </el-row>
      <div class="mg15">
        <div class="cross headers flex8">
          <span> 原出版商 </span>
          <span> 代理出版商 </span>
          <span> 发行时间 </span>
          <span> 原曲作者 </span>

          <span> 编曲作者 </span>
          <span> 原词作者 </span>
          <span> 主要表演者 </span>
          <span> 录制地点</span>
        </div>
        <div class="cross contents flex8">
          <span> {{ detail.publisher }} </span>
          <span> {{ detail.agent_publisher }}</span>
          <span> {{ detail.release_year}} </span>
          <span> {{ detail.composer }} </span>

          <span> {{ detail.arranged_by }} </span>
          <span>  {{ detail.lyricist }} </span>
          <span> {{ detail.factoid }} </span>
          <span>  {{ detail.place_of_recording }}</span>
        </div>
      </div>

      <el-row>
        <span class="tit left">描述</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini"  @click="dialogFormVisibledescss">编辑描述</el-button>
        </span>
      </el-row>
      <div class="mg15">
        <div class="cross headers flex8">
          <span> 风格 </span>
          <span> 情绪 </span>
          <span> 主奏乐器 </span>
          <span> 伴奏乐器 </span>

          <span> 关键词 </span>
          <span> 描述 </span>

        </div>
        <div class="cross contents flex8">
          <span> {{ detail.style_category_info_list | fstyle(detail.style_category_info_list) }} </span>
          <span> {{ detail.mood_category_info_list | fstyle(detail.mood_category_info_list) }}</span>
          <span> {{ detail.main_ins_category_info_list | fstyle(detail.main_ins_category_info_list) }} </span>
          <span> {{ detail.acc_ins_category_info_list | fstyle(detail.acc_ins_category_info_list) }} </span>

          <span> {{ detail.keyword }} </span>
          <span>  {{ detail.desc | fil(detail.desc) }} </span>

        </div>
      </div>

      <el-row style="display:none;">
        <span class="tit left">授权信息</span>
      </el-row>
      <div class="mg15" style="display:none">
          <el-table
            :data="tablett"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="factoid"
              label="授权编号"
            >
            </el-table-column>
            <el-table-column
              prop="release_year"
              label="发行时间"
            >
            </el-table-column>
            <el-table-column
              prop="nameb"
              label="授权地域"
            >
            </el-table-column>
            <el-table-column
              prop="namec"
              label="授权时长"
            >
            </el-table-column>
            <el-table-column
              prop="named"
              label="使用方式"
            >
            </el-table-column>
            <el-table-column
              prop="namee"
              label="被授权方"
            >
            </el-table-column>
            <el-table-column
              prop="namef"
              label="操作"
            >
            </el-table-column>
          </el-table>
      </div>

      <el-row>
        <span class="tit left">多版本作品信息</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="addMultiVersionPop">添加多版本</el-button>
        </span>
      </el-row>
      <div class="mg15">
          <el-table
            :data="tracklist"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="作品名称"
            >
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="创建时间"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="作品ID"
            >
            </el-table-column>
            <el-table-column
              prop="music_no"
              label="作品号"
            >
            </el-table-column>
            <el-table-column
              prop="length"
              label="时长"
              width="75"
            >
            </el-table-column>
            <el-table-column
              prop="desc"
              label="描述"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="操作"
              width="105"
            >
             <template slot-scope="scope">
               <el-button
                type="text"
                @click="musicdetailck(scope.row.uuid)">查看</el-button>

               <el-button
                type="text"
                @click="musicdelrelate(scope.row)"
               >
                删除
               </el-button>
            </template>
            </el-table-column>
          </el-table>
      </div>

      <el-row>
        <span class="tit left">相似作品信息</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="addRelateVersionPop">添加相似作品</el-button>
        </span>
      </el-row>
      <div class="mg15">
          <el-table
            :data="relatelist"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="作品名称"
            >
            </el-table-column>
            <el-table-column
              prop="composer"
              label="作者名称"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="作品ID"
            >
            </el-table-column>
            <el-table-column
              prop="music_no"
              label="作品号"
            >
            </el-table-column>
            <el-table-column
              prop="length"
              label="时长"
              width="75"
            >
            </el-table-column>
            <el-table-column
              prop="desc"
              label="描述"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="操作"
              width="105"
            >
            <template slot-scope="scope">
               <el-button
                type="text"
                @click="musicdetailck(scope.row.uuid)">查看</el-button>

               <el-button
                type="text"
                @click="musicdellike(scope.row)"
               >
                删除
               </el-button>
            </template>
            </el-table-column>
          </el-table>
      </div>

    </div>

    <div id='editmusic'>
      <el-dialog title='编辑音乐'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisibleedit'>
        <el-form :model='formedit'>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='音乐名称：' :label-width='formLabelWidth'>
              <el-input v-model='formedit.name' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
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
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='文件格式：' :label-width='formLabelWidth'>
              <el-input v-model="formedit.format" >mp3</el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='上传歌词：' :label-width='formLabelWidth'>

              <el-upload
                class="avatar-uploader"
                :action="urlss"
                :data='updatass'
                :show-file-list="false"
                :on-success="handleAvatarSuccesss"
                :before-upload="beforeAvatarUploads">
                <i v-if="imageUrls"  class="avatar">{{imageUrls}}</i>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='速度：' :label-width='formLabelWidth'>
            <el-select v-model="formedit.tempo_notes_id" clearable  placeholder="速度">
                <el-option
                  v-for="s in speed"
                  :key="s.id"
                  :label="s.name"
                  :value="s.id">
                  {{s.name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='Open Key:' :label-width='formLabelWidth'>
              <el-select  v-model='formedit.opening_key'>
                <el-option
                  v-for="s in vtone"
                  :key="s"
                  :label="s"
                  :value="s">
                  {{s}}
                </el-option>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='End Key:' :label-width='formLabelWidth'>
              <el-select   v-model='formedit.closing_key'>

                <el-option
                  v-for="s in vtone"
                  :key="s"
                  :label="s"
                  :value="s">
                  {{s}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='Tempo Open:' :label-width='formLabelWidth'>
              <el-select v-model="formedit.tempo_open_id" clearable  placeholder="速度">
                <el-option
                  v-for="s in speed"
                  :key="s.id"
                  :label="s.name"
                  :value="s.id">
                  {{s.name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='Tempo End:' :label-width='formLabelWidth'>
               <el-select v-model="formedit.tempo_end_id" clearable  placeholder="速度">
                <el-option
                  v-for="s in speed"
                  :key="s.id"
                  :label="s.name"
                  :value="s.id">
                  {{s.name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

           <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='key_mood:' :label-width='formLabelWidth'>
               <el-select v-model="formedit.key_mood" clearable  placeholder="Key Mood">
                <el-option value='Major' label='大调'>大调</el-option>
                <el-option value='Minor' label='小调'>小调</el-option>

              </el-select>
            </el-form-item>
          </el-col>

        </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogFormVisibleedit = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='editmusicconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='uloadLyrics'>
      <el-dialog title='上传歌词'
      :close-on-click-modal='false'
      :visible.sync='updatelyricsvisible'>
        <el-form :model='formeditr'>

         <el-upload
            class="avatar-uploader"
            :action="urlss"
            :data='updatass'
            :show-file-list="false"
            :on-success="handleAvatarSuccesssl"
            :before-upload="beforeAvatarUploadsl">
            <i v-if="imageUrls"  class="avatar">{{imageUrls}}</i>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='updatelyricsvisible = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='updatelyricscfm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='composeredit'>
      <el-dialog title='编辑创作人信息'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisiblecomposer'>
        <el-form :model='formcomposer'>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='原出版商：' :label-width='formLabelWidth'>
              <el-input v-model='formcomposer.publisher' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='代理出版商：' :label-width='formLabelWidth'>
              <el-input v-model='formcomposer.agent_publisher' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='发行时间：' :label-width='formLabelWidth'>
            <el-date-picker
              v-model="formcomposer.release_year"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发行时间">
            </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='原曲作者：' :label-width='formLabelWidth'>
              <el-input v-model='formcomposer.composer' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='原词作者：' :label-width='formLabelWidth'>
              <el-input v-model='formcomposer.lyricist' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='编曲作者：' :label-width='formLabelWidth'>
              <el-input v-model='formcomposer.arranged_by' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='主要表演者：' :label-width='formLabelWidth'>
              <el-input v-model='formcomposer.factoid' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="22" :md="22" :lg="11" :xl="11">
            <el-form-item label='录制地点：' :label-width='formLabelWidth'>
              <el-input v-model='formcomposer.place_of_recording' autocomplete='off'></el-input>
            </el-form-item>
          </el-col>

        </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogFormVisiblecomposer = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='composermusicconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='descedit'>
      <el-dialog title='编辑描述'
      :close-on-click-modal='false'
      top='15px'
      width='1000px'
      :visible.sync='dialogFormVisibledesc'>
        <el-form :model='formdesc'>
            <el-form-item label='风格：' :label-width='formLabelWidth'>
              <el-checkbox-group
                v-model="checkedstyle"
                @change="cgstyles"
              >
                <el-checkbox v-for="x in style" :label="x.id" :key="x.id">{{x.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label='情绪：' :label-width='formLabelWidth'>
              <el-checkbox-group
                v-model="checkedmood"
                @change="cgmoods"
              >
                <el-checkbox v-for="x in mood" :label="x.id" :key="x.id">{{x.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label='主奏乐器：' :label-width='formLabelWidth'>
             <el-checkbox-group
                v-model="checkedinstrument"
                @change="cginstruments"
              >
                <el-checkbox v-for="x in instrument" :label="x.id" :key="x.id">{{x.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label='伴奏乐器：' :label-width='formLabelWidth'>
             <el-checkbox-group
                v-model="checkedinstruments"
                @change="cginstrumentss"
              >
                <el-checkbox v-for="x in instrument" :label="x.id" :key="x.id">{{x.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label='关键词：' :label-width='formLabelWidth'>
              <el-input v-model='formdesc.keyword' autocomplete='off'></el-input>
            </el-form-item>
            <el-form-item label='描述：' :label-width='formLabelWidth'>
              <el-input type="textarea" :rows="2" v-model='formdesc.desc' autocomplete='off'></el-input>
            </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogFormVisibledesc = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='descmusicconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='addMultiVersion'>
      <el-dialog title='添加多版本音乐'
      :destroy-on-close='true'
      top='15px'
      width='1000px'
      :close-on-click-modal='false'
      :visible.sync='daddMultiVersionPop'>
        <el-form :model='formaddversion'>
            <el-col :span="24">
              <el-input v-model="addversionsearch" placeholder="请输入内容"></el-input>
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
                :v-model="tags"
                v-for="tagx in tags"
                :key="tagx.uuid"
                closable
                @close="handleClose(tagx)"
              >
                {{tagx.name.substr(0, 8)}}
              </el-tag>
            </el-form-item>
            </el-col>
        </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='daddMultiVersionPop = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='daddMultiVersionPopcfm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='addRelateVersion'>
      <el-dialog title='添加相似版本音乐'
      :destroy-on-close='true'
      top='15px'
      width='1000px'
      :close-on-click-modal='false'
      :visible.sync='daddRelateVersionPop'>
        <el-form :model='formaddrelate'>
            <el-col :span="24">
              <el-input v-model="addrelatesearch" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="17" class='left'>
              <el-form-item label="选择音乐">
                <el-checkbox-group v-model="musiclistscheckeds" @change="handlemusiclist">
                  <el-checkbox v-for="x in musiclistsx" :label="x" :key="x.uuid">
                    <i class='mnames'> {{x.name}} </i>
                    <i class='mcomposers'>  {{x.composer}}</i>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="6" class='right'>
            <el-form-item label="已选">
              <el-tag
               :v-model="tagss"
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
        :visible.sync='delrltdialogVisible'
        :close-on-click-modal='false'
        width='30%'>
        <span class='fw700'>
          <i class='el-icon-warning'></i>
            是否确定删除’ {{delname}}‘的版本
        </span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='delrltdialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div id='dialogues'>
       <el-dialog
        title='确认提示'
        :visible.sync='delalikedialogVisible'
        :close-on-click-modal='false'
        width='30%'>
        <span class='fw700'>
          <i class='el-icon-warning'></i>
            是否确定删除相似作品 {{delname}}
        </span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='delalikedialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirmrlt'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>
<script src="@/assets/js/musicdetail.js"></script>
<style scoped src='@/assets/css/musicdetail.css'></style>
