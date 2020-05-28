<template>

<div id='PriceAuthorizeType'>

  <div class="whitewraps">
    <div class="pb15">
      <el-row>
        <span class="tit left">
          {{detail.name}}
        </span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini"  @click="goback">返回</el-button>
        </span>
      </el-row>
      <el-row>
        <span class='left pdl15'>
        {{detail.desc}}
        </span>
      </el-row>
    </div>
     <div class="pb15">
      <el-row>
        <span class="tit left">
         音乐列表
        </span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" type='primary' @click="addMusic">添加音乐</el-button>
        </span>
      </el-row>
     </div>
    <div class="mg15"  :gutter='15'>
          <el-table
            ref="multipleTable"
            :data="dlist"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="音乐ID"
              prop='uuid'>
            </el-table-column>
              <el-table-column
              label="音乐名称"
              prop='name'>
            </el-table-column>
            <el-table-column
              label="专辑名称"
              prop='album_name'>
            </el-table-column>
             <el-table-column
              label="描述"
              prop='desc'>
            </el-table-column>
              <el-table-column
              label="操作"
              prop='uuid'>
              <template slot-scope="scope">
                <el-button type="text" @click='check(scope.row.uuid)'> 查看</el-button>
                <el-button type='text' @click='del(scope.row.uuid, scope.row.name)' > 删除</el-button>
              </template>
            </el-table-column>
          </el-table>

    </div>
     <div class="paginations">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[10, 20]"
          :page-size="10"
          layout="prev, pager, next, sizes"
          :total="count">
        </el-pagination>
      </div>
  </div>

  <el-dialog
  title="提示"
  :visible.sync="dialogVisibleDel"
  width="30%"
  :modal="true"
  :close-on-click-modal="false"
  :destroy-on-close="true">
  <span>确定删除 {{name}}？ </span>
  <span slot="footer" class="dialog-footer">
    <el-button size='mini' @click="dialogVisibleDel = false">取 消</el-button>
    <el-button size='mini' type="primary" @click="delcfm">确 定</el-button>
  </span>
</el-dialog>

<div id='addMultiVersion'>
    <el-dialog title='添加音乐'
    top='15px'
    width='1000px'
    :destroy-on-close='true'
    :close-on-click-modal='false'
    :visible.sync='daddMultiVersionPop'>
      <el-form :model='formaddversion'>
          <el-col :span="24">
            <el-input v-model="addversionsearch"
              @input='searchm'
              @change='searchm'
              @blur='searchm'
              placeholder="请输入内容">
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

</div>
</template>
<script src='@/assets/js/pricedetail.js'></script>
