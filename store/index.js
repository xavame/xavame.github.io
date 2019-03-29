export const state = () => ({
  routeDepth: "1",
  routeTransitionDirection: "right"
});

export const mutations = {
  setRouteTransitionDirection(state, newRouteDepth) {
    newRouteDepth < state.routeDepth
      ? (state.routeTransitionDirection = "left")
      : (state.routeTransitionDirection = "right");
    state.routeDepth = newRouteDepth;
  }
};
