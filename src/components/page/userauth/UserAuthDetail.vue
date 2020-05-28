<template>
<div id='UserAuthDetail'>
  <div class="whitewraps">
    <el-row>
      <span class='left childired titlelft'>
        授权状态
        <i v-if='detailx.status === "SUCCEED"'>  授权成功 </i>
        <i v-else-if='detailx.status === "WAITING"'>  等待授权 </i>
        <i v-else-if='detailx.status === "CANCELED"'>  取消授权 </i>
        <i v-else-if='detailx.status === "FAILED"'>  授权失败 </i>
        <!-- WAITING(等待授权)/SUCCEED(授权成功)/FAILED(授权失败)/CANCELED(取消授权) -->
      </span>
      <div class='right mgt40 mgr15 btngroupsx'>
        <el-button  size="mini" @click='revisepop(detailx.uuid)'>
            修改授权信息
        </el-button>
      </div>
    </el-row>
    <el-row>
      <span class="titlelft bold">授权信息</span>
    </el-row>

    <div class="mg15"  :gutter='15'>
        <el-table
          :data="det"
          style="width: 100%">
          <el-table-column
            width='357px'
            label="授权编号">
            <template slot-scope='scope'>
              <img :src='scope.row.music_info.avatar' />
              <i>{{ scope.row.uuid }}</i>
            </template>
          </el-table-column>
          <el-table-column
            prop='music_info.name'
            label="音乐名称">
          </el-table-column>
          <el-table-column
            prop='data.area.name'
            label="授权信息">
            <template slot-scope="scope">
              <i>{{ scope.row.data.area.name}}</i>
                <i>{{ scope.row.data.area.desc}}</i>
            </template>
          </el-table-column>
           <el-table-column
              width='175px'
              label="授权起始时间"
              prop='name'>
               <template slot-scope="scope">
                <i> {{ scope.row.created_at }} </i>
                <i v-if='scope.row.expire_time'> {{ scope.row.expire_time }} </i>
               </template>
            </el-table-column>

          <el-table-column
            width='137px'
            prop='amount'
            label="授权价格">
             <template slot-scope="scope">
                <i> ￥{{ scope.row.amount }} </i>
             </template>
          </el-table-column>
            <el-table-column
            width='110px'
            label="操作"
            prop='uuid'>
              <template slot-scope="scope">
              <el-button
                type="text"
              @click="checks(scope.row.music_info.uuid)"> 音乐详情 </el-button>
          </template>
          </el-table-column>
        </el-table>
    </div>
    <el-row>
      <span class="titlelft bold">使用者信息</span>
    </el-row>
    <div class="mg15"  :gutter='15'>
        <el-table
          :data="det"
          style="width: 100%">
          <el-table-column
            width='357px'
            label="公司/个人">
            <template slot-scope='scope'>
              <i v-if='scope.row.data.use_name '>{{ scope.row.data.use_name }}</i>
              <i v-else> - </i>
            </template>
          </el-table-column>
          <el-table-column
            label="授权项目">
             <template slot-scope='scope'>
              <i v-if='scope.row.data.project_name'>{{ scope.row.data.project_name }}</i>
              <i v-else> - </i>
            </template>
          </el-table-column>
          <el-table-column
            prop='data.area.name'
            label="下单用户">
            <template slot-scope="scope">
              <i>{{ scope.row.user_info.name}}</i>
            </template>
          </el-table-column>
          <el-table-column
            width='237px'
            label="手机/邮箱">
             <template slot-scope="scope">
                <i> {{ scope.row.user_info.phone }} </i>
                <i> {{ scope.row.user_info.email }} </i>
             </template>
          </el-table-column>
            <el-table-column
            width='110px'
            label="操作"
            prop='uuid'>
              <template slot-scope="scope">
              <el-button
                type="text"
              @click="checksuser(scope.row.user_info.uuid)"> 查看详情 </el-button>
          </template>
          </el-table-column>
        </el-table>
    </div>

    <el-dialog
      title="修改授权信息"
      :visible.sync="dialogVisibleRevise"
      width="500px"
      :modal="true"
      :close-on-click-modal="false"
      :destroy-on-close="true">

        <el-form  label-width="100px" :model='auth'>

          <el-form-item label="公司/个人">
            <el-input v-model="auth.use_name"></el-input>
          </el-form-item>
          <el-form-item label="授权项目">
            <el-input v-model="auth.project_name"></el-input>
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
<script src='@/assets/js/userauthdetail.js'></script>
