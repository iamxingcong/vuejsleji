import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/Login'
import ResetPassword from '@/components/page/ResetPassword'
import ResetPasswordVerify from '@/components/page/ResetPasswordVerify'

import ResetPasswordPhone from '@/components/page/ResetPasswordPhone'
import ResetPasswordVerifyPhone from '@/components/page/ResetPasswordVerifyPhone'

import ManagePanel from '@/components/page/ManagePanel'

import UserManage from '@/components/page/user/UserManage'
import ProjectList from '@/components/page/user/ProjectList'
import SubmitSuccess from '@/components/page/user/SubmitSuccess'
import UserDetail from '@/components/page/user/UserDetail'
import UserEdit from '@/components/page/user/UserEdit'
import AddUser from '@/components/page/user/AddUser'
import LoginLog from '@/components/page/user/LoginLog'
import ProjectDetailMass from '@/components/page/user/ProjectDetailMass'

import home from '@/components/page/home'
import RequestManage from '@/components/page/RequestManage'
import RequestDetail from '@/components/page/RequestDetail'

import BrandLists from '@/components/page/music/BrandLists'
import MusicFilter from '@/components/page/music/MusicFilter'
import AlbumFilter from '@/components/page/music/AlbumFilter'
import MusicUploadList from '@/components/page/music/MusicUploadList.vue'

import MusicDetail from '@/components/page/music/MusicDetail'
import BrandDetail from '@/components/page/music/BrandDetail'
import AlbumDetail from '@/components/page/music/AlbumDetail'
import MusicListMusicDetail from '@/components/page/music/MusicListMusicDetail'
import ArtistList from '@/components/page/music/ArtistList'
import ArtistDetail from '@/components/page/music/ArtistDetail'
import MassOperate from '@/components/page/music/MassOperate'

import AuthorizeManage from '@/components/page/AuthorizeManage'
import AuthorizeDetail from '@/components/page/AuthorizeDetail'
import ProfitManage from '@/components/page/ProfitManage'
import DataManage from '@/components/page/DataManage'
import PermissionManage from '@/components/page/PermissionManage'

import NoticeManage from '@/components/page/NoticeManage'
import NoticeDetail from '@/components/page/NoticeDetail'
import NoticeCreate from '@/components/page/NoticeCreate'
import NoticeEdit from '@/components/page/NoticeEdit'

import ColumnManage from '@/components/page/ColumnManage'
import MemmberDetail from '@/components/page/MemmberDetail'

import MusicLists from '@/components/page/MusicLists'
import PriceManage from '@/components/page/PriceManage'
import PriceAuthorizeType from '@/components/page/PriceAuthorizeType'
import PriceDetail from '@/components/page/PriceDetail'

import OrderList from '@/components/page/order/OrderList'
import OrderDetail from '@/components/page/order/OrderDetail'

