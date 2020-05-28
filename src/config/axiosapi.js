import axi from '@/config/axi'

export default {
  login (data) {
    return axi().post('/ops/user/login/', data)
  },
  loginout () {
    return axi().get('/ops/user/logout/')
  },
  datapanel () {
    return axi().get('/ops/data/panel/')
  },
  user () {
    return axi().get('/ops/user/')
  },
  telcode () {
    return axi().get('/ops/tel_code/')
  },
  userprofile () {
    return axi().get('/ops/user/profile/')
  },
  useradd (data) {
    return axi().post('/ops/user/add/', data)
  },
  musiclist () {
    return axi().get('/ops/project')
  },
  verifycode (data) {
    return axi().post('/ops/verify_code/', data)
  },
  resetpassword (data) {
    return axi().post('/ops/user/reset_password/', data)
  },
  applyforproject () {
    return axi().get('/ops/apply_for_vip/')
  },
  addlabel (data) {
    return axi().post('/ops/label/', data)
  },
  getlabel () {
    return axi().get('/ops/label/?ordering=-created_at&page_size=12')
  },
  album () {
    return axi().get('/ops/album/')
  },
  albumsearch (t) {
    return axi().get('/ops/album/?search=' + t)
  },
  addalbum (data) {
    return axi().post('/ops/album/', data)
  },
  labelsearch () {
    return axi().get('/ops/label_search/')
  },
  addmusic (data) {
    return axi().post('/ops/music/', data)
  },
  musiclistmusic () {
    return axi().get('/ops/music/')
  },
  musiccategory () {
    return axi().get('/ops/music_category/')
  },
  musicsearch () {
    return axi().get('/ops/music_search/')
  },
  musicsearchalb (x) {
    return axi().get('/ops/music_search/?search=' + x)
  },
  avatarupload (data) {
    return axi().post('/ops/upload/', data)
  },
  playlist () {
    return axi().get('/ops/playlist/')
  },
  addplaylist (data) {
    return axi().post('/ops/playlist/', data)
  },
  vip () {
    return axi().get('/ops/vip/')
  },
  addvip (data) {
    return axi().post('/ops/vip/', data)
  },
  getcolumn () {
    return axi().get('/ops/column')
  },
  addcolumn (data) {
    return axi().post('/ops/column', data)
  },
  message () {
    return axi().get('/ops/message?ordering=-updated_at')
  },
  addmessage (data) {
    return axi().post('/ops/message', data)
  },
  columnsearch () {
    return axi().get('/ops/column_search')
  },
  panel () {
    return axi().get('/ops/data/panel')
  },
  priceitem () {
    return axi().get('/ops/price_item/')
  },
  price (d) {
    return axi().post('/ops/price/', d)
  },
  pricesearch (d) {
    return axi().get('/ops/price_search/?search=' + d)
  },
  pricel () {
    return axi().get('/ops/price/?ordering=-created_at')
  },
  priceitemadd (d) {
    return axi().post('/ops/price_item/', d)
  },
  priceitemlist () {
    return axi().get('/ops/price_item/?ordering=-created_at')
  },
  orderlist () {
    return axi().get('/ops/order/')
  },
  userauthlist () {
    return axi().get('ops/certificate')
  },
  musician () {
    return axi().get('/ops/musician/')
  },
  musicianadd (x) {
    return axi().post('/ops/musician/', x)
  },
  musicansearch (t) {
    return axi().get(' /ops/musician_search/?search=' + t)
  },
  playlistsearch (x) {
    return axi().get('/ops/playlist_search/?search=' + x)
  },
  massdel (d) {
    return axi().post('/ops/music/batch_destroy/', {'uuids': d})
  },
  massonline (d) {
    return axi().post('/ops/music/batch_online/', {'uuids': d})
  },
  massoffline (d) {
    return axi().post('/ops/music/batch_offline/', {'uuids': d})
  }
}
