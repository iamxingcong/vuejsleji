<template>
  <div id='BrandLists'>

    <div id='musicBrand'>
      <div class='searchinput'   v-show ='!filtershow'>
          <el-input placeholder="请输入搜索内容" v-model='pkeywords' @keyup.13.native="searching" class="input-with-select">
            <el-button slot="prepend" icon="el-icon-search" v-on:click="searching">搜索</el-button>
            <template slot="append">
              <el-button @click='clearsearch' class='el-icon-close'></el-button>
            </template>
        </el-input>
      </div>
       <el-row   v-show ='filtershow'>
        <div  class='right mr15 mt13 btngroupsx'>
           <el-button type="primary" @click='searchShow' size='mini' icon="el-icon-search">搜索</el-button>
          <el-button type='primary'  size='mini'   @click='openadd'>添加</el-button>
        </div>
      </el-row>
      <div id='brandWrap'>
          <div class='sinbrand' v-for='(i,index) in ms' :key = 'index'>
            <div class='bgngroupsx mgr15 mt15'>
              <el-button type='text' size='mini' class='f12' v-on:click='editlabel(i.uuid)'>编辑</el-button>
              <el-button type='text' size='mini' class='f12' v-on:click='deleteBrand(i.uuid)'>删除</el-button>
            </div>
            <div class='brandLogo'
            :style='{ backgroundImage: `url(${i.logo ? i.logo :  img})` }'
            v-on:click='brandDetail(i.uuid)'></div>
            <span class='hti'  v-on:click='brandDetail(i.uuid)'>{{i.name}}</span>
            <div class='rightspanwrp'>
                <div class='crs flex3 c99'>
                    <span>音乐
                      <i>{{i.music_count}}</i>
                    </span>
                     <span>专辑
                      <i> {{i.album_count}} </i>
                    </span>
                    <span>艺术家
                      <i> {{i.producer_count}} </i>
                    </span>
                </div>
            </div>
            <span class='desc'>{{i.desc}}</span>
          </div>
          <div class='paginationcenters'>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              layout="prev, pager, next"
              :total="count">
            </el-pagination>
         </div>
      </div>
    </div>

    <div id='dialogues'>
       <el-dialog
        title='确认提示'
        :visible.sync='dialogVisible'
        :close-on-click-modal='false'
        width='30%'>
        <span class='fw700 cross'>
          <i class='el-icon-warning'></i>
            是否确定删除厂牌: {{uuid}}
        </span>
        <span class='cross'>厂牌信息删除后不可恢复</span>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='deleteconfirm'>确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div id='addlabel'>
      <el-dialog title='添加厂牌：'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisible'>
        <el-form :model='form'>
          <el-form-item label='厂牌名称：' :label-width='formLabelWidth'>
            <el-input v-model='form.name' placeholder="请输入厂牌名称" maxlength='24' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='厂牌介绍：' :label-width='formLabelWidth'>
            <el-input
            maxlength='50'
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              placeholder='请输入厂牌介绍'
              v-model='form.desc'>
            </el-input>
          </el-form-item>
           <el-form-item label='添加LOGO' :label-width='formLabelWidth'>

            <el-upload
              class="avatar-uploader"
              :action="urls"
              :data='updatas'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='addlabels'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id='editlabel'>
      <el-dialog title='编辑厂牌：'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisibleEdit'>
        <el-form :model='forme'>
          <el-form-item label='厂牌名称：' :label-width='formLabelWidth'>
            <el-input v-model='forme.name' maxlength='24' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='厂牌介绍：' :label-width='formLabelWidth'>
            <el-input
              type='textarea'
              :autosize='{ minRows: 3, maxRows: 4}'
              v-model='forme.desc'>
            </el-input>
          </el-form-item>
           <el-form-item label='添加LOGO' :label-width='formLabelWidth'>

            <el-upload
              class="avatar-uploader"
              :action="urls"
              :data='updatas'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button @click='dialogFormVisibleEdit = false'>取 消</el-button>
          <el-button type='primary' @click='editlabelconfirm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script src="@/assets/js/brandlist.js"></script>
<style scoped src='@/assets/css/brandlists.css'></style>
