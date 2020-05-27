import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
    juniorFansListId: 0, // 粉丝下级列表id
    noticeTitle:localStorage.getItem('noticeTitle') ? localStorage.getItem('noticeTitle') :""
  },
  mutations: {
    USER_INFO(state, o) {
      state.userInfo = o
    },
    JUNIOR_FANS_LIST_ID(state, o) {
      state.juniorFansListId = o
    },
    NOTICE_TITLE(state,o){
      state.noticeTitle = o;
    }
  },
  actions: {
    changeUserInfo({
      commit
    }, o) {
      // 写缓存
      localStorage.setItem('userInfo', JSON.stringify(o))
      commit('USER_INFO', o)
    },
    setJuniorFansListId({
      commit
    }, o) {
      commit('JUNIOR_FANS_LIST_ID', o)
    },
    setNoticeTitle({
      commit
    }, o) {
      commit('NOTICE_TITLE', o)
    },
    // getStatusUserInfo({ commit,state }) {
    //   return new Promise(async resolve => {

    //     if(state.userInfo.stationType) {
    //       const res  = await getStationStatus();
          
    //         if(res.data.stationPrice != 'ok'){
    //           MessageBox.alert('本分站还未设置成本价，请联系管理进行设置!', '提示', {
    //             confirmButtonText: '确定',
    //             callback: action => {
    //               router.push('/substation/index')
    //             }
    //           });
              
    //           return false;
    //         }

    //         if(res.data.sellerPrice != 'ok'){

    //           MessageBox.alert('请先设置商家成本价! 点击确认跳转菜单 定价策略!', '提示', {
    //             confirmButtonText: '确定',
    //             callback: action => {
    //               router.push('/substation/index')
    //             }
    //           });
    //           return false;
    //         }

    //     }
    //   })
    // }
  },
  getters: {
    userInfo(state) {
      return state.userInfo
    },
    getJuniorFansListId(state) {
      return state.juniorFansListId
    },
    getNoticeTitle(state) {
      return state.noticeTitle
    },
  }
})
