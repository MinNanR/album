const localstorage = {
  /**
   * 设置缓存，没有过期时间
   */
  setStorage: function (key, value) {
    let obj = {
      data: value,
      expire: -1
    }
    uni.setStorageSync(key, JSON.stringify(obj))
  },

  /**
   * 设置缓存并设置缓存过期时间（单位：ms)
   */
  setStorageExpire: function (key, value, duration) {
    let current = new Date()
    let obj = {
      data: value,
      expire: current.getTime() + duration
    }
    uni.setStorageSync(key, JSON.stringify(obj))
  },

  /**
   * 获取缓存，获取到缓存则返回缓存值，不存在或过期则返回null
   */
  getStorage: function (key) {
    let objStr = uni.getStorageSync(key)
    if (objStr == null || objStr === '') {
      return null
    }
    let obj = JSON.parse(objStr)
    let expire = obj.expire
    let current = new Date()
    if (expire === -1) {
      return obj.data
    }
    else if (current.getTime() > expire) {
      uni.removeStorageSync(key)
      return null
    } else {
      return obj.data
    }
  },

  removeStorage: function (key) {
    uni.removeStorageSync(key)
  }
}

export default localstorage