import store from '../index'
import { getInfo } from '@/api/user'

function getAsyncRoutes(userRoles, routes) {
  const res = []
  routes.forEach(item => {
    if (userRoles.includes(item.meta.roles[0])) {
      if (item.children) {
        item.children = getAsyncRoutes(userRoles, item.children)
      }
      res.push(item)
    }
  })
  return res
}
const state = {
  addAsyncRouter: []
}

const mutations = {
  ADD_ASYNC_ROUTES(state, routes) {
    state.addAsyncRouter.push(...routes)
  },
  CLEAR_ROUTES(state) {
    state.addAsyncRouter.splice(0, state.addAsyncRouter.length)
  }
}

const actions = {
  async generateRoutes({ state, commit }, asyncRoutes) {
    const result = await getInfo(store.getters.token)
    const { roles } = result.data
    const asyncRoutesRes = getAsyncRoutes(roles, asyncRoutes)
    commit('ADD_ASYNC_ROUTES', asyncRoutesRes)
  },
  clearRoutes({ commit }) {
    commit('CLEAR_ROUTES')
  }
}

export default {
  state,
  mutations,
  actions
}
