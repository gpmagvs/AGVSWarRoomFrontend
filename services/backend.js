import axios from 'axios'
console.log('backend.js loaded. ');

const baseURL = process.env.NODE_ENV === 'production' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:5190'
console.log('baseURL', baseURL);
var _axios = axios.create({
  baseURL: baseURL
});

/**
 * Download fields info
 * @returns
 */
export async function DownloadFieldsInfo() {
  const res = await _axios.get('/api/FieldInfo/FieldsInfo');
  return res.data;
}

export async function FetchVersions() {
  const res = await _axios.get('/api/Version');
  return res.data;
}

export default _axios;

