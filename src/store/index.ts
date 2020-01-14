import Vue from 'vue'
import Vuex from 'vuex'
import RoleStore from '@/store/RolesStore'
import ConstStore from '@/store/ConstStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ConstStore,
    RoleStore
  }
})

export default store
