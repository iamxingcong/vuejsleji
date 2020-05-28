<template>
  <div id='AuthorizeDetail'>
    <div class="detail">
      <el-row>
        <span class="tit left">授权详情</span>
        <span class="right mt15 mr15 btngroupsx">
          <el-button size="mini" @click="backTo">返回</el-button>
        </span>
      </el-row>
    </div>

    <div class="detail">
      <div class="bdbtm">
        <el-row>
          <span class="left lh60 ml25">订单状态：</span>
          <span class="status lh60 left">代付款</span>
          <span class="right mt15 mr15 btngroupsx">
            <el-button size="mini">修改订单状态</el-button>
            <el-button size="mini">修改使用者信息</el-button>
            <el-button size="mini">修改音乐信息</el-button>
            <el-button size="mini">修改费用信息</el-button>
            <el-button size="mini">修改授权信息</el-button>
            <el-button size="mini">修改发票信息</el-button>
          </span>
        </el-row>
      </div>
      <el-row>
        <span class="tit left">授权信息</span>
      </el-row>

      <div class="mg15">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="用户名称"
          >
          </el-table-column>
          <el-table-column
            prop="namea"
            label="项目名称"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="邮箱地址"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="授权类型"
          >
          </el-table-column>

        </el-table>
        <el-table
          :data="tableDatab"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="用户名称"
          >
          </el-table-column>
          <el-table-column
            prop="namea"
            label="用户名称"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="用户名称"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="用户名称"
          >
          </el-table-column>

        </el-table>
      </div>

      <el-row>
        <span class="tit left">发票信息</span>
      </el-row>
      <div class="mg15">
        <el-table
          :data="tableDatac"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="用户名称"
          >
          </el-table-column>
          <el-table-column
            prop="namea"
            label="税号"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="发票抬头"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="开户银行"
          >
          </el-table-column>
          <el-table-column
            prop="named"
            label="电话号码"
          >
          </el-table-column>
          <el-table-column
            prop="namee"
            label="单位地址"
          >
          </el-table-column>
        </el-table>
      </div>

      <el-row>
        <span class="tit left">纸质文件邮寄信息</span>
      </el-row>
      <div class="mg15">
        <el-table
          :data="tableDatac"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="收件人"
          >
          </el-table-column>
          <el-table-column
            prop="namea"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="邮政编码"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="收件地址"
          >
          </el-table-column>
        </el-table>
      </div>

      <el-row>
        <span class="tit left">音乐信息</span>
      </el-row>
      <div class="mg15">
        <el-table
          :data="tableDatae"
          border
          style="width: 100%"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="专辑图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.image" width="50" :key="scope.row.image" height="50"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="namea"
            label="专辑图片"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="音乐名称"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="发行商"
          >
          </el-table-column>
          <el-table-column
            prop="named"
            label="发行年代"
          >
          </el-table-column>
          <el-table-column
            prop="namee"
            label="ISRC"
          >
          </el-table-column>
          <el-table-column
            prop="namef"
            label="操作"
          >
          </el-table-column>
          <el-table-column
            prop="nameg"
            label="收益金额"
          >
          </el-table-column>
        </el-table>
      </div>

      <el-row>
        <span class="tit left">使用者信息</span>
      </el-row>
      <div class="mg15">
        <el-table
          :data="tableDataf"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="使用者姓名"
          >
          </el-table-column>
          <el-table-column
            prop="namea"
            label="用户账号"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="邮箱"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="操作"
          >
          </el-table-column>
        </el-table>
      </div>

      <el-row>
        <span class="tit left">收益信息</span>
      </el-row>
      <div class="mg15">
        <el-table
          :data="tableDatag"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="商品合计"
          >
          </el-table-column>
          <el-table-column
            prop="namea"
            label="优惠券类型"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="优惠金额"
          >
          </el-table-column>
          <el-table-column
            prop="namec"
            label="应付款金额"
          >
          </el-table-column>
        </el-table>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: 'AuthorizeDetail',
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 'sfd搜搜放松放松',
        nameg: 'sfd搜搜放松放松'
      }],
      tableDatab: [{
        date: '2016-05-03',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 'sfd搜搜放松放松',
        nameg: 'sfd搜搜放松放松'
      }],
      tableDatac: [{
        date: '2016-05-03',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 'sfd搜搜放松放松',
        nameg: 'sfd搜搜放松放松'
      }],
      tableDatad: [{
        date: '2016-05-03',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 'sfd搜搜放松放松',
        nameg: 'sfd搜搜放松放松'
      }],
      tableDatae: [{
        image: 'https://www.baidu.com/img/bd_logo1.png',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 33,
        nameg: 322
      },
      {
        image: 'https://www.baidu.com/img/bd_logo1.png',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 12,
        nameg: 23.98
      }],
      tableDataf: [{
        date: '2016-05-03',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 'sfd搜搜放松放松',
        nameg: 'sfd搜搜放松放松'
      }],
      tableDatag: [{
        date: '2016-05-03',
        namea: '上海',
        nameb: '普陀区',
        namec: '上海市普陀区金沙江路 1518 弄',
        named: 200333,
        namee: 'sfsff',
        namef: 'sfd搜搜放松放松',
        nameg: 'sfd搜搜放松放松'
      }]
    }
  },
  methods: {
    backTo () {
      this.$router.go(-1)
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 6) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value)) && index === 7) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  }
}
</script>
<style scoped>
 .detail{
    background-color: #fff;
    margin-bottom: 15px;
    padding-bottom: 15px;
  }
  .status{
    color: #D32424;
  }
  .lh60{
    line-height: 60px;
  }
  .ml25{
    margin-left: 25px;
  }
  .detail .bdbtm {
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e2e2;
    display: block;
    clear: both;
    height: 45px;
}
</style>
