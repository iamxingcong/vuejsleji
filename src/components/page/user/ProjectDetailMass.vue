<template>
  <div class='container' id='ProjectDetailMass'>
    <div class="white pd15">
      <el-row>
        <div class='left mt15 mgl15  btngroupsx'>
          <span class='title'>  音乐列表  ({{ count }} 首 )</span>
          <div class='cose' v-if='music_uuids.length > 0'>
            <i class='choosed'> 已选 {{ music_uuids.length }} 首</i>
            <el-button size='mini' type='primary' @click='cclearchoose'> 清除选中项</el-button>
          </div>
        </div>
        <div class='right  btngroupsx'>
          <el-button size='mini' type='primary' round  @click='removeMusic'> 移除 </el-button>
          <el-button size='mini' type='primary'  style='display: none !important;' round  @click='downloadMusic'> 下载 </el-button>
          <el-button size="mini"   type='primary' @click='massExport(7)'> 批量导出 </el-button>
        </div>
      </el-row>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        @select='selectckbxs'
        ref="multipleTable"
        style="width: 100%">
        <el-table-column
          type="selection"
          prop="uuid"
          width="55">
        </el-table-column>
          <el-table-column
            prop="date"
            label="ID"
            width="300">
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
            width="100">
          </el-table-column>
          <el-table-column
            prop="musician_info.name"
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
            prop="uuid"
            width="160"
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

  </div>
</template>
<script src='@/assets/js/ProjectDetailMass.js'></script>
<style scoped>
.btngroupsx .title, .btngroupsx .cose{
  float: left;
}
.btngroupsx .title{
  line-height: 40px;
  font-size: 16px;
  margin-right: 15px;
  color: #34363A;
}
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
    right: 35px;
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
</style>
