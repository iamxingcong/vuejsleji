<template>
  <el-container>
    <el-aside width='160px'>
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>

</script>
<script src="@/assets/js/managepanel.js"></script>
<style scoped>
  .el-header{
    box-shadow: 0px 2px 2px #e2e2e2;
  }
  #aside{
    height: 100%;
    background-color: #181932;
    color: #70718C;
    position: fixed;
    top: 0px;
    left: 0px;
    overflow: hidden;
  }

</style>
