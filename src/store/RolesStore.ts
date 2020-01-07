import { StoreOptions } from 'vuex'
import RoleModel from '@/models/RoleModel'
import RoleService from '@/services/RoleService'

const RoleStore: StoreOptions<{ list: RoleModel[] }> = {
  state: {
    list: []
  },
  actions: {
    async loadRoles ({ state, commit }) {
      const service: RoleService = new RoleService()
      if (!(state.list.length > 0)) {
        await service.find()
          .then((list: RoleModel[]) => {
            commit('LOAD_ROLES', list)
          })
      }
    }
  },
  mutations: {
    LOAD_ROLES (state, roles: RoleModel[]) {
      state.list = roles
    }
  }
}

export default RoleStore
