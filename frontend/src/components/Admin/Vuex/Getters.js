// This getter is a function which just returns the count
// With ES6 you can also write it as:
// export const getCount = state => state.count

export function getSiteNavVisible (state) {
  return state.siteNavVisible
}
