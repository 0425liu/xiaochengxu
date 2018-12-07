import { HTTP } from '../util/http.js'

class LikeModel extends HTTP {
  likeStatus({ status, art_id, type }) {
    let url = status ? "/like" : "/like/cancel"
    this.request({
      url,
      method: "POST",
      data: {
        art_id,
        type
      }
    })
  }
  getLikeStatus(type, id, callback) {
    let url = `/classic/${type}/${id}/favor`
    this.request({
      url,
      method: "GET",
      success: (res) => {
        callback(res.data)
      }
    })
  }

}
export { LikeModel }