
<template>
  <div id='UserEdit'>
    <div class='whitewraps'>
      <el-row>
         <span class='tipsx mt13'>
          基本信息
        </span>
      </el-row>
      <el-form ref='form' :model='form' label-width='180px'  enctype='multipart/form-data'>
       <el-form-item label='用户名'>
          <el-input v-model='form.name'></el-input>
        </el-form-item>
        <el-form-item label='手机号码'>
          <el-input v-model='form.phone'></el-input>
        </el-form-item>
        <el-form-item label='邮箱'>
          <el-input v-model='form.email'></el-input>
        </el-form-item>
        <el-form-item label="用户头像">
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
        <el-form-item label='用户类型'>
          <el-select v-model='form.vip_type' placeholder='请选择会员等级'>
            <el-option label='普通' value='NORMAL'></el-option>
            <el-option label='高级' value='VIP'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='所在城市'>
          <el-input v-model='form.city_name'></el-input>
        </el-form-item>
        <el-form-item label='职业'>
          <el-input v-model='form.career'></el-input>
        </el-form-item>
        <el-form-item label='公司名称'>
          <el-input v-model='form.company_name'></el-input>
        </el-form-item>
        <el-form-item label='描述'>
          <el-input v-model='form.desc'></el-input>
        </el-form-item>
        <el-form-item label='设置密码'>
          <el-input v-model='form.password'></el-input>
        </el-form-item>
        <el-form-item label='账号状态'>
            <el-radio v-model="form.is_active" label="1">启用</el-radio>
            <el-radio v-model="form.is_active" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button size='mini' type='primary' @click='onSubmit'> 保存 </el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>
<script>
import axiosapi from '@/config/axiosapi'

// import axios from 'axios'
export default {
  name: 'AddUser',
  data () {
    return {
      form: {
        phone: '',
        email: '',
        vip_type: '',
        avatar: '',
        city_name: '',
        career: '',
        company_name: '',
        desc: '',
        password: '',
        is_active: true,
        invoice: '',
        taxpayer_number: '',
        company_address: '',
        company_phone: '',
        opening_bank: '',
        account_no: ''
      },
      imageUrl: '',
      isMultiple: true,
      updata: {
        'upload_dir': 'user_avatar',
        'extension': ''
      },
      updatt: {
        'upload_dir': 'user_avatar',
        'extension': 'jpeg'
      },
      updatas: {},
      imgs: '',
      urls: ''
    }
  },
  created () {
    this.imgupurl()
  },
  methods: {
    async imgupurl () {
      try {
        let dt = await axiosapi.avatarupload(this.updatt)
        if (dt.status === 200 || dt.status === 201) {
          this.urls = dt.data.host
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      if (isJPG || isPNG || isGIF) {
        console.log('符合')
      } else {
        this.$message.error('图片格式不符合')
        return
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      try {
        this.updata.extension = file.type.replace('image/', '')
        let dt = await axiosapi.avatarupload(this.updata)
        if (dt.status === 200 || dt.status === 201) {
          this.updatas.OSSAccessKeyId = dt.data.OSSAccessKeyId
          this.updatas.policy = dt.data.policy
          this.updatas.Signature = dt.data.Signature
          this.updatas.key = dt.data.key
          this.form.avatar = this.urls + '/' + dt.data.key
        }
      } catch (e) {
        console.log(e)
      }
      return isJPG && isLt2M && isPNG && isGIF
    },
    async onSubmit () {
      try {
        let dt = await axiosapi.useradd(this.form)
        if (dt.status === 200 || dt.status === 201) {
          this.$router.push('UserManage')
        }
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.detail)
        } else if (e.request) {
          console.log(e.request)
        } else {
          console.log('Error', e.message)
        }
        console.log(e)
      }
    }
  }
}
</script>
<style  scoped>
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
  display: block;
  clear: both;
}
.el-form-item .wrn{
  position: absolute;
  left: -95px;
  top: 2px;
  color: red;
}
#UserEdit .el-form{
  width: 500px;
  margin: 0px auto;
  float: left;
  margin-left: 15px;
}
#UserEdit .el-input,
#UserEdit .el-select{
  width: 370px;
}
.avatar{
  max-width: 100px;
}
.el-form-item{
  margin-bottom: 10px;
}
.tipsx{
  font-size: 1.5em;
  font-weight: 700;
  display: block;
  clear: both;
  float: left;
  text-align: left;
  padding-left: 100px;
}
</style>
