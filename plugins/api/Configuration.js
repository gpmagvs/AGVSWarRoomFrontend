export default (axios) => ({

  async SaveChargerConfig(chargersOptions) {
    var response = await axios.post(`/api/Configuration/SaveChargerConfig`, chargersOptions);
    return response.data;
  },
});
