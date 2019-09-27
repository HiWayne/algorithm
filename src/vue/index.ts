function observe (obj: any): any {
  if (obj.__ob__) {
    return obj
  } else {
    return new Proxy(obj, {
      get (target, key) {
        if (typeof target[key] === 'object' && !target.__ob__) {
          target[key] = observe(target[key])
          target.__ob__ = true
        }
        return target[key]
      },
      set (target, key, val) {
        target[key] = val
      }
    })
  }
}
