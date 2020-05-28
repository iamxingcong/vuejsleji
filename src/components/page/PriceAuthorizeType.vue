<template>

<div id='PriceAuthorizeType'>

  <div class="whitewraps">
    <div class="pb15">
      <el-row>
        <span class="tit left">授权类型</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" type="primary" @click="addPrice">添加定价类型</el-button>
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
              label="授权类型"
              prop='name'>
            </el-table-column>
              <el-table-column
              label="授权描述"
              prop='desc'>
            </el-table-column>
            <el-table-column
              label="价格系数"
              prop='rate'>
              <template slot-scope="scope">
                {{scope.row.rate}}倍
              </template>
            </el-table-column>
              <el-table-column
              label="操作"
              prop='uuid'>
              <template slot-scope="scope">
                <el-button type="text" @click='revise(scope.row)'> 编辑 </el-button>
                <el-button type='text' @click='del(scope.row.uuid, scope.row.name)' > 删除</el-button>
              </template>
            </el-table-column>
          </el-table>

    </div>
     <div class="paginationcenters">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          layout="prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
  </div>

    <el-dialog
    title="添加定价类型"
    :visible.sync="AdddialogVisible"
    width="450px"
    :modal="true"
    :close-on-click-modal="false"
    :destroy-on-close="true">

    <el-form :model="form"  :inline="true" >
      <el-row>
        <el-form-item label="定价名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder='请输入名称' autocomplete="off"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="价格倍数：" :label-width="formLabelWidth">
          <el-input @input='inputvali' placeholder='请输入1， 10之间的数' v-model="form.rate" type='number'  max='10' min='1' autocomplete="off"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="定价描述：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.desc">
          </el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="AdddialogVisible = false">取 消</el-button>
      <el-button size='mini' type="primary" @click="addconfirmed">确 定 </el-button>
    </span>
  </el-dialog>

      <el-dialog
    title="修改定价类型"
    :visible.sync="RevisedialogVisible"
    width="450px"
    :modal="true"
    :close-on-click-modal="false"
    :destroy-on-close="true">

    <el-form :model="eform"  :inline="true" >
      <el-row>
        <el-form-item label="定价名称：" :label-width="formLabelWidth">
          <el-input v-model="eform.name" placeholder='请输入名称' autocomplete="off"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="价格倍数：" :label-width="formLabelWidth">
          <el-input @input='inputvali' placeholder='请输入1， 10之间的数' v-model="eform.rate" type='number'  max='10' min='1' autocomplete="off"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="定价描述：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="eform.desc">
          </el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="RevisedialogVisible = false">取 消</el-button>
      <el-button size='mini' type="primary" @click="reviseconfirmed">确 定 </el-button>
    </span>
  </el-dialog>

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

</div>
</template>
<script src='@/assets/js/priceauthorizetype.js'></script>
