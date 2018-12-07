// components/search/index.js
import { SearchModels } from "../../models/search"
const searchModels = new SearchModels();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    history: [],
    hot: [],
    search: false,
    listData: [],
    q: '',
    total: null,
    loading: false,
    loadingCenter: false,
    pageLoading: false
  },
  attached: function () {
    this.setData({
      history: searchModels.getHistory()
    })
    searchModels.getHot().then(res => {
      this.setData({
        hot: res.data.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    updatePage: function () {
      const start = this.data.listData.length;
      if (start < this.data.total && !this.data.pageLoading) {
        const q = this.data.q;
        let listData = this.data.listData;
        this.setData({
          pageLoading: true,
          loading: true
        })
        searchModels.getSearch(start, q).then(res => {
          this.setData({
            listData: listData.concat(res.data.books),
            q: q,
            pageLoading: false,
            loading: false
          })
        })
      }
    },
    onConfirm: function (event) {
      const q = event.detail.value || event.detail.text;
      this.setData({
        search: true,
        loadingCenter: true
      })
      searchModels.setHistory(q)
      searchModels.getSearch(0, q).then(res => {
        this.setData({
          listData: res.data.books,
          q: q,
          total: res.data.total,
          loadingCenter: false
        })

      })
    },
    onCancel: function () {
      this.triggerEvent('cancel')
    },
    onDelete: function () {
      this.setData({
        search: false,
        q: ''
      })
    }
  }
})