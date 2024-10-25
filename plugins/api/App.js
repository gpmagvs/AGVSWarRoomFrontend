export default (axios) => ({
  /**取得場域列表資訊 */
  async getFields() {
    console.log(axios)
    var response = await axios.get(`/api/App/Fields`);
    return response.data;
  },
  async queryBatAlarms(option) {
    var response = await axios.post('/api/App/QueryBatAlarm', option)
    return response.data
  },
  async queryChargerAlarms(option) {
    var response = await axios.post('/api/App/QueryChargerAlarm', option)
    return response.data
  },
  /**用戶登入 */
  async userLogin(user) {
    var response = await axios.post('/api/User/Login', user)
    return response.data;
  },
  /**清除異常 */
  async ClearAlarms() {
    var response = await axios.post('/api/App/ClearAlarms')
    return response.data;
  },
  /**取得充電站選項 */
  async GetChargers() {
    var response = await axios.get('/api/App/GetChargers')
    return response.data;
  }
});
