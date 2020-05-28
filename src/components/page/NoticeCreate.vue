<template>
  <div id='NoticeCreate'>
    <div class="whitewraps">
      <el-row>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="backTo">返回</el-button>
        </span>
      </el-row>
      <el-form ref="form" :model="form" label-width="120px">
        <div class='cross' id='buildcolumnbtns'>
          <el-form-item label="消息栏目">
            <el-select v-model="form.column_id" placeholder="请选择消息栏目">
              <el-option
                v-for="item in columnlst"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-button  @click='addclm'>添加栏目</el-button>
        </div>
        <el-form-item label="消息标题">
          <el-input v-model="form.title" placeholder='请填写消息标题'></el-input>
        </el-form-item>
        <el-form-item label="接收对象">
          <el-select v-model="form.type" placeholder="请选择接收对象">
            <el-option label="全部" value="ALL"></el-option>
            <el-option label="普通会员" value="NORMAL"></el-option>
            <el-option label="高级会员" value="VIP"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="消息内容"
            v-model="form.content">
          </el-input>
        </el-form-item>
        <el-form-item label="提醒方式：">
          <el-checkbox-group  v-model="checkList">
            <el-checkbox label="站内信"></el-checkbox>
            <el-checkbox label="邮件" disabled></el-checkbox>
            <el-checkbox label="短信" disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button size='mini' type="primary" @click="onSubmit">发布</el-button>
          <el-button size='mini' type="primary" @click='save'>保存</el-button>
          <el-button size='mini' @click='resets'>重置</el-button>
          <el-button size='mini' @click="backTo">返回</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div id='addcolumn'>
      <el-dialog title='添加栏目'
      :close-on-click-modal='false'
      :visible.sync='dialogFormVisible'>
        <el-form :model='formadd'>
          <el-col :span="22" >
            <el-form-item label='栏目名称：' :label-width='formLabelWidth'>
              <el-input v-model='formadd.name'  maxlength='12' placeholder="请输入栏目名称" autocomplete='off'></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="22">
            <el-form-item label='栏目描述：' :label-width='formLabelWidth'>
              <el-input
                type='textarea'
                :autosize='{ minRows: 3, maxRows: 4}'
                placeholder='请输入栏目描述：'
                maxlength='50'
                v-model='formadd.desc'>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='dialogFormVisible = false'>取 消</el-button>
          <el-button size='mini' type='primary' @click='addcolumncfm'>确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script src='@/assets/js/noticecreate.js'></script>
<style scoped>
.tips{
  margin-top: 20px;
  float: left;
  padding-left: 20px;
  font-size: 0.8em;
  line-height: 20px;
  height: 20px;
  color: #434343;
  opacity: 0.9;
  position: relative;
}
.tips:before{
  content: '*';
  color: red;
  line-height: 20px;
  height: 20px;
  font-size: 25px;
  display: block;
  position: absolute;
  left: 10px;
  top: 5px;
}
.el-form-item{
  position: relative;
}
.el-form-item .wrn{
  position: absolute;
  left: -95px;
  top: 2px;
  color: red;
}
#NoticeCreate .el-form{
  width: calc(100% - 120px);
  margin: 0px auto;
  margin-top: 30px;
}
#NoticeCreate .el-input,
#NoticeCreate .el-select{
  width: 370px;
  float: left;
}
.el-checkbox-group{
  float: left;
}
.el-form-item{
  text-align: left;
}
#buildcolumnbtns .el-form-item,
#buildcolumnbtns .el-button {
  display: block;
  float: left;
}
#buildcolumnbtns .el-button{
  margin-left: 35px;
}
.el-form-item {
  display: block;
  clear: both;
}
</style>
