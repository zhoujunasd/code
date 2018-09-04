const baseUrl = "https://m.yaojunrong.com"

const fatch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url,data) {
    return this.http(url, 'get', data)
  }
}

exports.fatch = fatch