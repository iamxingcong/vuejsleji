<template>

<div id='PriceManage'>

  <div class="whitewraps">
    <div class="pb15">
      <el-row>
        <span class="tit left">定价管理</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" type="primary" @click="addPrice">添加定价方式</el-button>
        </span>
      </el-row>
    </div>
    <div class="mg15"  :gutter='15'>

    <div  class='tablediv' v-for='(price_item, item_index) in newx2' :key='item_index'>
      <div class='ttraps'>
        <span class='stitles'>{{ price_item.name }}</span>
        <span class='sdesc'>{{ price_item.desc }}</span>
      </div>
      <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 90%;">
        <thead class="has-gutter">
          <tr>
            <th> 授权类型 </th>
            <th> 授权时间 </th>
            <th> 授权地域 </th>
            <th> 授权价格 </th>
            <th> 描述 </th>
          </tr>
        </thead>
        <tbody>
          <tr class="el-table__row" v-for='(area_item, area_item_index) in price_item.results' :key='area_item_index'>
            <td class='rowspanx' v-if='area_item_index % area_item.row_span == 0' :rowspan="area_item.row_span">{{ area_item.area_name }}</td>
            <td>{{ area_item.time_name }}</td>
            <td>{{ area_item.place_name }}</td>
            <td>{{ area_item.final_price }}</td>
            <td  class='rowspany' v-if='area_item_index % area_item.row_span == 0' :rowspan="area_item.row_span">{{ area_item.area_desc }}</td>
          </tr>
        </tbody>
      </table>
      <el-button size='mini' type="primary" @click='check(price_item.uuid)'> 查看详情 </el-button>
      <el-button  size='mini' type="primary" @click='dedit(price_item.uuid)'>编辑</el-button>
      <el-button   size='mini'   @click='delp(price_item.uuid, price_item.name)'>删除</el-button>
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

  <div id='priceMan'>
    <addPrice :showx.sync = "showx"> </addPrice>
    <editPrice :showu.sync = "showu"  :editid="editi"> </editPrice>
  </div>
</div>
</template>
<script src='@/assets/js/pricemanage.js'></script>
<style scoped>
.bigwraps .title{
  display: block;
  clear: both;
  font-weight: 700;
}
.bigwraps  span{
  float: left;
  display: block;
  margin-right: 50px;
}
.bigwraps{
  display: block;
  clear: both;
  border-bottom: 1px solid #e2e2e2;
}
.tablediv{
  margin: 20px;
  display: block;
  clear: both;
}
.tablediv .el-table__row td{
  border-bottom: 1px solid #e2e2e2;
  line-height: 35px;
  height: 35px;
  border-right: 1px solid #e2e2e2;
}
.tablediv .has-gutter th{
  line-height: 45px;
  height: 45px;
  border-bottom: 1px solid #e2e2e2;
  color: #000;
  font-weight: 700;
}
.rowspanx{
  border-right: 1px solid #e2e2e2;
}
.tablediv table{
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
}
.tablediv .stitles,
.tablediv .sdesc{
  display: block;
  clear: both;
  text-align: left;
  margin-left: 20px;
  color: #434343;
  line-height: 30px;
}
.tablediv .ttraps{
  display: block;
  clear: both;
  background-color: #E4E4E4;
  width: 90%;
}
.tablediv .has-gutter th{
  border-right: 1px solid #e2e2e2;
}
.tablediv .has-gutter th:nth-child(5){
  border-right: none;
}
.tablediv button{
  margin: 20px auto;
}
</style>
