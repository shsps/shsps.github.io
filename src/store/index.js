import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarId: null,
  },

  mutations: {
    setSidebarId(state, id) {
      state.sidebarId = id;
    },
  },

  actions: {
  },

  getters: {
  }
})

