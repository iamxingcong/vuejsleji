<template>
  <div id='LoginLog'>
    <div class="white">
        <el-row>
          <span class="tit left">数据列表</span>
          <span class="right mt15 mr15 btngroupsx">
            <el-button size="mini" icon="el-icon-receiving">导出项目</el-button>
            <el-button size="mini">用户详情</el-button>
            <el-button size="mini">编辑资料</el-button>
            <el-button size="mini">登录日志</el-button>
          </span>
      </el-row>
      <div class="mg15">
        <el-table
          :data="tableDatab"
          style="width: 100%"
        >
          <el-table-column
            prop="image"
            label="登录时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="namea"
            label="IP地址"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="地区"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="艺术家"
          >
          </el-table-column>
          <el-table-column
            prop="named"
            label="在线时长"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="paginations">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          layout="prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'LoginLog',
  data () {
    return {
      tableDatab: [],
      currentPage4: 1,
      count: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped>
.paginations{
  padding-bottom: 35px;
}
.white .el-row{
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e2e2;
}

.el-table__header-wrapper,
.el-table__header{
  border-bottom: 1px solid #EBEEF5 !important;
}
</style>
