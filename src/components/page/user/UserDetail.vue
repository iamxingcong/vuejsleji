<template>
  <div id='UserDetail'>
    <div class="whitewraps">
      <el-row>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="edituser"> 编辑资料 </el-button>
          <!-- <el-button size="mini" @click="loglog(udata)"> 登录日志 </el-button> -->
        </span>
      </el-row>

      <div class="musicinfo">
        <div id="avatandwrapx">
          <div id='avantar' :style='{ backgroundImage: `url(${ udata.avatar  ?  udata.avatar : img })` }'></div>
        </div>
        <div class="toplwrapx">
            <div class="crs">
             <span class='iconname'>
               {{udata.name ? udata.name : ' 缺省 '}}
             </span>
             <span class='roundx mg22'>
              <el-button type="primary" size='mini'>
                {{udata.vip_type == 'NORMAL' ? '普通会员' : udata.vip_type}}
              </el-button>
             </span>
            </div>
            <div class='crs'>
              <span> 用户ID：{{ udata.uuid }} </span>
              <span> 用户来源： {{udata.add_type === 'SYSTEM_ADD' ? '后台添加' : '用户注册'}}  </span>
            </div>
            <div class='crs'>
              <span> 手机号码： {{udata.phone}} </span>
            </div>

            <div class="crs">
              <span> 公司： {{udata.company_name}} </span>
            </div>

        </div>
      </div>
      <div class="mg15">
        <el-row>
          <span class="tit left">用户信息</span>
        </el-row>
        <div class='udetail4'>
          <span> 城市：{{ udata.city_name }} </span>
          <span> 职业：{{ udata.career }} </span>

          <span> 常用标签：{{ udata.use_categories }} </span>
          <span> 注册时间：{{ udata.created_at }} </span>
          <span> 描述备注：{{ udata.desc }} </span>
        </div>
      </div>
    </div>
    <div class="whitewraps">
      <el-row>
        <span class="tit left">统计信息</span>
      </el-row>
      <div class="mg15">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="cumulative_pay"
              label="消费金额"
            >
            </el-table-column>
            <el-table-column
              prop="download_origin_count"
              label="剩余下载次数"
            >
            </el-table-column>
            <el-table-column
              prop="last_login"
              label="上次登录"
            >
            </el-table-column>
            <el-table-column
              prop="login_count"
              label="登录次数"
            >
            </el-table-column>
            <el-table-column
              prop="order_count"
              label="订单数量"
            >
            </el-table-column>
            <el-table-column
              prop="download_count"
              label="累计下载"
            >
            </el-table-column>
            <el-table-column
              prop="play_count"
              label="累计播放"
            >
            </el-table-column>
            <el-table-column
              prop="project_count"
              label="累计创建项目"
            >
            </el-table-column>

          </el-table>
      </div>
    </div>

    <div class="whitewraps">
      <el-row>
        <span class="tit left">项目列表</span>
        <span class='tit right mgr15'>
          <el-button type='default' size='mini' @click='createProject' round> 创建项目 </el-button>
        </span>
      </el-row>
      <div class="mg15">
          <el-table
            :data="tableDatab"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="项目名称"
            >
            </el-table-column>
             <el-table-column
              prop="created_at"
              label="创建时间"
            >
            </el-table-column>
            <el-table-column
              prop="desc"
              label="项目描述"
              width="400"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="操作"
              width="80px"
            >
             <template slot-scope="scope">
              <el-button type="text" @click='projectDetail(scope.row)'>查看项目</el-button>
            </template>
            </el-table-column>
          </el-table>
      </div>
      <el-pagination
          @current-change="handleCurrentChangeProject"
          :current-page="currentPage3"
          layout="prev, pager, next"
          :total="pcount">
        </el-pagination>
    </div>
    <div class="whitewraps">
      <el-row>
        <span class="tit left">订单记录</span>
      </el-row>
      <div class="mg15">
          <el-table
            :data="orderdt"
            style="width: 100%"
          >
            <el-table-column
              prop="uuid"
              label="订单编号"
            >
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="提交时间"
            >
            </el-table-column>
            <el-table-column
              prop="type"
              label="订单类型"
            >
            <template slot-scope="scope">
               {{ scope.row.type === "PROPRIETOR" ? "普通订单" : "渠道方订单" }}
            </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              label="订单金额"
            >
            <template slot-scope="scope">
              ￥{{ scope.row.amount }}
            </template>
            </el-table-column>
            <el-table-column
              prop="pay_method"
              label="支付方式"
            >
             <template slot-scope="scope">
               {{ scope.row.pay_method | filterspaymethods(scope.row.pay_method) }}
            </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态"
            >
             <template slot-scope="scope">
               {{ scope.row.status | filorstats(scope.row.status)  }}
            </template>
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="操作"
            >
            <template slot-scope="scope">
              <el-button type='text' @click='orddertDetail(scope.row)'>查看订单</el-button>
            </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="paginationcenters">
        <el-pagination
          @current-change="handleCurrentChangeOrder"
          :current-page="currentPage3"
          layout="prev, pager, next"
          :total="ocount">
        </el-pagination>
      </div>
    </div>
    <div class="whitewraps">
      <el-row>
        <span class="tit left">下载记录</span>
      </el-row>
      <div class="mg15">
          <el-table
            :data="tableDatad"
            style="width: 100%"
          >
            <el-table-column
              prop="music_id"
              label="音乐ID"
            >
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="下载时间"
            >
            </el-table-column>
            <el-table-column
              prop="format"
              label="文件格式"
            >
            </el-table-column>
            <el-table-column
              prop="music_info.name"
              label="音乐名称"
            >
            </el-table-column>
            <el-table-column
              prop="music_info.album_info.name"
              label="专辑名称"
            >
            </el-table-column>
            <el-table-column
              prop="music_info.composer"
              label="艺术家"
            >
            </el-table-column>
            <el-table-column
              prop="uuid"
              label="操作"
            >
            <template slot-scope="scope">
              <el-button type='text' @click='MusicDetail(scope.row)'>查看</el-button>
            </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="paginationcenters">
        <el-pagination
          @current-change="handleCurrentChangeDownload"
          :current-page="currentPage4"
          layout="prev, pager, next"
          :total="dcount">
        </el-pagination>
      </div>
    </div>
    <div class="whitewraps" style='display: none;'>
      <el-row>
        <span class="tit left">登录日志</span>
      </el-row>
      <div class="mg15">
        <el-table
          :data="tableDatag"
          style="width: 100%"
        >
          <el-table-column
            prop="image"
            label="登录时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="namea"
            label="IP地址"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="地区"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="艺术家"
          >
          </el-table-column>
          <el-table-column
            prop="named"
            label="在线时长"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationcenters">
        <el-pagination
          @current-change="handleCurrentChangeLoginlog"
          :current-page="currentPage4"
          layout="prev, pager, next"
          :total="4">
        </el-pagination>
      </div>

    </div>
    <el-dialog
      title="创建项目"
      :visible.sync="createprodialogVisible"
      top='15px'
      width="500px">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目类型">
          <el-select v-model="form.type" placeholder="请选择活动区域" style="width: 100%;">
            <el-option label="公司" value="COMPANY"></el-option>
            <el-option label="个人" value="PERSONAL"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="form.name" maxlength='30'></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" v-model="form.desc" maxlength='100'></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createprodialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createprodialogVisiblecfm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src='@/assets/js/userdetail.js'></script>
<style scoped src='@/assets/css/musicdetail.css'></style>
