//格式化金额
export function toThousands(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

// 本地存储
export const session = {
  set: function (key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value))
  },
  get: function (key) {
    if (!key) return
    return JSON.parse(sessionStorage.getItem(key))
  }
}