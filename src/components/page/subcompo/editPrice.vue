<template>
  <el-dialog
    title="编辑定价方式"
    :visible.sync="visible"
    :showu="showu"
    width="1000px"
    top='15px'
    :modal="true"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :before-close="handleClose">

    <el-form :model="form"  :inline="true" >
      <el-row class="widtl">
        <el-form-item label="方案名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="方案描述：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.desc">
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="基础价格：" :label-width="formLabelWidth">
          <el-input v-model="form.price" type='number' autocomplete="off"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="授权地域：" :label-width="formLabelWidth">
          <el-checkbox v-model="form.place_cn"  :label='true'>中国</el-checkbox>
          <el-checkbox v-model="form.place_global"  :label='true'>全球</el-checkbox>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="授权时间：" :label-width="formLabelWidth">
          <el-checkbox v-model="form.time_one"  :label='true'> 一年 </el-checkbox>
          <el-checkbox v-model="form.time_forever"  :label='true'> 永久 </el-checkbox>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="授权类型" :label-width="formLabelWidth"></el-form-item>
      </el-row>
      <el-row>
        <div class='checkboxwraps'>

          <el-col :span="12" class='left'>
            <el-form-item label="授权类型">
              <el-checkbox-group v-model="area_uuids" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="i in chooselist" :label="i" :key="i.uuid">
                  <i class='mnames'> {{i.name}} </i>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="11" class='right'>
          <el-form-item label="已选">
            <el-tag
              :v-model="tags"
              v-for="tagx in tags"
              :key="tagx.uuid"
              closable
              @close="tagclose(tagx)"
            >
              {{tagx.name}}
            </el-tag>
          </el-form-item>
          </el-col>

        </div>

      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="cancels">取 消</el-button>
      <el-button size='mini' type="primary" @click="confirmed">确 定 </el-button>
    </span>
  </el-dialog>
</template>
<script src='@/assets/js/editprice.js'></script>
<style scoped src='@/assets/css/permissionmanage.css'></style>
