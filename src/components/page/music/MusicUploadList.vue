<template>
<div class='container' id='MusicUploadList'>
    <div class="whitewraps">
      <div class='filterwrap left' id='bordl'>
        <span id='pretxok'  @click='prext()'> 本次上传 </span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="cktit left mr15">
              {{ uploadsp }}
            </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i @click='uploads("all", "上传总音乐")'> 上传总音乐 </i>
            </el-dropdown-item>
            <el-dropdown-item>
              <i @click='uploads("SUCCEED", "上传成功")' :class='status === "SUCCEED" ? "active" : "noac"'> 上传成功 </i>
            </el-dropdown-item>
            <el-dropdown-item>
              <i  @click='uploads("FAILED", "上传失败")'  :class='status === "FAILED" ? "active" : "noac"'> 上传失败 </i>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>

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

      </div>
    </div>
    <div class="whitewraps">

      <div class="pdlr15">
        <el-table
          :data="dt"
          style="width: 100%">

          <el-table-column
            prop="name"
            label="音乐名称"
          >
          </el-table-column>
          <el-table-column
            prop="musician_id"
            label="作者"
          >
           <template slot-scope="scope">
             <i v-if='scope.row.musician_id'> {{ scope.row.musican_id }} </i>
             <i v-else> - </i>
          </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="上传时间"
          >
          </el-table-column>
          <el-table-column
            width='390px'
            prop="status"
            label="状态"
          >
          <template slot-scope="scope">
            <div :class='scope.row.status' v-if='scope.row.status ==="UPLOADING"'>
              <span class='bar'>

                <i v-bind:style='{width: `${scope.row.ctl}%`}' class='uplprogress'></i>
              </span>
              <i class='tipx'>{{ scope.row.ctl }}% ({{ agent}}M/s)</i>
            </div>
            <div :class='scope.row.status' v-if='scope.row.status !=="UPLOADING"  && scope.row.status !=="FAILED"'>
              <i class='bar'></i>
              <i class='tipx'></i>
            </div>
            <div :class='scope.row.status' v-if='scope.row.status ==="FAILED"'>
              <span class='bar'>
                <i class='failedbar'></i>
              </span>
              <span class='failedx'>
                <i class='failtip'> 上传失败，</i>
                <i  class='uploadingx' @click='reupload(scope.row)'> 重新上传 </i>
              </span>
            </div>
          </template>
          </el-table-column>
          <el-table-column
            width='90px'
            prop="name"
            label="操作"
          >
          <template slot-scope="scope">
            <el-button type='text' v-if='scope.row.status === "SUCCEED"' @click='check(scope.row.music_id)'> 查看 </el-button>
            <el-button type='text' v-if='scope.row.status !== "SUCCEED"' disabled> 查看 </el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='paginationcenters' v-if='!newly'>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size='15'
              layout="prev, pager, next"
              :total="count">
            </el-pagination>
         </div>
    </div>

     <div id='singlemusicupload'>
        <el-dialog
          :title="failedmusicname"
          :visible.sync="addSinglemusicdialogVisible"
          :close-on-click-modal='false'
          destroy-on-close
          height='387px'
          width='550px'>
          <el-form :model='multiform'>

            <el-form-item label='上传音乐' :label-width='formLabelWidthmsup'>
              <i class='filetipx file' :class='fileactive'>{{ filetipx }}</i>
              <input type="file"   id='multimusicupx' @change='fileuplaodchange'  />
                <div class='tipswr'>

                 <el-popover
                  placement="bottom-start"
                  title=""
                  width="200"
                  trigger="hover"
                  content="请选择音乐">
                  <i  slot="reference"></i>
                </el-popover>
              </div>
            </el-form-item>

          </el-form>
           <span slot="footer" class="dialog-footer">
            <el-button size='mini'  @click="addSinglemusicdialogVisible = false">取 消</el-button>
            <el-button size='mini'  type='primary' @click="musicmassupbegin()" :disabled='excellchangedis'>确 定</el-button>
        </span>
        </el-dialog>
      </div>
</div>
</template>
<script src='@/assets/js/MusicUploadList.js'></script>
<style scoped  src='@/assets/css/musicfilter.css'></style>
<style scoped>
.pdlr15{
  padding: 0px 15px;
}
.filterwrap {
  margin-top: 15px;
  margin-left: 15px;
}
.el-dropdown-menu__item{
  padding: 0px !important;
}
.el-dropdown-menu__item i{
  height: 37px;
  line-height: 37px;
  width: 110px;
  cursor: pointer;
  text-align: center;
  display: block;
}
.el-dropdown-menu__item .active{
  color: #15B544;
}
.SUCCEED .bar{
  min-width:180px;
  height:10px;
  background:rgba(21,181,68,1);
  border-radius:5px;
  margin-top: 10px;
}
.el-table_1_column_5  {
  min-width: 300px;
}

.SUCCEED .tipx{
  width: 26px;
  height: 26px;
  display: block;
  background-image: url(../../../assets/icons/okroi.png);
  margin-left: 20px;
}
.WAITING .bar{
  width:180px;
  height:10px;
  background:rgba(226,226,236,1);
  border-radius:5px;
  margin-top: 5px;
}
.WAITING .tipx{
  position: relative;
}
.WAITING .tipx:before{
  content: '0%(0B/s)';
  display: block;
}
.UPLOADING .bar{
  width:180px;
  height:10px;
  background:rgba(226,226,236,1);
  border-radius:5px;
  margin-top: 5px;
}
.FAILED .bar{
  width:180px;
  height:10px;
  background:#E2E2EC;
  border-radius:5px;
  margin-top: 5px;
  position: relative;
}
.failedbar{
  width:160px;
  height:10px;
  background:rgba(236,48,86,1);
  border-radius:5px;
  float: left;
  z-index: 999;
}
.uplprogress{
  width:160px;
  height:10px;
  background:rgba(134,94,233,1);
  border-radius:5px;
}
.tipx{
  margin-left: 20px;
}
#pretxok{
  color: #7B44DD;
  padding: 0px 5px;
  font-size: 14px;
  text-align: left;
  display: block;
  float: left;
  cursor: pointer;
  margin-right: 30px;
}
.el-dropdown{
  margin-right: 30px;
}
.el-dropdown-menu__item i{
  text-align: left;
}
.failtip{
  margin-left: 20px;
  color: #EC3056;
}
.uploadingx{
  color: #1782F3;
  cursor: pointer;
}

 .tipswr{
    display: block;
    position: absolute;
    right: 10px;
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
    width: 335px;
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
  #bordl{
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #DADBE0;
    display: block;
    width: calc(100% - 30px);
    text-align: left;
  }
</style>
