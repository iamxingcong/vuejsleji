<template>
  <div id='big_wrap'>
    <div id="background"  :style='{ backgroundImage: `url(${bg})` }'></div>
    <div id="contentwraps">
      <div class='login_div'>
        <div id='bg_icons' :style='{ backgroundImage: `url(${img})` }'></div>
        <span class='login_title'>{{ msg }}</span>
      </div>
      <div class='login_wrap'>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手机登录" name="first">
          <div class='login_form'>
            <el-form ref='form' :model='form'>
              <div class='singrow'>
               <el-col :span="6">
                  <el-form-item>
                     <el-select v-model="areac" placeholder="请选择">
                      <el-option
                        v-for="item in telc"
                        :key="item.id"
                        :label="item.tel_code"
                        :value="item.tel_code">
                        <span style="float: left">{{ item.tel_code }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name_ch }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item>
                    <el-input  placeholder='手机号'  v-model='phone' autocomplete='off'></el-input>
                  </el-form-item>
                </el-col>
              </div>
              <div class='singrow'>
              <el-form-item>
                  <el-col :span="20">
                    <el-input :type="ptype" placeholder='密码'  v-model='form.password'></el-input>
                  </el-col>
                  <el-col :span='4' class='woneh'>
                    <el-button v-if='ptype === "text"'  type='text'  :style='{ backgroundImage: `url(${eyeo})` }'  @click='toggles'></el-button>
                    <el-button v-else  type='text'  :style='{ backgroundImage: `url(${eye})` }'  @click='toggles'></el-button>
                  </el-col>
              </el-form-item>
              </div>
              <el-row>
                <div class="flr">
                  <el-button type='text' @click="ResetPassword">忘记密码</el-button>
                </div>
              </el-row>
              <el-row>
                <div class="w336">
                  <el-button type='primary' size='medium' v-on:click='login'>登录</el-button>
                </div>
              </el-row>
          </el-form>
        </div>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="second">

          <el-form ref='form' :model='forma'>
            <div class='login_form'>
              <div class='singrow'>
                <el-col :span="24">
                  <el-form-item>
                      <el-input  placeholder='邮箱'  v-model='forma.email' autocomplete='off'></el-input>
                  </el-form-item>
                </el-col>
              </div>
              <div class='singrow'>
                <el-form-item>
                  <el-col :span="20">
                    <el-input :type="xtype" placeholder='密码'  v-model='forma.password'></el-input>
                  </el-col>
                  <el-col :span='4' class='woneh'>
                    <el-button v-if='xtype === "text"'  type='text'  :style='{ backgroundImage: `url(${eyeo})` }'  @click='togglesx'></el-button>
                    <el-button v-else  xtype='text'  :style='{ backgroundImage: `url(${eye})` }'  @click='togglesx'></el-button>
                  </el-col>
                </el-form-item>
              </div>
              <el-row>
                <div class="flr w336">
                  <el-button type='text' @click="ResetPassword">忘记密码</el-button>
                </div>
              </el-row>
              <el-row>
                <div class="w336">
                  <el-button type='primary' size='medium' v-on:click='logina'>登录</el-button>
                </div>
              </el-row>
            </div>
          </el-form>

        </el-tab-pane>
      </el-tabs>

      </div>
        <div id='footer'>
          <span>Copyright © www.cmusiccopyright.com, All Rights Reserved.</span>
          <span>音乐版权管理平台</span>
        </div>
    </div>
  </div>
</template>
<script src='@/assets/js/login.js'></script>
<style scoped src='@/assets/css/resetpassword.css'></style>
