<template>
  <div id='MusicDetail'>
    <div class="whitewraps">

      <el-row>

        <span class="right mt15 mr15 btngroupsx">
           <el-dropdown>
            <el-button type="primary">
              下载音乐 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i @click='downloadm("path")'> 原始文件 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i @click='downloadm("mp3")'> 高清MP3 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='downloadm("wav")'> 高清WAV </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
           <el-button type="primary" v-if="detail.status === 'ONLINE'" @click='offnline(detail.uuid)'>
              已上线
           </el-button>
           <el-button type="primary"  v-if="detail.status !== 'ONLINE'" @click='oonline(detail.uuid)'>
              未上线
           </el-button>
           <el-dropdown>
            <el-button type="primary">
              上传文件 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i  @click='updatelyrics'> 上传歌词 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='updatemusicfile'> 上传音乐(MP3/WAV) </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini" @click="dialogFormVisibleeditclk">编辑音乐</el-button>
          <el-button size="mini"  @click="goback">返回</el-button>
        </span>
      </el-row>

      <div class="musicinfo">
          <div id='avatandwrapx'>
          <div id='avantar' :style='{ backgroundImage: `url(${ detail.avatar  ?  detail.avatar : img })` }'></div>
           <i class='play'  v-if='playingx === false'  :style='{ backgroundImage: `url(${ play })` }' @click='playing(detail)'></i>
           <i v-if='playingx === true' class='stop' :style='{ backgroundImage: `url(${ stop })` }' @click='stopplaying(detail)'></i>
          </div>
          <div class='toplwrapx'>
            <div class='cross'>
              <span class="iconname"> {{ detail.name }}</span>
              <span :class=' detail.price_id  ? "coprice" : "khongprice"'>
                {{ detail.price_id  ? '已定价' : '未定价' }}
              </span>
            </div>
            <span class='albumxt' v-if='detail.composer'> {{ detail.composer }}  / {{ detail.lyricist }}</span>
            <span class='descd'> {{ detail.desc }} </span>
            <div class='tagx'>
              <i v-for='z in detail.category_info_list' :key='z.id' > {{ z.name }} </i>
            </div>
          </div>

      </div>

      <div class='musicinfox'>
         <el-row>
          <span class="tit left mgl15">音乐信息</span>
           <span class="right mt15 mr15 btngroupsx">
              <el-button size="mini" @click='editmusic'> 编辑信息 </el-button>
           </span>
         </el-row>
         <div class='spansinglgex'>
            <span> 作词：{{ detail.lyricist | filblk(detail.lyricist)}} </span>

            <span> Open/End Key： {{ detail.opening_key | filblk(detail.opening_key) }} / {{ detail.closing_key | filblk(detail.closing_key) }} </span>
            <span> 发行时间：{{ detail.release_year | filblk(detail.release_year) }} </span>
            <span> 作曲：{{ detail.composer | filblk(detail.composer) }} </span>

            <span v-if='detail.key_mood'> 大/小调： {{ detail.key_mood === "Minor" ? '小调' : '大调' }} </span>
            <span v-if='!detail.key_mood'> 大/小调： - </span>
            <span> 音乐编号：{{ detail.music_no }} </span>
            <span> 编曲：{{ detail.arranged_by  | filblk(detail.arranged_by)}} </span>

            <span> Open/End Tempo:
              <i v-if='detail.tempo_open_info'> {{ detail.tempo_open_info.name | filblk(detail.tempo_open_info.name) }} </i> /
              <i v-if='detail.tempo_end_info'> {{ detail.tempo_end_info.name | filblk(detail.tempo_end_info.name) }} </i>
            </span>
            <span>  文件格式：{{ detail.format | filblk(detail.format)}} </span>
            <span> 发行厂牌：{{ detail.publisher | filblk(detail.publisher) }} </span>
            <span> 速度：{{ detail.tempo_notes_id | filblk(detail.tempo_notes_id) }} </span>
            <span> 节拍：{{ detail.metre  | filblk(detail.metre)}} </span>
            <span> 代理厂商：{{ detail.agent_publisher | filblk(detail.agent_publisher)}} </span>
            <span> 录制地点：{{ detail.place_of_recording | filblk(detail.place_of_recording) }} </span>
            <span> BPM： {{ detail.bpm | filblk(detail.bpm) }} </span>
            <span> 时长：{{ detail.length_desc | filblk(detail.length_desc) }} </span>
            <span> ISRC： {{ detail.isrc | filblk(detail.isrc)}} </span>
            <span> 音乐等级：{{ detail.level | filblk(detail.level) }} </span>
            <span> 主要表演者 {{ detail.factoid | filblk(detail.factoid) }} </span>
            <div class='cross'> 关键词：{{ detail.keyword | filblk(detail.keyword) }} </div>
            <div class='cross'> 风格：
              <i v-for='x in detail.style_category_info_list' :key='x.id'> {{ x.name }} 、</i>
            </div>
            <div  class='cross'> 情绪：
              <i v-for='x in detail.mood_category_info_list' :key='x.id'> {{ x.name }} 、 </i>
            </div>
            <div  class='cross'> 主奏乐器：
              <i v-for='x in detail.main_ins_category_info_list' :key='x.id'> {{ x.name }} 、</i>
            </div>
             <div  class='cross'> 伴奏乐器：
              <i v-for='x in detail.acc_ins_category_info_list' :key='x.id'> {{ x.name }} 、</i>
            </div>
         </div>
      </div>

     </div>
    <div class="whitewraps">
      <el-row>
        <span class="tit left mgl15">多版本作品信息</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="addMultiVersionPop">添加多版本</el-button>
        </span>
      </el-row>
      <div class="mg15">
          <el-table
            :data="tracklist"
            style="width: 100%"
          >
             <el-table-column
              prop="uuid"
              label="ID"
              width="220px"
            >
             <template slot-scope="scope">
              <div class='avt'>
                <div class='avatars'   :style='{ backgroundImage: `url(${ scope.row.avatar })` }'></div>
               </div>
               <i class='uuidx'> {{ scope.row.uuid }} </i>
            </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="音乐名称"
              width="100px"
            >
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="艺术家"
              width="100px"
            >
            <template slot-scope="scope" v-if='scope.row.musician_info'>
              {{ scope.row.musician_info.name }}
            </template>
            </el-table-column>
            <el-table-column
              prop="music_no"
              label="专辑"
            >
             <template slot-scope="scope" v-if='scope.row.album_info'>
              {{ scope.row.album_info.name }}
            </template>
            </el-table-column>
            <el-table-column
              prop="length"
              label="时长"
              width="75"
            >
            </el-table-column>
            <el-table-column
              prop="desc"
              label="标签"
            >
             <template slot-scope="scope">
             <div class='marksw'  v-if='scope.row.category_info_list.length > 0'>
              <i class='mark' v-for='x in scope.row.category_info_list' :key='x.id'>
                {{ x.name }}
              </i>
             </div>
             <div v-if='scope.row.category_info_list.length === 0'>
              -
             </div>
            </template>
            </el-table-column>
             <el-table-column
              prop="desc"
              label="状态"
              width="165px"
            >
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
              width="145"
            >
             <template slot-scope="scope">
               <el-button
                type="text"
                @click="musicdetailck(scope.row.uuid)">查看</el-button>
               <el-button
                type="text"
                @click="downloadm(scope.row.uuid)">下载</el-button>
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
    </div>

    <div class="whitewraps" style='display: none;'>

      <el-row>
        <span class="tit left mgl15">相似作品信息</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="addRelateVersionPop">添加相似作品</el-button>
        </span>
      </el-row>
      <div class="mg15">
          <el-table
            :data="relatelist"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="ID"
              width="220px"
            >
             <template slot-scope="scope">
              <div class='avt'>
                <div class='avatars'   :style='{ backgroundImage: `url(${ scope.row.avatar })` }'></div>
               </div>
               <i class='uuidx'> {{ scope.row.uuid }} </i>
            </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="音乐名称"
              width="100px"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              width="100px"
              label="艺术家"
            >
            <template slot-scope="scope" v-if='scope.row.musician_info'>
              {{ scope.row.musician_info.name }}
            </template>
            </el-table-column>
            <el-table-column
              prop="music_no"
              label="专辑"
            >
             <template slot-scope="scope"  v-if='scope.row.album_info'>
              {{ scope.row.album_info.name }}
            </template>
            </el-table-column>
            <el-table-column
              prop="length"
              label="时长"
              width="75"
            >
            </el-table-column>
            <el-table-column
              prop="desc"
              label="标签"
            >
             <template slot-scope="scope">
             <div class='marksw'  v-if='scope.row.category_info_list.length > 0'>
              <i class='mark' v-for='x in scope.row.category_info_list' :key='x.id'>
                {{ x.name }}
              </i>
             </div>
             <div v-if='scope.row.category_info_list.length === 0'>
              -
             </div>
             </template>
            </el-table-column>
            <el-table-column
              prop="desc"
              label="状态"
              width="165px"
            >
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
              width="145"
            >
            <template slot-scope="scope">
               <el-button
                type="text"
                @click="musicdetailck(scope.row.uuid)">查看</el-button>
              <el-button
                type="text"
                @click="downloadm(scope.row.uuid)">下载</el-button>
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
      top='15px'
      width="500px"
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisibleedit'>
        <el-form :model='formdesc'>
              <el-form-item label='音乐标题' :label-width='formLabelWidth'>
                <el-input v-model='formdesc.name' autocomplete='off'></el-input>
              </el-form-item>
              <el-form-item label='音乐作者' :label-width='formLabelWidth'>
                <el-select
                  @change='slemusic'
                  :filter-method='musicsearchblur'
                  v-model="searmv"
                  filterable
                  placeholder="请选择">
                  <el-option
                    v-for="item in musicianlist"
                    :key="item.uuid"
                    :label="item.name"
                    :value="item.uuid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='音乐专辑' :label-width='formLabelWidth'>
                  <el-select
                  @change='selectmusican'
                  :filter-method='albumsearc'
                  v-model="searalb"
                  filterable
                  placeholder="请选择">
                  <el-option
                    v-for="item in albumlist"
                    :key="item.uuid"
                    :label="item.name"
                    :value="item.uuid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='音乐描述' :label-width='formLabelWidth'>
                <el-input  v-model='formdesc.desc' autocomplete='off'></el-input>
              </el-form-item>
          </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogFormVisibleedit = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='editmusicconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div id='uloadMusicFilex'>
      <el-dialog title='上传音乐文件'
      :close-on-click-modal='false'
      :visible.sync='updateMusicfilevisible'>
        <el-form :model='formmfile'>

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

        </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='updateMusicfilevisible = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='updatemfilescfm'>确 定</el-button>
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
      <el-dialog
        title='编辑音乐'
        top='15px'
        width='800px'
        :close-on-click-modal='false'
        :visible.sync='dialogFormVisiblecomposer'>
        <el-form :model='formedit'>
        <div class='diawrapx' v-show='curentsteps === 1'>
          <el-form-item label='音乐编号' :label-width='formLabelWidth'>
            <el-input v-model='formedit.music_no' autocomplete='off'></el-input>
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
                    v-for="item in speed"
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
                    v-for="item in speed"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label='时长' :label-width='formLabelWidth'>
            <el-input v-model='formedit.length_desc' autocomplete='off' disabled></el-input>
          </el-form-item>

          <el-form-item label='BPM' :label-width='formLabelWidth'>
            <el-input v-model='formedit.bpm' autocomplete='off' disabled></el-input>
          </el-form-item>
          <el-form-item label='ISRC' :label-width='formLabelWidth'>
            <el-input v-model='formedit.isrc' autocomplete='off'></el-input>
          </el-form-item>

        </div>
        <div class='diawrapx'  v-show='curentsteps === 2'>
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

              <el-select v-model="detail.tempo_notes_id" placeholder="请选择">
                <el-option
                  v-for="item in speed"
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
            <el-form-item label='关键词' :label-width='formLabelWidth'>
              <el-input v-model='formedit.keyword' autocomplete='off'></el-input>
            </el-form-item>
            <el-form-item label='描述' :label-width='formLabelWidth'>
              <el-input type="textarea" :rows="2" v-model='formedit.desc' autocomplete='off'></el-input>
            </el-form-item>

        </div>
        <div class='diawrapx'  v-show='curentsteps === 3'>
          <el-form-item label='作词' :label-width='formLabelWidth'>
            <el-input v-model='formedit.lyricist' autocomplete='off'></el-input>
          </el-form-item>
           <el-form-item label='作曲' :label-width='formLabelWidth'>
            <el-input v-model='formedit.composer' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='编曲' :label-width='formLabelWidth'>
            <el-input v-model='formedit.arranged_by' autocomplete='off'></el-input>
          </el-form-item>

           <el-form-item label='发行时间' :label-width='formLabelWidth'>
          <el-date-picker
            v-model="formedit.release_year"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择发行时间">
          </el-date-picker>
          </el-form-item>
          <el-form-item label='发行厂牌' :label-width='formLabelWidth'>
            <el-input v-model='formedit.publisher' autocomplete='off'></el-input>
          </el-form-item>
           <el-form-item label='代理厂牌' :label-width='formLabelWidth'>
            <el-input v-model='formedit.agent_publisher' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='主要表演者' :label-width='formLabelWidth'>
            <el-input v-model='formedit.factoid' autocomplete='off'></el-input>
          </el-form-item>

          <el-form-item label='录制地点' :label-width='formLabelWidth'>
            <el-input v-model='formedit.place_of_recording' autocomplete='off'></el-input>
          </el-form-item>
        </div>
        </el-form>

        <div slot='footer' class='dialog-footer'>
            <span class='left'> {{ curentsteps }} / 3 </span>
            <el-button size='mini' @click='beforestepx' v-if='curentsteps === 3 || curentsteps === 2'> 上一步 </el-button>
            <el-button size='mini' @click='nextstepx' v-if='curentsteps < 3'> 下一步 </el-button>

            <el-button size='mini' type='primary' @click='composermusicconfirm'>确 定</el-button>
        </div>

      </el-dialog>
    </div>

    <div id='addMultiVersion'>
      <el-dialog title='添加多版本音乐'
      :destroy-on-close='true'
      top='15px'
      width='500px'
      :close-on-click-modal='false'
      :visible.sync='daddMultiVersionPop'>
        <el-form
        @submit.native.prevent
        :model='formaddversion'>
              <el-input v-model="addversionsearch" placeholder="请输入内容"  @change='searchLis'>
                  <el-button slot="append" icon="el-icon-search" @click='searchLis'></el-button>
              </el-input>
              <el-form-item>
                <el-checkbox-group v-model="musiclistschecked" @change="handlemusiclists">
                  <el-checkbox v-for="i in musiclists" :label="i" :key="i.uuid">
                    <i class='mnames'> {{i.name}} </i>
                    <i class='mcomposers'>  {{i.composer}}</i>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
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
      width='500px'
      :close-on-click-modal='false'
      :visible.sync='daddRelateVersionPop'>
        <el-form :model='formaddrelate'>
            <el-input v-model="addrelatesearch" placeholder="请输入内容"></el-input>
            <el-form-item>
              <el-checkbox-group v-model="musiclistscheckeds" @change="handlemusiclist">
                <el-checkbox v-for="x in musiclistsx" :label="x" :key="x.uuid">
                  <i class='mnames'> {{x.name}} </i>
                  <i class='mcomposers'>  {{x.composer}}</i>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
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
<style scoped>
.el-checkbox__input{
  float: right;
}
</style>
