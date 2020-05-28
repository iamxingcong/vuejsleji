<template>
  <div id='MusicFilter'>
    <div class="whitewraps">
      <el-row  v-show ='!filtershow'>
        <div class='searchinput'>
            <el-input placeholder="请输入搜索内容" v-model='pkeywords' @keyup.13.native="searching" class="input-with-select">
              <el-button slot="prepend" icon="el-icon-search" v-on:click="searching">搜索</el-button>
              <template slot="append">
                <el-button @click='clearsearch' class='el-icon-close'></el-button>
              </template>
          </el-input>
        </div>
        <i class='borderbtmx'></i>
      </el-row>
      <div class="filterwrap"   v-show ='filtershow'>

        <span class="right mr15 btngroupsx">
          <el-button type="primary" @click='searchShow' size='mini' icon="el-icon-search">搜索</el-button>
          <el-button size="mini" @click="massoperate" type='primary'> 批量操作 </el-button>
           <!-- <el-dropdown>
            <el-button type="primary">
              音乐上线 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i @click='onlineAll("PRICE")'> 上线已定价音乐 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='onlineAll("ALL")'> 上线全部音乐 </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-dropdown>
            <el-button type="primary">
              添加音乐  <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i @click="addmusicpop" type='primary'> 单首上传音乐 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i @click="addMassmusic" type='primary'> 批量上传音乐 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i @click="gotomusicuploadlist()" type='primary'> 上传记录 </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>

        <div class='cssinglgex'>
          <template>
            <el-dropdown
                placement='top-start'>
              <span class="cktit left mr15"> 厂牌 </span>
              <el-dropdown-menu slot="dropdown">
                <el-radio-group   v-model="labelfiltx"   @change="labelfiltxact">
                  <el-radio
                    :label="null"
                    key="null"
                    :border="false"
                  >
                    无厂牌
                  </el-radio>
                  <el-radio
                    v-for="s in labellists"
                    :label="s"
                    :key="s.uuid"
                    :border="false"
                  >
                    {{s.name}}
                  </el-radio>
                </el-radio-group>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          </div>
        <div class='cssinglgex' v-for="i in searchTotal"  :key="i.id" >
          <template v-if="i.type !== 'SPEED'">
            <el-dropdown
              placement='top-start'>
            <span class="cktit left mr15"> {{ i.name }} </span>
            <el-dropdown-menu
              :class='i.type'
              slot="dropdown">
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
              <el-radio-group v-model="speeds" @click="btnstyleradio">
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
        <div  class='cssinglgex'>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
                上传时间
              </i>
            </span>
            <el-dropdown-menu slot="dropdown" class='specialtm'>
              <el-dropdown-item>

                <el-date-picker
                  v-model="created_at__gte"
                  @change='orderstt'
                  type="datetime"
                  format='yyyy-MM-dd HH:mm:ss'
                  placeholder="选择上传开始时间">
                </el-date-picker>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-date-picker
                  v-model="created_at__lt"
                  @change='ordersttover'
                  type="datetime"
                  format='yyyy-MM-dd HH:mm:ss'
                  placeholder="选择上传结束时间">
                </el-date-picker>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
                音乐状态
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>
                <i @click='onoff("all", "")'> 全部 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i @click='onoff("ONLINE", "上线")' :class='status === "ONLINE" ? "active" : "noac"'> 上线 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='onoff("OFFLINE", "下线")'  :class='status === "OFFLINE" ? "active" : "noac"'> 下线 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='onoff("WAITING", "待上线")'  :class='status === "WAITING" ? "active" : "noac"'> 待上线 </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
                音乐定价
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>
                <i @click='searchx(2, "")'> 全部 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i @click='searchx(0, "已定价")' :class='price_id__isnull === 0 ? "active" : "noac"'> 已定价 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='searchx(1, "未定价")' :class='price_id__isnull === 1 ? "active" : "noac"'> 未定价 </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
         <el-dropdown
          placement='top-start'>
            <span  class="cktit left mr15">
              时长
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i @click='timespanfilter(0)'> 全部 </i></el-dropdown-item>
            <el-dropdown-item><i @click='timespanfilter(1)'  :class='stconsttimespanfilter === 1 ? "active" : "noac"'> 小于3s </i></el-dropdown-item>
            <el-dropdown-item><i @click='timespanfilter(2)'  :class='stconsttimespanfilter === 2 ? "active" : "noac"'>  3s-10s </i> </el-dropdown-item>
            <el-dropdown-item> <i @click='timespanfilter(3)' :class='stconsttimespanfilter === 3 ? "active" : "noac"'> 10s-20s</i> </el-dropdown-item>
            <el-dropdown-item><i @click='timespanfilter(4)'  :class='stconsttimespanfilter === 4 ? "active" : "noac"'>  20s-30s </i></el-dropdown-item>
            <el-dropdown-item><i @click='timespanfilter(5)'  :class='stconsttimespanfilter === 5 ? "active" : "noac"'>  30s-60s </i></el-dropdown-item>
            <el-dropdown-item> <i @click='timespanfilter(6)' :class='stconsttimespanfilter === 6 ? "active" : "noac"'> 1分钟-2分钟 </i></el-dropdown-item>
            <el-dropdown-item> <i @click='timespanfilter(7)' :class='stconsttimespanfilter === 7 ? "active" : "noac"'> 2分钟-3分钟 </i></el-dropdown-item>
            <el-dropdown-item> <i @click='timespanfilter(8)' :class='stconsttimespanfilter === 8 ? "active" : "noac"'> 3分钟以上 </i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        </div>
        <el-row class="filteralreay">
          <span v-if='nameconsttimespanfilter.length > 1'  class='el-tag el-tag--medium el-tag--light right'>
            {{ nameconsttimespanfilter }}
             <i class="el-tag__close el-icon-close"  @click='timespanclear()'></i>
          </span>
          <span v-if='labelname' class='el-tag el-tag--medium el-tag--light right'>
            {{ labelname }}
             <i class="el-tag__close el-icon-close"  @click='labelnameclearsearch()'></i>
          </span>
          <span v-if='speeds.name'  class='el-tag el-tag--medium el-tag--light right'>
            {{ speeds.name }}
            <i class="el-tag__close el-icon-close"  @click='xclearspeeds()'></i>
          </span>
          <span v-if='pkeywords' class='el-tag el-tag--medium el-tag--light right'>
            {{ pkeywords }}
             <i class="el-tag__close el-icon-close"  @click='xclearsearch()'></i>
          </span>
          <span v-if='onofftipsx.length > 0' class='el-tag el-tag--medium el-tag--light right'>
            {{onofftipsx}}
            <i class="el-tag__close el-icon-close"  @click='onoff("all", "")'></i>
          </span>
         <span v-if='pricelb.length > 0' class='el-tag el-tag--medium el-tag--light right'>
            {{ pricelb }}
          <i class="el-tag__close el-icon-close" @click='searchx(2, "")'></i>
          </span>
          <template  v-if="clearAll || pricelb || pkeywords || onofftipsx || labelname || nameconsttimespanfilter">
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
          </template>
        </el-row>

      </div>
    </div>

    <div class="whitewraps">

      <div class="pdlr15">
        <el-table
          :data="tableData"
          :row-class-name="tableRowClassName"
          style="width: 100%">

          <el-table-column
            prop="avatar"
            label=""
            width='50'
          >
            <template slot-scope="scope">
              <div class='avt'>
                <div class='avatars'   :style='{ backgroundImage: `url(${ scope.row.avatar })` }'></div>
                <i class='play'  v-if='playinguuid !== scope.row.uuid'  :style='{ backgroundImage: `url(${ play })` }' @click='playing(scope)'></i>
                <i  v-if='playinguuid === scope.row.uuid'  class='stop' :style='{ backgroundImage: `url(${ stop })` }' @click='stopplaying(scope)'></i>
              </div>
            </template>
          </el-table-column>
           <el-table-column
            prop="name"
            label="ID"
            width='150'
           >
            <template slot-scope="scope">
              <i class='max2line'> {{ scope.row.uuid }} </i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="音乐名称"
           >
            <template slot-scope="scope">
              <span class="gotosome"
                type="text"
                @click="checkMusic(scope.row.uuid)">
                  {{ scope.row.name }}
              </span>
            </template>
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
            width='95px'
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
            width='155'
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
                <el-dropdown>
                <span class="el-dropdown-link">
                  更多
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <i @click='dialogVisibleGradepop(scope.row)'> 设置等级 </i>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i @click='onoffline(1, scope.row)' v-if='scope.row.status === "WAITING" || scope.row.status === "OFFLINE"'> 音乐上线  </i>
                    <i @click='onoffline(2, scope.row)' v-if='scope.row.status === "ONLINE"'> 音乐下线  </i>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i  @click="downloadMusic(scope.row)">下载 </i>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i @click="addMarks(scope.row.uuid)"> 打标签 </i>
                  </el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                 <el-button
                  type="text"
                  @click="checkMusic(scope.row.uuid)">查看</el-button>
                <el-button type="text" @click='addtoProj(scope.row)'> 加入项目 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='paginationcenters'>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size='15'
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
      width='500px'
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
                :on-error='handErrox'
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
          <el-button :disabled='!ready' size='mini' type='primary' @click='addmusics'>确 定</el-button>
        </div>
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

      <el-dialog
        title="加入项目"
        :close-on-click-modal='false'
        :visible.sync="addtoProjdialogVisible"
        top="15px"
        width="500px">

        <el-form ref="form" :model="fmproj" label-width="80px">
          <el-form-item label="用户名称">
            <template>
            <el-select
              v-model="fmproj.userid"
              filterable
              clearable
              @clear='clearxt'
              @change='userSelected'
              remote
              :remote-method="remoteMethod"
              placeholder="请选择用户">
              <el-option
                v-for="item in userlists"
                :key="item.value"
                :label="item.name"
                :value="item.uuid">
                {{ item.name }}
              </el-option>
            </el-select>
            </template>
          </el-form-item>
          <div class='projectidx' v-show='!userchoosed'>
             <template>
                <el-form-item label="项目名称">
                  <el-select
                    v-model="fmproj.projectid"
                    filterable
                    @change='projectSelected'
                    clearable
                    placeholder="请选择加入的项目">
                    <el-option
                      v-for="item in projectlist"
                      :key="item.value"
                      :label="item.name"
                      :value="item.uuid">
                      {{ item.name }}
                    </el-option>
                  </el-select>
                </el-form-item>
            </template>
          </div>
          <div id='existedprojx' v-if='showchoosedUserprojls'>
            <span> 该音乐已经存在下列项目中</span>
            <i v-for='(i, ind) in existedprojlist' :Key='ind' class='projexed'>
              {{ i.name }}
            </i>
          </div>
          <span id='tipsprojs'  :style='{ backgroundImage: `url(${ projicon })` }' v-if='showchoosedprojname'> 该音乐已经存在 <i>{{ choosedprojname }} </i>项目中</span>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addtoProjdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addtoProjdialogVisiblecfm" :disabled='disbtn'>确 定</el-button>
        </span>
      </el-dialog>

    </div>

    <div id='massuploadmusic'>
      <el-dialog
        title="批量上传音乐"
        :visible.sync="addMassmusicdialogVisible"
        :close-on-click-modal='false'
        destroy-on-close
        height='387px'
        width='550px'>
        <el-form :model='multiform'>

            <el-form-item label='上传音乐' :label-width='formLabelWidthmsup'>
              <i class='filetipx file' :class='fileactive'>{{ filetipx }}</i>
              <input type="file" multiple  webkitdirectory directory  id='multimusicupx' @change='musicmassupbegin()' />
                <div class='tipswr'>

                 <el-popover
                  placement="bottom-start"
                  title=""
                  width="200"
                  trigger="hover"
                  content="请选择音乐文件夹">
                  <i  slot="reference"></i>
                </el-popover>
              </div>
            </el-form-item>

            <el-form-item label='上传表格' :label-width='formLabelWidthmsup'>
              <i class='filetipx excell' :class='excellactive'>{{ filetipex }}</i>
              <input  type='file'  ref="inputer"  id="myfileinput"  @change='chooseexcell()' />
              <div class='tipswr'>

                 <el-popover
                  placement="bottom-start"
                  title=""
                  width="200"
                  trigger="hover"
                  content="请按照表格规则，将上传的音乐信息填入表格并同步上传。">
                  <i  slot="reference"></i>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item label='备注' :label-width='formLabelWidthmsup'>
              <el-input
                :autosize='false'
                type="text"

                placeholder="请输入"
                v-model="firstdesc">
              </el-input>

            </el-form-item>
            <div id='uploadtpxt'>
              文件上传过程中，请勿刷新或关闭页面，否则导出任务会
              被中断且列表会被清空
            </div>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size='mini'  @click="addMassmusicdialogVisible = false">取 消</el-button>
            <el-button size='mini'  type='primary' @click="excellchange()" :disabled='excellchangedis'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>
