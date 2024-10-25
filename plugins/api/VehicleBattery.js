export default (axios) => ({

  async getSettings(agvName) {
    var response = await axios.get(`/api/VehicleBatteryInfo/Settings?AgvName=${agvName}`);
    return response.data;
  },
  /**取得所有電池監控參數 */
  async getAllSettings() {
    var response = await axios.get(`/api/VehicleBatteryInfo/AllSettings`);
    return response.data;
  },
  async saveSettings(settings) {
    var response = await axios.post(`/api/VehicleBatteryInfo/SaveSettings`, settings);
    return response.data;
  },
});
