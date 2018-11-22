import { HTTP } from '../util/http.js'

class ClassisModel extends HTTP {
  getClassicData(callback) {
    this.request({
      url: "/classic/latest",
      method: "GET",
      success: (res) => {
        let key = this._getKey(res.data.index)
        wx.setStorageSync(key, res)
        callback(res)
      }
    })
  }
  getPageData(index, direction, callback) {
    const keyIndex = direction === 'previous' ? index - 1 : index + 1;
    let key = this._getKey(keyIndex)
    let storage = wx.getStorageSync(key);
    if (!storage) {
      this.request({
        url: `/classic/${index}/${direction}`,
        method: "GET",
        success: (res) => {
          let key = this._getKey(res.data.index)
          wx.setStorageSync(key, res)
          callback(res)
        }
      })
    } else {
      callback(storage)
    }
  }
  _getKey(key) {
    return `classis${key}`
  }
}
export { ClassisModel }