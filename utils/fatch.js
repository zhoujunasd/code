const baseUrl = "https://m.yaojunrong.com"

const fatch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync("token")
      let header = {
        'content-type': 'application/json' // 默认值
      }
      if(token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res) {
          // console.log(res)
          if (res.header.Token || res.header.token){
            wx.setStorageSync("token", res.header.Token || res.header.token) 
          }
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, 'get', data)
  },
  post(url, data) {
    return this.http(url, 'POST', data)
  }
}

const login = () => {
  wx.login({
    success(res) {
      fatch.post('/login', {
        code: res.code,
        appid: "wx278a074f6d5caad3",
        secret:"d5474595c9e5ea5f9439c77ae4c8e405",
      }).then(res=>{
        console.log("登陆成功")
      }).catch(err=>{
        console.log("登陆失败")
      })
    }
  })
}

const transformtime = function(t) {
  var date = new Date(t);
  var updatetime = date.getTime();
  let time = new Date().getTime() - updatetime
  let arr = []
  let str = 0;
  let str2 = "天"
  arr.push(Math.floor(time / (1000 * 3600 * 24 * 365)))
  arr.push(Math.floor(time / (1000 * 3600 * 24 * 30)))
  arr.push(Math.floor(time / (1000 * 3600 * 24)))
  arr.push(Math.floor(time / (1000 * 3600)))
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      str = i;
      switch (i) {
        case 0:
          str2 = "年"
          break
        case 1:
          str2 = "月"
          break
        case 2:
          str2 = "天"
          break
        case 3:
          str2 = "小时"
          break
        default:
          str2 = "刚刚"
          break
      }
      break
    }
  }
  return arr[str] + str2 + "前"
}

export {
  fatch,
  transformtime,
  login
}