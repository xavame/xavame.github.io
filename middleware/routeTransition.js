export default function({ store, route, redirect }) {
  const routeDepth = route.meta.map(meta => {
    if (meta.depth && typeof meta.depth !== "undefined") return meta.depth;
    return 0;
  });

  // send depth to the store
  store.commit("setRouteTransitionDirection", routeDepth);
}
