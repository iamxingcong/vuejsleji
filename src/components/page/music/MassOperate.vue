<template>
  <div id='Massoperate'>
      <div class="whitewraps">
      <div v-show ='!filtershow'  class='searchinput'>
          <el-input placeholder="请输入搜索内容" v-model='pkeywords' @keyup.13.native="searching" class="input-with-select">
            <el-button slot="prepend" icon="el-icon-search" v-on:click="searching">搜索</el-button>
            <template slot="append">
              <el-button @click='clearsearch' class='el-icon-close'></el-button>
            </template>
          </el-input>
      </div>
      <el-row   v-show ='filtershow'>
        <div class="left mt15 mgl15  btngroupsx">
          <el-button size="mini"   type='primary' @click='addtoalbumx'> 加入专辑 </el-button>
          <el-button size="mini"   type='primary' @click='addtoplaylistx'> 加入曲单 </el-button>
          <el-button size="mini"   type='primary'  @click='addtoMusicanx'> 绑定艺术家 </el-button>

          <el-dropdown>
            <el-button type="primary">
              音乐上/下线 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i @click='onlineAll("PRICE")'> 上线已定价音乐 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='onlineAll("ALL")'> 上线全部音乐 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='massdelete(2)'> 上线已选音乐 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='massdelete(4)'> 下线已选音乐 </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini"   type='primary' @click='setprice(5)'> 添加定价 </el-button>
          <el-button size="mini"   type='primary' @click='addMarks(6)'> 添加标签 </el-button>
          <el-button size="mini"   type='primary' @click='massExport(7)'> 批量导出 </el-button>
          <el-button size="mini"   type='primary' @click='excellExport(8)'> 表格导出 </el-button>
          <div class='cose' v-if='music_uuids.length > 0'>
            <i class='left'> 已选 {{ music_uuids.length }} 首</i>

            <el-button size='mini' type='primary' class='right' @click='cclearchoose'> 清除选中项</el-button>
          </div>
        </div>
          <div class='right btngroupsx mr15 mt15'>
            <el-button type="primary" @click='searchShow' size='mini' icon="el-icon-search">搜索</el-button>
            <el-button size="mini" type="primary" @click="goback">退出批量操作</el-button>
          </div>
        </el-row>
        <div class='filwrapx'>
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

         <div class='cssinglgex'>

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
                <i @click='search(2, "")'> 全部 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i @click='search(0, "已定价")' :class='price_id__isnull === 0 ? "active" : "noac"'> 已定价 </i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i  @click='search(1, "未定价")' :class='price_id__isnull === 1 ? "active" : "noac"'> 未定价 </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>

        <el-row class="filteralreay">
          <span v-if='pkeywords' class='el-tag el-tag--medium el-tag--light right'>
            {{ pkeywords }}
             <i class="el-tag__close el-icon-close"  @click='xclearsearch()'></i>
          </span>
          <span v-if='labelname' class='el-tag el-tag--medium el-tag--light right'>
            {{ labelname }}
             <i class="el-tag__close el-icon-close"  @click='labelnameclearsearch()'></i>
          </span>
          <span v-if='speeds.name'  class='el-tag el-tag--medium el-tag--light right'>
            {{ speeds.name }}
            <i class="el-tag__close el-icon-close"  @click='xclearspeeds()'></i>
          </span>
          <span v-if='onofftipsx.length > 0' class='el-tag el-tag--medium el-tag--light right'>
            {{onofftipsx}}
            <i class="el-tag__close el-icon-close"  @click='onoff("all", "")'></i>
          </span>
           <span v-if='pricelb.length > 0' class='el-tag el-tag--medium el-tag--light right'>
              {{ pricelb }}
            <i class="el-tag__close el-icon-close" @click='search(2, "")'></i>
            </span>
          <template  v-if="clearAll" >

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
      <div class="pd15">

        <el-table
          :data="dtl"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @select='selectckbxs'
          ref="multipleTable"
          style="width: 100%">
          <el-table-column
            type="selection"
            prop="uuid"
            width="35">
          </el-table-column>
          <el-table-column
            prop="avatar"
            label=""
            width="50"
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
            prop="uuid"
            label="ID"
            width='150'
           >
            <template slot-scope="scope">
              <i   class='max2line' @click="checkMusic(scope.row.uuid)"> {{ scope.row.uuid }} </i>
            </template>
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
           <template slot-scope="scope">
             <i v-if='scope.row.musician_info'> {{ scope.row.musician_info.name }} </i>
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
            width="95"
           >
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
             </div>
             <div v-if='scope.row.category_info_list.length === 0'>
              -
             </div>
            </template>

          </el-table-column>
          <el-table-column
            prop="track_count"
            label="状态"
            width="155">
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
                <i> {{ scope.row.level }} </i>
              </span>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class='paginationcenters'>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-size='15'
          layout="prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>

    <div id='editmusic'>
      <el-dialog title='加入专辑'
      top='15px'
      width="600px"
      :close-on-click-modal='false'
      :visible.sync='dialogAlbum'>
        <el-form :model='formealbum'>

          <el-form-item label='音乐专辑' :label-width='formLabelWidth'>
            <el-select
              @change='selectmusican'
              :filter-method='albumsearc'
              v-model="searchalb"
              filterable
              placeholder="请选择专辑">
              <el-option
                v-for="item in albumlist"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
          </el-form-item>

          </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogAlbum = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='addmtoalbum'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='addmusicanx'>
      <el-dialog title='绑定艺术家'
      top='15px'
      width="600px"
      :close-on-click-modal='false'
      :visible.sync='dialogMusican'>
        <el-form :model='formealbum'>

          <el-form-item label='艺术家' :label-width='formLabelWidth'>
              <el-select
              @change='selectmsx'
              :filter-method='diamusicx'
              v-model="searchmsz"
              filterable
              placeholder="请选择艺术家">
              <el-option
                v-for="item in musicianlist"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
          </el-form-item>

          </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogMusican = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='addtoMusiccfm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='addplaylistx'>
      <el-dialog title='加入曲单'
      top='15px'
      width="600px"
      :close-on-click-modal='false'
      :visible.sync='dialogaddPlaylist'>
        <el-form :model='formealbum'>

          <el-form-item label='曲单' :label-width='formLabelWidth'>
              <el-select
              @change='selectpls'
              :filter-method='diamplaylist'
              v-model="searchpls"
              filterable
              placeholder="请选择曲单">
              <el-option
                v-for="item in playlist"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
          </el-form-item>

          </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogaddPlaylist = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='addplaylistcfm'>确 定</el-button>
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
            确定 {{ remind }} 已选{{music_uuids.length}}首音乐
        </span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='delrltdialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

     <div id='addPrice'>
      <el-dialog title='添加定价'
      top='15px'
      width="600px"
      :close-on-click-modal='false'
      :visible.sync='dialogAddPrice'>
        <el-form :model='formeprice'>

          <el-form-item label='定价方案' :label-width='formLabelWidth'>
            <el-select
              @change='selectprice'
              :filter-method='pricesearc'
              v-model="searchprice"
              filterable
              placeholder="请选择定价">
              <el-option
                v-for="item in pricelist"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
          </el-form-item>

          </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogAddPrice = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='dialogAddPricecfm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='composeredit'>
      <el-dialog
        title="批量添加标签"
        top='15px'
        width='700px'
        :close-on-click-modal='false'
        :visible.sync='dialogFormVisiblecomposer'>
        <el-form :model='formedit'>
            <span id='specialNumaddmks'> （已选{{ music_uuids.length }}首音乐） </span>
            <el-form-item label='风格' :label-width='formLabelWidthedit'>
              <el-select v-model="mcheckedstyle" multiple placeholder="请选择">
                <el-option
                  v-for="item in style"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='情绪' :label-width='formLabelWidthedit'>
               <el-select v-model="mcheckedmood" multiple placeholder="请选择">
                <el-option
                  v-for="item in mood"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label='速度' :label-width='formLabelWidthedit'>
              <el-select v-model="formedit.tempo_notes_id" placeholder="请选择">
                <el-option
                  v-for="item in xspeed"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label='主奏乐器' :label-width='formLabelWidthedit'>

               <el-select v-model="mcheckedinstruments" multiple placeholder="请选择">
                <el-option
                  v-for="item in instrument"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='伴奏乐器' :label-width='formLabelWidthedit'>
               <el-select v-model="mcheckedinstrument" multiple placeholder="请选择">
                <el-option
                  v-for="item in instrument"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

             <el-form-item label='文件格式' :label-width='formLabelWidthedit'>
            <el-input v-model='formedit.format' autocomplete='off'></el-input>
          </el-form-item>

          <el-form-item label='节拍' :label-width='formLabelWidthedit'>
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
              <el-form-item label='Open Key' :label-width='formLabelWidthedit'>
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
               <el-form-item label='End Key' :label-width='formLabelWidthedit'>
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
               <el-form-item label='Tempo Open' :label-width='formLabelWidthedit'>
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
               <el-form-item label='Tempo End' :label-width='formLabelWidthedit'>
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
          <el-form-item label='BPM' :label-width='formLabelWidthedit'>
            <el-input v-model='formedit.bpm' autocomplete='off' ></el-input>
          </el-form-item>
          <el-form-item label='关键词' :label-width='formLabelWidthedit'>
            <el-input v-model='formedit.keyword' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='描述' :label-width='formLabelWidthedit'>
            <el-input type="textarea" :rows="2" v-model='formedit.desc' autocomplete='off'></el-input>
          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisiblecomposer = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='composermusicconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div id='exportdtn'>

      <el-dialog
        title="批量导出音乐"
        top='15px'
        width='550px'
        :close-on-click-modal='false'
        :visible.sync='dialogFormVisibleexportdt'>
          <div id='progressbarx' v-show='exportf'>
            <el-progress   :stroke-width="10" :percentage="progress" color='#865EE9'></el-progress>
            <i id='percentx'> {{ parseInt(progress) }} % </i>
          </div>
          <div id='errorlis' v-if='errorlist.length >= 1'>
            <i id='idtitle'> 下载失败音乐UUID </i>
            {{ errorlist }}
          </div>

          <el-form :model='formexport'>

            <el-form-item label='导出内容' label-width='90px'>
              <el-select
                popper-class='expselmn'
                v-model="formexportcsed"
                multiple
                placeholder="请选择">
                <el-option
                  v-for="item in exportdt"
                  :key="item.name"
                  :label="item.value"
                  :value="item.name">
                </el-option>
              </el-select>

              <div id='tipswr'>

                 <el-popover
                  placement="bottom-start"
                  title=""
                  width="200"
                  trigger="hover"
                  content="可控制导出的Excel表格标题内容，默认导出音乐所有属性">
                  <i  slot="reference"></i>
                </el-popover>
              </div>
            </el-form-item>
          </el-form>
          <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogFormVisibleexportdt = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='dialogFormVisibleexportdtcfm' :disabled='exportf'>确 定</el-button>
          </div>
      </el-dialog>
    </div>
    <div id='tipsdialog'>
      <el-dialog
        title=""
        :show-close='false'
        :visible.sync="tipsxdialogVisible"
        width="360px"
        height="220px">
        <span id='idfinished' :style='{ backgroundImage: `url(${ finished })` }'> </span>
        <span id='dccg' :style='{ backgroundImage: `url(${ dccg })` }'> </span>
      </el-dialog>
    </div>

    <div id='massuploadmusic'>
      <el-dialog
        title="批量表格导出音乐"
        :visible.sync="exportMassmusicdialogVisible"
        :close-on-click-modal='false'
        destroy-on-close
        height='387px'
        width='550px'>
        <el-form :model='multiform'>

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
             <el-form-item label='导出内容' :label-width='formLabelWidthmsup'>
              <el-select
                popper-class='expselmn'
                v-model="excformexportcsed"
                multiple
                placeholder="请选择">
                <el-option
                  v-for="item in exportdt"
                  :key="item.name"
                  :label="item.value"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <div id='uploadtpxt'>
              文件上传过程中，请勿刷新或关闭页面，否则导出任务会
              被中断且列表会被清空
            </div>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size='mini'  @click="exportMassmusicdialogVisible = false">取 消</el-button>
            <el-button size='mini'  type='primary' @click="excellchange()" :disabled='excellchangedis'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

