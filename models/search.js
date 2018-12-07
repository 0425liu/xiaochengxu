import { HTTP } from '../util/http-p'
class SearchModels extends HTTP {
  key = 'q'
  max = 5
  getHistory() {
    const history = wx.getStorageSync(this.key);
    return history;
  }
  setHistory(keywords) {
    let history = this.getHistory() || [];
    if (!history.includes(keywords)) {
      if (history.length >= this.max) {
        history.pop()
      }
      history.unshift(keywords)
      wx.setStorageSync(this.key, history)
    }
  }
  getHot() {
    return this.request({
      url: "/book/hot_keyword"
    })
  }
  getSearch(start, q) {
    return this.request({
      url: '/book/search',
      data: {
        start,
        q,
        summary: 1
      }
    })
  }
}
export { SearchModels }