import { config } from "../config.js";
const tips = {
  1: '错误',
  1005: '不正确的开发者key'
}
class HTTP {
  request({ url, method = "GET", data = {} }) {
    return new Promise((resolve, reject) => {
      this._request({ url, resolve, reject, method, data })
    })
  }
  _request({ url, resolve, reject, method, data }) {
    wx.request({
      url: `${config.api_base_url}${url}`,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res)
        } else {
          reject()
          this._show_error(res.data.error_code)
        }

      },
      fail: () => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(type) {
    wx.showToast({
      title: tips[type],
      icon: "none"
    })
  }

}
export { HTTP }