</div>
</template>
<script src='@/assets/js/massoperate.js'></script>
<style scoped src='@/assets/css/musicfilter.css'></style>
<style scoped>

#exportdtn .el-select{
  width: 350px;
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
.btngroupsx a{
  line-height:40px;
  padding: 0px 15px;
}
#specialNumaddmks{
    position: absolute;
    top: 0px;
    left: 105px;
    padding: 17px 20px 17px !important;
    line-height: 24px;
    color: #838791;
}
.max2line{
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #progressbarx{
    width: 400px;
    margin-left: 90px;
    float: left;
    clear: both;
    margin-bottom: 17px;
  }
  .el-form{
    display: block;
    clear: both;
  }
  #composeredit .el-form{
    padding: 0px 80px;
  }
  #percentx{
    color: #865EE9;
    text-align: center;
    display: block;
    line-height: 30px;
  }
  #tipswr{
    display: block;
    position: absolute;
    right: 5px;
    top: 0px;
    width: 40px;
    height: 40px;
  }
  #tipswr i{
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
  #errorlis{
    display: block;
    clear: both;
    line-height: 20px;
    width: 350px;
    float: right;
    margin-right: 50px;
    margin-bottom: 17px;
  }
  #exportdtn  #idtitle{
    display: block;
    clear: both;
    text-align: left;
    line-height: 35px;
  }
  #idfinished{
    width: 64px;
    height: 64px;
    display: block;
    background-size: 100% 100%;
    margin: 0px auto;
  }

  #tipsdialog  .el-dialog__header{
    display: none !important;
  }
  #dccg{
    height: 19px;
    width: 100%;
    display: block;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 10px;
    margin-bottom: 40px;
    background-size: auto 100%;
  }
  .btngroupsx .el-dropdown{
    margin: 0px 10px;
    float: left;
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
  .el-select{
    width: 100%;
  }
</style>
