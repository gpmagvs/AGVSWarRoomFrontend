
export default class BackendService {
  constructor($axios) {
    this.$axios = $axios
  }

  async DownloadFieldsInfo() {
    try {
      const response = await this.$axios.$get('/api/fields-info') // 替換為你的實際 API 端點
      return response
    } catch (error) {
      console.error('Error in DownloadFieldsInfo:', error)
      throw error
    }
  }

  async FetchVersions() {
    const res = await this.$axios.get('/api/Version');
    return res.data;
  }

}
