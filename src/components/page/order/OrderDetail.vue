<template>
<div id='OrderDetail'>
 <div class="whitewraps">
    <el-row>
    <span class='left childired titlelft'>
      订单状态
      <i v-if='det.status === "SUCCEED"'>  支付成功 </i>
      <i v-else-if='det.status === "WAITING"'>  待支付 </i>
      <i v-else-if='det.status === "CANCELED"'>  订单取消 </i>
    </span>
    <div class='right mgt40 mgr15 btngroupsx'>
      <el-dropdown  size="mini" >
      <el-button  size="mini">
          修改订单
        <i class="tri3"  :style='{ backgroundImage: `url(${tri})` }'></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>

          <i v-if='det.status === "SUCCEED"'>  支付成功 </i>
          <i v-else-if='det.status === "WAITING"' @click='payed(det.uuid)'>  待支付 </i>
          <i v-else-if='det.status === "CANCELED"'>  订单取消 </i>

        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      <el-button size='mini'  @click='revisemoney(det.uuid)'> 修改费用 </el-button>
    </div>
    </el-row>

    <div class="mg15"  :gutter='15'>
        <el-table
          :data="dtail"
          style="width: 100%">
          <el-table-column
            width='337px'
            prop='music_info.name'
            label="音乐名称">
            <template slot-scope='scope'>
              <img :src='scope.row.music_info.avatar' />
              <i>{{ scope.row.music_info.name }}</i>
            </template>
          </el-table-column>
          <el-table-column
            prop='music_info.composer'
            label="艺术家">
          </el-table-column>
          <el-table-column
            prop='music_info.publisher'
            label="发行商">
          </el-table-column>
          <el-table-column
            prop='data.area.name'
            label="授权类型">
            <template slot-scope="scope">
              <i>{{ scope.row.data.area.name}}</i>
                <i>{{ scope.row.data.area.desc}}</i>
            </template>
          </el-table-column>
          <el-table-column
            prop='music_info.isrc'
            label="ISRC">
          </el-table-column>
          <el-table-column
            prop='amount'
            label="价格">
          </el-table-column>
            <el-table-column
            width='110px'
            label="操作"
            prop='music_id'>
              <template slot-scope="scope">
              <el-button
                type="text"
              @click="checks(scope.row.music_id)">查看</el-button>
          </template>
          </el-table-column>
        </el-table>
    </div>
    <el-row class='bggreyx'>
      <div class='right'>
          订单总价 ￥{{ det.amount }}
      </div>
      <div class='right'>
        实付金额
        <i class='clreds'> ￥ {{ det.coupon_amount }}</i>
      </div>
    </el-row>
    <el-row>
      <span class='cross left mgl15'> 下单时间 {{ det.created_at }}</span>
      <span class='cross left mgl15' v-if='det.paid_time'> 订单时间 {{ det.paid_time}}</span>
      <span class='cross left mgl15'> 订单编号 {{ det.uuid }}</span>
    </el-row>

    <el-dialog
      title="修改费用"
      :visible.sync="dialogVisibleRevise"
      width="500px"
      :modal="true"
      :close-on-click-modal="false"
      :destroy-on-close="true">

        <el-form  label-width="100px">
          <el-form-item label="订单总价">
            <i> ￥ {{ det.amount }} </i>
          </el-form-item>
          <el-form-item label="优惠">
            <i> ￥ {{ det.coupon_amount }} </i>
          </el-form-item>
          <el-form-item label="实付金额">
            <el-input v-model="amountx"></el-input>
          </el-form-item>

        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size='mini' @click="dialogVisibleRevise = false">取 消</el-button>
        <el-button size='mini' type="primary" @click="revcfm">确 定</el-button>
      </span>
   </el-dialog>

 </div>
</div>
</template>
<script src='@/assets/js/orderdetail.js'></script>
<style scoped>
.el-table th.is-leaf{
  background: rgba(228,228,228,1);
}
.bggreyx{
  background-color: #EFEFF5;
  margin: 15px;
  padding-bottom: 15px;
}
.bggreyx  .right{
  width: 161px;
  display: block;
  float:right;
  text-align: left;
  clear: both;
  height: 20px;
  line-height: 20px;
  padding-top: 16px;
}
.clreds{
  font-size: 1.8em;
  color: #EC3056;
}
</style>