<script src="@/assets/js/musicfilter.js"></script>
<style scoped  src='@/assets/css/musicfilter.css'></style>
<style scoped>
  .el-select .el-input {
    width: 130px;
  }
  .pdlr15{
    padding: 0px 15px;
  }
  #existedprojx span{
    font-weight: bold;
  }
  #existedprojx span,
  #existedprojx i{
    display: block;
    clear: both;
    line-height: 1.8em;
  }
  #existedprojx{
    width: 380px;
    display: block;
    clear: both;
    float: right;
  }
  .projexed{
    color: #EC3056;
  }
  .EFFECT{
    width: 810px;
    display: block;
  }
  .EFFECT .el-checkbox,
  .EFFECT .el-checkbox__input{
    display: block;
    float: left;
  }
  .btngroupsx .el-dropdown{
    margin-left: 10px;
  }
 .tipswr{
    display: block;
    position: absolute;
    right: -40px;
    top: 0px;
    width: 40px;
    height: 40px;
  }
  .tipswr i{
    background-image: url(../../../assets/icons/questionicon.png);
    display: block;
    width: 40px;
    height: 40px;
    z-index: 999;
    cursor: pointer;
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .file{
    background-image: url(../../../assets/icons/file.png);
    background-repeat: no-repeat;
    background-position: calc(100% - 10px);
    background-size: 17px auto;
  }
  .excell{
    background-image: url(../../../assets/icons/excell.png);
    background-repeat: no-repeat;
    background-position: calc(100% - 10px);
    background-size: 15px auto;
  }
  #uploadtpxt{
    width: 332px;
    display: block;
    line-height: 20px;
    float: right;
    margin-right: 35px;
    padding-top: 10px;
    background-image: url(../../../assets/icons/projicon.png);
    padding-left: 20px;
    background-position: left 13px;
    background-repeat: no-repeat;
  }
</style>
