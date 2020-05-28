<template>
  <div id='AuthorizeManage'>
    <div class="white">
      <div class="bdbtm">
        <el-row>
          <span class="tit left">数据筛选</span>
          <span class="right mt15 mr15 btngroupsx">
            <el-button size="mini">高级搜索</el-button>
          </span>
        </el-row>
      </div>
      <el-row>
        <div class="flex4">
          <div class="demo-input-suffix">
            订单类型：
            <el-select v-model="valuea" placeholder="请选择">
              <el-option
                v-for="item in optionsa"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="demo-input-suffix">
              订单状态：
             <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="demo-input-suffix">
              注册时间：
             <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
          </div>
          <div class="demo-input-suffix">
            <el-button size='mini' icon="el-icon-refresh-left">重置</el-button>
            <el-button size='mini' type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </el-row>

      <el-row>
        <div class="flex4">
          <div class="demo-input-suffix">
            查询内容：
            <el-input
              placeholder="用户ID/账号"
              v-model="input1">
            </el-input>
          </div>
        </div>
      </el-row>
    </div>

    <div class="white mt15">
      <el-row>
          <span class="tit left">授权列表</span>
          <span class="right mt15 mr15 btngroupsx">
            <el-button type='primary' size="mini" @click="createOrder">创建订单</el-button>
            <el-button size="mini" icon="el-icon-receiving">导出</el-button>
          </span>
      </el-row>
      <div class="pd15">
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="授权编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="提交时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="订单类型">
          </el-table-column>
          <el-table-column
            prop="addressa"
            label="DCI编码">
          </el-table-column>
          <el-table-column
            prop="addressb"
            label="授权价格">
          </el-table-column>
          <el-table-column
            prop="addressc"
            label="音乐名称/专辑">
          </el-table-column>
          <el-table-column
            prop="addressd"
            label="使用者名称">
          </el-table-column>
          <el-table-column
            prop="addresse"
            label="订单状态">
            <template slot-scope="scope">
              <i v-if="scope.row.addresse == true">已付款</i>
              <i v-else>代付款</i>
            </template>
          </el-table-column>
          <el-table-column
            width="250"
            prop="addressf"
            label="操作">
            <template slot-scope="scope">
               <el-button
                type="text"
                @click="checkOrder(scope.row)">查看</el-button>
               <el-button
                type="text"
                @click="cancelAuth(scope.row)">取消授权</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="paginations">
        <el-pagination
          background
          @size-change="handleSizeChangeg"
          @current-change="handleCurrentChangeg"
          :current-page="currentPage3"
          :page-sizes="[10, 20, 30, 100]"
          :page-size="100"
          layout="prev, pager, next, sizes"
          :total="400">
        </el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'AuthorizeManage',
  data () {
    return {
      input1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      optionsa: [{
        value: '选项1',
        label: '黄金糕fs'
      }, {
        value: '选项2',
        label: '双皮fds奶'
      }, {
        value: '选项3',
        label: '蚵f仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      valuea: '',
      value1: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        addressa: '上海市普陀区金沙江路 1518 弄',
        addressb: '上海市普陀区金沙江路 1518 弄',
        addressc: '上海市普陀区金沙江路 1518 弄',
        addressd: '马大哈',
        addresse: false,
        addressf: 'affa'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        addressa: '上海市普陀区金沙江路 1518 弄',
        addressb: '上海市普陀区金沙江路 1518 弄',
        addressc: '上海市普陀区金沙江路 1518 弄',
        addressd: '马大哈',
        addresse: true,
        addressf: 'affa'
      }],
      currentPage3: 2
    }
  },
  methods: {
    handleSizeChangeg (val) {
      console.log(`每页a ${val} 条`)
    },
    handleCurrentChangeg (val) {
      console.log(`当前页a: ${val}`)
    },
    checkOrder (x) {
      console.log(x)
      console.log('检查订单')
      this.$router.push('AuthorizeDetail')
    },
    cancelAuth (f) {
      console.log(f)
      console.log('取消授权')
    },
    createOrder () {
      console.log('创建订单')
    }
  }
}
</script>
<style scoped>
  .white{
    padding-bottom: 15px;
  }
  .flex4  .demo-input-suffix{
    flex: 4;
    text-align: left;
    margin-left: 20px;
  }
  .demo-input-suffix .el-input,
  .demo-input-suffix .el-select{
    width: 200px;
  }
  .white .el-row{
    margin-bottom: 15px;
  }
  .demo-input-suffix button{
    float: right;
    margin-right: 15px;
  }
  .cell{
    display: flex;
  }
  .cell button{
    flex: 3;
  }
  i{
    font-style: normal;
  }
</style>
