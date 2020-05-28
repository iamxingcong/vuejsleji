<template>
  <div class='header'>
    <el-row>
      <span class='left breads'>
        {{ breads }}
        <i v-if=' routep === "/MusicFilter"'> ( {{ mcount}} ) </i>
      </span>
      <div class='btngroup'>
        <span class='text'>{{user}}</span>
        <el-button type='text' v-on:click="loginout">退出</el-button>
      </div>
      <div class='search200'>
         <el-input placeholder="请输入搜索内容" v-model="search"  @keyup.13.native="searching"  @input='searching' class="input-with-select">
          <el-button slot="append" icon="el-icon-search" v-on:click="searching"></el-button>
        </el-input>
      </div>
        <span id='pling' v-show='audios === true'> 正在播放： {{ mname }} </span>
        <audio :src="audiourl"  controls id='audio' autoplay  v-show='audios === true'></audio>
    </el-row>
  </div>
</template>

<script src='@/assets/js/header.js'></script>
<style scoped>
  .breads{
    line-height: 52px;
    font-size: 18px;
    color: #34363A;
    padding-left: 15px;
  }
  .search200{
    max-width: 200px;
    margin-top: 12.5px;
    float: right;
    display: block;
    margin-right: 20px;
    position: relative;
  }
  .btngroup{
    display: block;
    margin-top: 10px;
    float: right;
  }
  .btngroup span, .btngroup button{
    color: #999;
  }
  .text{
    margin-right: 10px;
  }
  .el-button{
    padding: 13px 20px;
  }
  #audio{
    margin-top: 7px;
    height: 40px;
    margin-left: 20px;
    float: left;
    width: calc(100% - 800px);
    line-height: 40px;
  }
  #pling{
    margin-top: 7px;
    display: block;
    float: left;
    max-width: 250px;
    text-align: left;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 30px;
  }
</style>
