import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      routeDepth: '1',
      routeTransitionDirection: 'right'
    },
    mutations: {
      setRouteTransitionDirection(state, newRouteDepth) {
        newRouteDepth < state.routeDepth ? state.routeTransitionDirection = 'left' : state.routeTransitionDirection = 'right'
        state.routeDepth = newRouteDepth
      }
    }
  })
}

export default createStore