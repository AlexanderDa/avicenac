import { VuexModule, Action, Mutation, Module } from 'vuex-module-decorators'
import RoleModel from '@/models/RoleModel'
import RoleService from '@/services/RoleService'

@Module
export default class RoleStore extends VuexModule {
  private list: RoleModel[] = []

  @Action({ commit: 'LOAD_ROLES' })
  async loadRoles () {
    const service: RoleService = new RoleService()
    let list: RoleModel[] = []
    try {
      if (!(this.list.length > 0)) {
        list = await service.find()
      } else {
        list = this.list
      }
    } catch (err) {
    }
    return list
  }

  @Mutation
  LOAD_ROLES (roles: RoleModel[]) {
    this.list = roles
  }
}