import UserAuthList from '@/components/page/userauth/UserAuthList'
import UserAuthDetail from '@/components/page/userauth/UserAuthDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {title: 'SpeaklowMusic音乐管理后台', name: '登录'}
    },
    {
      path: '/ResetPassword',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: {title: 'SpeaklowMusic音乐管理后台', name: '密码重置'}
    },
    {
      path: '/ResetPasswordVerify',
      name: 'ResetPasswordVerify',
      component: ResetPasswordVerify,
      meta: {title: 'SpeaklowMusic音乐管理后台', name: '密码重置'}
    },
    {
      path: '/ResetPasswordPhone',
      name: 'ResetPasswordPhone',
      component: ResetPasswordPhone,
      meta: {title: 'SpeaklowMusic音乐管理后台', name: '密码重置'}
    },
    {
      path: '/ResetPasswordVerifyPhone',
      name: 'ResetPasswordVerifyPhone',
      component: ResetPasswordVerifyPhone,
      meta: {title: 'SpeaklowMusic音乐管理后台', name: '密码重置'}
    },
    {
      path: '/ManagePanel',
      component: ManagePanel,
      name: '',
      children: [
        {
          path: '/home',
          component: home,
          name: 'home',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '首页'}
        },
        {
          path: '/UserManage',
          component: UserManage,
          name: 'UserManage',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '用户管理'}
        },
        {
          path: '/ProjectList',
          component: ProjectList,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '项目详情'}
        },
        {
          path: '/SubmitSuccess',
          component: SubmitSuccess,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '提交成功'}
        },
        {
          path: '/UserDetail',
          component: UserDetail,
          name: 'UserDetail',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '用户详情'}
        },
        {
          path: '/UserEdit',
          component: UserEdit,
          name: 'UserEdit',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '用户编辑'}
        },
        {
          path: '/AddUser',
          component: AddUser,
          name: 'AddUser',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '添加用户'}
        },
        {
          path: '/LoginLog',
          component: LoginLog,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '用户登录'}
        },
        {
          path: '/RequestManage',
          component: RequestManage,
          name: 'RequestManage',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '请求管理'}
        },
        {
          path: '/RequestDetail',
          component: RequestDetail,
          name: 'RequestDetail',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '请求详情'}
        },
        {
          path: '/BrandLists',
          component: BrandLists,
          name: 'BrandLists',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '厂牌列表'}
        },
        {
          path: '/MusicFilter',
          component: MusicFilter,
          name: 'MusicFilter',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '音乐列表'}
        },
        {
          path: '/AlbumFilter',
          component: AlbumFilter,
          name: 'AlbumFilter',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '专辑列表'}
        },
        {
          path: '/MusicDetail',
          component: MusicDetail,
          name: 'MusicDetail',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '音乐详情'}
        },
        {
          path: '/MusicListMusicDetail',
          component: MusicListMusicDetail,
          name: 'MusicListMusicDetail',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '音乐详情'}
        },
        {
          path: '/BrandDetail',
          component: BrandDetail,
          name: 'BrandDetail',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '厂牌详情'}
        },
        {
          path: '/AlbumDetail',
          component: AlbumDetail,
          name: 'AlbumDetail',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '专辑详情'}
        },
        {
          name: 'AuthorizeManage',
          path: '/AuthorizeManage',
          component: AuthorizeManage,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '授权管理'}
        },
        {
          name: 'AuthorizeDetail',
          path: '/AuthorizeDetail',
          component: AuthorizeDetail,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '授权详情'}
        },
        {
          name: 'ProfitManage',
          path: '/ProfitManage',
          component: ProfitManage,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '利润管理'}
        },
        {
          path: '/DataManage',
          component: DataManage,
          name: 'DataManage',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '数据统计'}
        },
        {
          name: 'PermissionManage',
          path: '/PermissionManage',
          component: PermissionManage,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '会员权限'}
        },
        {
          name: 'NoticeManage',
          path: '/NoticeManage',
          component: NoticeManage,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '通知管理'}
        },
        {
          name: 'NoticeDetail',
          path: '/NoticeDetail',
          component: NoticeDetail,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '通知详情'}
        },
        {
          name: 'NoticeCreate',
          path: '/NoticeCreate',
          component: NoticeCreate,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '新建通知'}
        },
        {
          name: 'NoticeEdit',
          path: '/NoticeEdit',
          component: NoticeEdit,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '通知编辑'}
        },
        {
          name: 'ColumnManage',
          path: '/ColumnManage',
          component: ColumnManage,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '栏目管理'}
        },
        {
          name: 'MemmberDetail',
          path: '/MemmberDetail',
          component: MemmberDetail,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '会员详情'}
        },
        {
          name: 'MusicLists',
          path: '/MusicLists',
          component: MusicLists,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '曲单管理'}
        },
        {
          name: 'PriceManage',
          path: '/PriceManage',
          component: PriceManage,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '定价管理'}
        },
        {
          name: 'PriceAuthorizeType',
          path: '/PriceAuthorizeType',
          component: PriceAuthorizeType,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '定价授权'}
        },
        {
          name: 'PriceDetail',
          path: '/PriceDetail',
          component: PriceDetail,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '价格详情'}
        },
        {
          name: 'OrderList',
          path: '/OrderList',
          component: OrderList,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '订单列表'}
        },
        {
          name: 'OrderDetail',
          path: '/OrderDetail',
          component: OrderDetail,
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '订单详情'}
        },
        {
          path: '/UserAuthList',
          component: UserAuthList,
          name: 'UserAuthList',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '授权列表'}
        },
        {
          path: '/UserAuthDetail',
          component: UserAuthDetail,
          name: 'UserAuthDetail',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '授权详情'}
        },
        {
          path: '/ArtistList',
          component: ArtistList,
          name: 'ArtistList',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '艺术家列表'}
        },
        {
          path: '/ArtistDetail',
          component: ArtistDetail,
          name: 'ArtistDetail',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '艺术家详情'}
        },
        {
          path: '/MassOperate',
          component: MassOperate,
          name: 'MassOperate',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '批量操作音乐'}
        },
        {
          path: '/ProjectDetailMass',
          component: ProjectDetailMass,
          name: 'ProjectDetailMass',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '批量操作项目'}
        },
        {
          path: '/MusicUploadList',
          component: MusicUploadList,
          name: 'MusicUploadList',
          meta: {title: 'SpeaklowMusic音乐管理后台', name: '上传音乐'}
        }
      ]
    }
  ]
})
