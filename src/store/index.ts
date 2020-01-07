import Vue from 'vue'
import Vuex from 'vuex'
import RoleStore from '@/store/RolesStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    RoleStore
  }
})

export default store
