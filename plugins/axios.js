export default function ({ $axios, env }, inject) {
  // 定義 baseURL，可以從環境變數獲取或使用默認值
  const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:10000'
    : 'your-production-url'

  const backendAxios = $axios.create({
    baseURL: baseURL,
    timeout: 5000, // 可選的超時設置
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 添加請求攔截器（可選）
  backendAxios.interceptors.request.use(config => {
    // 在發送請求之前做些什麼
    return config
  })

  // 添加響應攔截器（可選）
  backendAxios.interceptors.response.use(
    response => response,
    error => {
      // 處理錯誤
      return Promise.reject(error)
    }
  )

  inject('backendAxios', backendAxios)
}
