<template>
<div id='orderlist'>
   <div class="whitewraps">
    <div class="mt15 mgl15">
      <el-row>
        <div class="cssinglgex">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
                订单状态
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- WAITING/SUCCEED/CANCELED -->
              <el-dropdown-item><i  @click='statusx("WAITING")'> 待支付 </i> </el-dropdown-item>
              <el-dropdown-item><i  @click='statusx("SUCCEED")'> 支付成功 </i></el-dropdown-item>
              <el-dropdown-item><i  @click='statusx("CANCELED")'> 订单取消 </i></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="cssinglgex">
        <el-dropdown
          placement='top-end'
          trigger="hover">
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
              支付方式
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- ALI_QR/WECHAT_QR/TRANSFER/OFFLINE -->
              <el-dropdown-item><i  @click='paym("ALI_QR")'> 支付宝 </i> </el-dropdown-item>
              <el-dropdown-item><i  @click='paym("WECHAT_QR")'> 微信 </i></el-dropdown-item>
              <el-dropdown-item><i  @click='paym("TRANSFER")'> 转账 </i></el-dropdown-item>
              <el-dropdown-item><i  @click='paym("OFFLINE")'> 线下 </i></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="cssinglgex">

        <el-dropdown>
            <span class="el-dropdown-link">
              <i class="cktit left mr15">
              下单时间
              </i>
            </span>
            <el-dropdown-menu slot="dropdown" class='specialtm'>
              <el-dropdown-item>

                <el-date-picker
                  v-model="created_at__gt"
                  @change='orderstt'
                  type="datetime"
                  format='yyyy-MM-dd HH:mm:ss'
                  placeholder="选择下单开始时间">
                </el-date-picker>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-date-picker
                  v-model="created_at__lte"
                  @change='ordersttover'
                  type="datetime"
                  format='yyyy-MM-dd HH:mm:ss'
                  placeholder="选择下单结束时间">
                </el-date-picker>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <span class="right   mr15 orderlists">
          <el-input placeholder="请输入" v-model="keywordsx" :class='largesmallx' @focus='smlg' @blur='smsmx'>
            <template slot="prepend"> 订单编号 </template>
            <el-button slot="append" type='text'  @click='searchxt'> 查找 </el-button>
          </el-input>
        </span>
      </el-row>
    </div>
    <div class="mg15"  :gutter='15'>
          <el-table
            :data="tblist"
            style="width: 100%">
            <el-table-column
              width="280"
              label="订单编号">
              <template slot-scope="scope">
                <div class='avt'>
                 <img :src='scope.row.music_infos[0].avatar' />
                </div>
                <i class="uuidx"> {{ scope.row.uuid }} </i>
              </template>
            </el-table-column>

             <el-table-column
              label="订单音乐"
              prop='name'>
              <template slot-scope="scope">
                <i v-for='(x, ind) in scope.row.music_infos' :key='x.uuid'>
                  <template  v-if='ind === 0'>
                  {{ x.name }}
                  </template>
                </i>
              </template>
            </el-table-column>
             <el-table-column
              label="下单用户"
              prop='user_name'>
            </el-table-column>
             <el-table-column
              label="下单/支付时间"
              width="190"
              prop='name'>
               <template slot-scope="scope">
                <i> {{ scope.row.created_at }} </i>
                <i v-if='scope.row.paid_time'> {{ scope.row.paid_time }} </i>
               </template>
            </el-table-column>
             <el-table-column
              label="支付方式"
              prop='name'>
              <template slot-scope="scope">
                <i> {{ scope.row.pay_method | fil(scope.row.pay_method )  }} </i>
               </template>
            </el-table-column>
             <el-table-column
              label="订单状态"
              prop='name'>
                <template slot-scope="scope">
                <i> {{ scope.row.status | filstatus(scope.row.status )  }} </i>
               </template>
            </el-table-column>
             <el-table-column
              label="价格"
              prop='name'>
              <template slot-scope="scope">
              <i> ￥ {{scope.row.show_amount }}</i>
              </template>
            </el-table-column>
             <el-table-column
              width='150px'
              label="操作"
              prop='name'>
               <template slot-scope="scope">
                <el-button
                  type="text"
                @click="checks(scope.row.uuid)">查看</el-button>
                <el-button
                  type="text"
                  @click="deletex(scope.row)">删除</el-button>
            </template>
            </el-table-column>

          </el-table>
    </div>

      <div class='paginationcenters'>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          layout="prev, pager, next"
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
</div>
</template>
<script src='@/assets/js/orderlist.js'></script>
<style scoped>
.el-dropdown-menu  li i{
  display: block;
  width: 100px;
  color: #34363A;
  padding: 0px 10px;
}
.specialtm{
  min-width: 240px;
}
.el-dropdown-menu  li{
  width: 120px;
  padding: 0px  10px;
}
.el-dropdown-menu  li:hover i{
  background-color: #EDEDF3;
}
.el-dropdown-menu  li:hover{
  background-color: #ffffff;
}
.el-table th.is-leaf{
  background-color: #ffffff;
}

</style>
