<template>
  <div id='PermissionManage'>
    <div class="whitewraps">
      <div class="pb15">
        <el-row>
          <span class="tit left">会员权限管理</span>
          <span class="right mt15 mr15 btngroupsx">
            <el-button size="mini" type="primary" @click="addMember">添加</el-button>
          </span>
        </el-row>
      </div>

      <div class="mg15"  :gutter='15'>
         <el-table
          :data="detail"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="会员类型">
           </el-table-column>
          <el-table-column
            prop="is_preview"
            label="在线试听">
             <template slot-scope="scope">
                <i class='uuidx'> {{ scope.row.is_preview ? '是' : '否' }} </i>
             </template>
           </el-table-column>
           <el-table-column
            prop="is_download_preview"
            label="下载水印文件">
             <template slot-scope="scope">
                <i class='uuidx'> {{ scope.row.download_preview_count }} 次</i>
             </template>
           </el-table-column>
           <el-table-column
            prop="is_preview"
            label="下载原始文件">
             <template slot-scope="scope">
                <i class='uuidx'> {{ scope.row.download_origin_count }} 次 </i>
             </template>
           </el-table-column>
           <el-table-column
            prop="desc"
            width="300px"
            label="备注">
             <template slot-scope="scope">
                <i class='uuidx'> {{ scope.row.desc  }} </i>
             </template>
           </el-table-column>
           <el-table-column
            prop="id"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="checkMemberUser(scope.row.id)">查看</el-button>
            </template>
           </el-table-column>
         </el-table>
      </div>
    </div>
    <addMemberUser :show.sync = "show"> </addMemberUser>
    <checkMemberUser :cshow.sync = "cshow"></checkMemberUser>
    <editMemberUser :dshow.sync = "dshow"  :editid="editi"></editMemberUser>
    <priceSetting :eshow.sync = "eshow"></priceSetting>
    <DeleteDialogue :delshow.sync = 'delshow'  :delid="deli"></DeleteDialogue>
</div>
</template>
<script src='@/assets/js/permissionmanage.js'></script>
<style scoped src='@/assets/css/permissionmanage.css'></style>
