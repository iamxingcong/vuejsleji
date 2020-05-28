
// import axiosapi from '@/config/axiosapi'
import axi from '@/config/axi'
export default {
  name: 'UserManage',
  data () {
    return {
      vip_type: {
        value: '',
        label: ''
      },
      is_active: {
        value: '',
        label: ''
      },
      created_at__gte: '',
      created_at__lte: '',
      options: [{
        value: 'NORMAL',
        label: '普通会员'
      }, {
        value: 'VIP',
        label: '高级会员'
      }],
      isactivd: [
        {
          value: 1,
          label: '激活'
        },
        {
          value: 0,
          label: '禁用'
        }
      ],
      value: '',
      dialogVisible: false,
      tableData: [{
        avatar: '',
        cumulative_pay: 0,
        download_origin_count: 0,
        is_active: true,
        is_vip: false,
        last_login: '',
        name: '',
        uuid: ''
      }],
      currentPage3: 1,
      count: 0,
      uuid: '',
      suuid: '',
      name: '',
      largesmallx: 'xsmx'
    }
  },
  created () {
    this.user()
  },
  methods: {
    async user () {
      if (this.created_at__gte === null) {
        this.created_at__gte = ''
      }
      try {
        const dt = await axi().get('/ops/user/?ordering=-created_at&search=' +
        this.suuid + '&vip_type=' + this.vip_type.value + '&created_at__gte=' + this.created_at__gte +
        '&created_at__lte' + this.created_at__lte +
        '&is_active=' + this.is_active.value)
        if (dt.status === 200) {
          this.tableData = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    uuidinput () {
      this.user()
    },
    detailedUser (row) {
      console.log(row)
      let routeData = this.$router.resolve({path: 'UserDetail', query: {'uuid': row.uuid}})
      window.open(routeData.href, '_blank')
    },
    edit (row) {
      console.log(row)
      let routeData = this.$router.resolve({path: 'UserEdit', query: {'uuid': row.uuid}})
      window.open(routeData.href, '_blank')
    },
    addUser () {
      // this.$router.push('AddUser')
      let routeData = this.$router.resolve({path: 'AddUser'})
      window.open(routeData.href, '_blank')
    },
    hddelete (x) {
      this.uuid = x.uuid
      this.name = x.name
      this.dialogVisible = true
    },
    async deleteconfirm () {
      try {
        let dp = await axi().delete('/ops/user/' + this.uuid)
        if (dp.status === 200) {
          this.user()
          this.dialogVisible = false
        } else {
          console.log('错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async schange (r) {
      console.log(r)
      // /ops/user/batch_inactive/
      if (r.is_active) {
        try {
          const dt = await axi().post('/ops/user/batch_active', {
            'uuids': [r.uuid]
          })
          if (dt.status === 200) {
            this.user()
            this.$message({
              message: '状态激活成功',
              type: 'success'
            })
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          const dt = await axi().post('/ops/user/batch_inactive', {
            'uuids': [r.uuid]
          })
          if (dt.status === 200) {
            this.user()
            this.$message({
              message: '状态修禁用成功',
              type: 'success'
            })
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    async handleSizeChangeg (val) {
      try {
        const dt = await axi().get('/ops/user/?page_size=' + val)
        if (dt.status === 200) {
          this.tableData = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCurrentChangeg (val) {
      try {
        const dt = await axi().get('/ops/user/?page=' + val)
        if (dt.status === 200) {
          this.tableData = dt.data.results
          this.count = dt.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    clickitem (e) {
      e === this.vip_type ? this.vip_type = '' : this.vip_type = e
      console.log(this.vip_type)
      if (this.vip_type !== '')  {
        this.vip_type = this.vip_type
        this.user()
      } else {
        this.user()
      }
    },
    sclickitem (e) {
      e === this.is_active ? this.is_active = '' : this.is_active = e
      console.log(this.is_active)
      if (this.is_active !== '')  {
        this.is_active = this.is_active
        this.user()
      } else {
        this.user()
      }
    },
    smlg () {
      this.largesmallx = 'lglg'
    },
    smsmx () {
      // this.largesmallx = 'xsmx'
    },
    clearvip () {
      this.vip_type = {
        value: '',
        label: ''
      }
      this.user()
    },
    clearlabel () {
      this.is_active = {
        value: '',
        label: ''
      }
      this.user()
    }
  }
}
