import Vue from 'vue'
import Vuex from 'vuex'
import backendApi from './../api/backendApi';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "username": null,
    "isLoading": false
  },
  mutations: {
    setUserName: (state, payload) => {
      state.username = payload
    },
    setLoading: (state, payload) => {
      state.isLoading = payload
    }
  },
  actions: {
    getUserDetails: (context) => {
      backendApi.get("/api/profile")
          .then(({ data }) => {
            if (data.logged) {
              context.commit('setUserName', data.username)
            }
          })
          .catch(() => alert("Something went wrong with auth."))
    }
  },
  modules: {
  },
  getters: {
    getUserName: state => state.username,
    isLoading: state => state.isLoading
  }
})
