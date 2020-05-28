<template>

<div id='PriceManage'>

  <div class="whitewraps">

      <el-row>
        <span class='left mgl15 mt15'>
          <el-select
            @change='chooseprice'
            v-model="value"
            clearable placeholder="请选择">
              <el-option
                v-for="item in newx2"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
          </el-select>
        </span>
        <span class="right mt15 mr15 btngroupsx">

            <el-button size="mini" type="primary" @click="addPrice">添加定价方式</el-button>
            <el-button size='mini'  @click='check(choosed.uuid)'> 查看详情 </el-button>
            <el-button  size='mini'  @click='dedit(choosed.uuid)'>编辑</el-button>
            <el-button   size='mini'   @click='delp(choosed.uuid, choosed.name)'>删除</el-button>

        </span>
      </el-row>

    <div  class='tablediv'>

        <span class="left title"> {{ choosed.name }} </span>

        <span class='sdesc'>{{ choosed.desc }}</span>

      <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
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
          <template class="el-table__row" v-for='(area_item, area_item_index) in choosed.results'>
            <tr v-if='((parseInt(area_item_index / 4)) % 2) === 0 ' class='ok'  :key='area_item_index'>
              <td class='rowspanx' v-if='area_item_index % area_item.row_span == 0' :rowspan="area_item.row_span">{{ area_item.area_name }}</td>
              <td>{{ area_item.time_name }}</td>
              <td>{{ area_item.place_name }}</td>
              <td>{{ area_item.final_price }}</td>
              <td  class='rowspany' v-if='area_item_index % area_item.row_span == 0' :rowspan="area_item.row_span">{{ area_item.area_desc }}</td>
            </tr>
             <tr v-else class='nook' :key='area_item_index'>
              <td class='rowspanx' v-if='area_item_index % area_item.row_span == 0' :rowspan="area_item.row_span">{{ area_item.area_name }}</td>
              <td>{{ area_item.time_name }}</td>
              <td>{{ area_item.place_name }}</td>
              <td>{{ area_item.final_price }}</td>
              <td  class='rowspany' v-if='area_item_index % area_item.row_span == 0' :rowspan="area_item.row_span">{{ area_item.area_desc }}</td>
            </tr>
          </template>
        </tbody>
      </table>

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

}
.tablediv{
  margin: 20px;
  display: block;
  clear: both;
}
.tablediv .el-table__row td{
  line-height: 35px;
  height: 35px;
}
.tablediv .has-gutter th{
  line-height: 45px;
  height: 45px;
  color: #000;
  font-weight: 700;
}

.tablediv .stitles,
.tablediv .sdesc{
  display: block;
  clear: both;
  text-align: left;
  color: #434343;
  line-height: 30px;
}
.tablediv .ttraps{
  display: block;
  clear: both;
  width: 100%;
}
.title{
  font-size: 1.5em;
  font-weight: bold;
}
#PriceManage tbody .ok td{
  background-color: #EFEFF5;
}
#PriceManage tbody   td{
  line-height: 40px;
  height: 40px;
}
#PriceManage{
  background-color: #fff;
  min-height: 800px;
}
</style>
