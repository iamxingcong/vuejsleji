<template>
  <div id='BrandDetail'>
    <div class="crs">
      <div class="brnaLogo"  :style='{ backgroundImage: `url(${ label.logo ? label.logo : img})` }'></div>
      <div class="logotitle">
        {{label.name}}
      </div>
      <div class="logointro">
        {{label.desc}}
      </div>
    </div>
    <div class="crs mt15">

      <div class='mg15'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="`${'专辑列表(' + count})`" name="first">

          <el-table
            :data="tb"
            style="width: 100%"
          >
            <el-table-column
              prop="uuid"
              label="ID"
              width="300px"
            >
            <template slot-scope="scope">
                <div class='avt' @click="checkAlbum(scope.row.uuid)">
                  <img class='avatars' :src='`${ scope.row.cover }`' />
                </div>
                <i class='uuidx'> {{ scope.row.uuid }} </i>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="专辑名称"
            >
            </el-table-column>
              <el-table-column
              prop="musician_info.name"
              label="艺术家"
            >
            </el-table-column>
            <el-table-column
              prop="music_count"
              label="作品数"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="操作"
            >
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

        <div class='paginationcenters'>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            layout="prev, pager, next"
            :total="count">
          </el-pagination>
          </div>
          </el-tab-pane>
          <el-tab-pane :label="`${'音乐列表(' + countx})`" name="second">

          <el-table
            :data="tbx"
            style="width: 100%"
          >
            <el-table-column label="ID" width="300">
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
              prop="musician_info.name"
              label="艺术家"
            >
            </el-table-column>
            <el-table-column
              prop="keyword"
              label="关键词"
            >
            </el-table-column>
            <el-table-column
              prop="length"
              label="时长"
            >
            </el-table-column>
            <el-table-column
              prop="desc"
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
              width="165">
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
              width="160px"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="checkMusic(scope.row.uuid)">查看</el-button>
                <el-button
                  type="text"
                  @click="editMusic(scope.row.uuid)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class='paginationcenters'>
            <el-pagination
              @current-change="handleCurrentChangeg"
              :current-page="currentPage4"
              layout="prev, pager, next"
              :total="countx">
            </el-pagination>
          </div>
          </el-tab-pane>

        </el-tabs>
      </div>

    </div>

    <div id='editalbum'>
      <el-dialog title='编辑专辑：'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisibleedit'>
        <el-form :model='formedit'>
          <el-form-item label='专辑名：' :label-width='formLabelWidth'>
            <el-input v-model='formedit.name' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='专辑号：' :label-width='formLabelWidth'>
            <el-input v-model='formedit.album_no' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='请填写专辑描述：' :label-width='formLabelWidth'>
            <el-input
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入专辑描述'
              v-model='formedit.desc'>
            </el-input>
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
            是否确定删除厂牌: {{uuid}}
        </span>
        <span>厂牌信息删除后不可恢复</span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div id='openaddalbum'>
      <el-dialog title='添加专辑：'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisiblea'>
        <el-form :model='formb'>
          <el-form-item label='专辑名：' :label-width='formLabelWidth'>
            <el-input v-model='formb.name' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='专辑号：' :label-width='formLabelWidth'>
            <el-input v-model='formb.album_no' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='请填写专辑描述：' :label-width='formLabelWidth'>
            <el-input
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入专辑描述'
              v-model='formb.desc'>
            </el-input>
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

        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisiblea = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='addalbums'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='editmusic'>
      <el-dialog title='编辑音乐'
      top='15px'
      width="600px"
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisiblmusic'>
        <el-form :model='formdesc'>

              <el-form-item label='音乐标题：' :label-width='formLabelWidth'>
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
                <el-input  type="textarea" rows='4' v-model='formdesc.desc' autocomplete='off'></el-input>
              </el-form-item>

          </el-form>

        <div slot='footer' class='dialog-footer'>
            <el-button size='mini' @click='dialogFormVisiblmusic = false'>取 消</el-button>
            <el-button size='mini' type='primary' @click='editmusicconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script src="@/assets/js/branddetail.js"></script>
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
}
.crs{
  overflow: auto;
  background-color: #fff;
}
.logotitle, .logointro{
  width: calc(100% - 185px);
  display: block;
  float: right;
  text-align: left;
  color: #434344;
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
.el-tabs__content{
  min-height: 900px;
}
</style>
