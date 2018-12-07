import { HTTP } from '../util/http-p'

class BookModels extends HTTP {
  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }
  getDetail(id) {
    return this.request({
      url: '/book/' + id + '/detail'
    })
  }
  getComment(id) {
    return this.request({
      url: '/book/' + id + '/short_comment'
    })
  }
  getLikeStatus(id) {
    return this.request({
      url: '/book/' + id + '/favor'
    })
  }
  postComment(book_id, content) {
    return this.request({
      method: 'POST',
      url: '/book/add/short_comment',
      data: {
        book_id,
        content
      }
    })
  }
  getBooksCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }
  getMyFavor() {
    return this.request({
      url: '/classic/favor'
    })
  }
}
export { BookModels }