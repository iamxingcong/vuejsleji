<template>
  <div id='big_wrap'>
    <div id="background"  :style='{ backgroundImage: `url(${bg})` }'></div>
    <div id="contentwraps">
      <div id='logodiv'>
        <div id='bg_icons' :style='{ backgroundImage: `url(${img})` }'></div>
          <span class='login_title'>{{ msg }}</span>
      </div>
      <div class='login_wrap'>
        <el-row>
          <div class="bdbtms">
            <span class="left ttl40">找回密码</span>
            <span class="right ttr40">
              <el-button type="text" @click='goto_login'>登录</el-button>
            </span>
          </div>
        </el-row>
        <el-form ref='form' :model='form'>
          <div class='login_form'>
            <el-row>
              <div class='singrow'>
                <el-form-item>
                    <el-input  placeholder='手机'  v-model='form.phone'></el-input>
                </el-form-item>
              </div>
            </el-row>
            <el-row>
              <div class="w336">
                  <el-button type='primary' size='medium' v-on:click='next'>下一步</el-button>
              </div>
            </el-row>

            <el-row>
              <el-button type='text' @click="byemail">邮箱找回</el-button>
            </el-row>
          </div>
        </el-form>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '../public/footer.vue'

import axiosapi from '@/config/axiosapi'

export default {
  name: 'ResetPasswordPhone',
  components: {
    Footer
  },
  data () {
    return {
      msg: 'CMusic Copyright版权曲库管理系统',
      img: require('../../assets/icons/logo.png'),
      bg: require('../../assets/icons/bg.png'),
      form: {
        phone: '',
        business_type: 'PHONE_RESET_PWD'
      }
    }
  },
  created () {
    // var that = this
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        console.log('enter')
      }
    }
  },
  methods: {
    goto_login () {
      this.$router.push('/')
    },
    async next () {
      if (this.form.phone.length === 0) {
        this.$message({
          message: '手机号不能为空',
          type: 'warning'
        })
        return false
      } else {
        try {
          var hd = await axiosapi.verifycode(this.form)
          console.log(hd)
          if (hd.status === 201 || hd.status === 200) {
            this.$message({
              message: '验证码发送成功',
              type: 'success'
            })
            this.$router.push('ResetPasswordVerifyPhone')
          }
        } catch (e) {
          console.log(e)
          if (e.response) {
            this.$message.success(e.response.data.detail)
          }
        }
      }
    },
    byemail () {
      this.$router.push('ResetPassword')
    }
  }
}
</script>
<style scoped src='@/assets/css/resetpassword.css'></style>
