import assign from "../utils/assign"
import warning from "../utils/warning"

function Provider(store) {
  checkStoreShape(store)
  return function(appConfig) {
    return assign({}, appConfig, { store })
  }
}

function checkStoreShape(store) {
  const missingMethods = ["subscribe", "dispatch", "getState"].filter(
    m => !store.hasOwnProperty(m)
  )

  if (missingMethods.length > 0) {
    warning(
      `Store 对象缺少这些方法:
        ${missingMethods.join(", ")}`
    )
  }
}

export default Provider
