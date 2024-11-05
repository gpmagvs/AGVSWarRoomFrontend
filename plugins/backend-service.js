import BackendService from '@/services/backend'

export default function ({ $backendAxios }, inject) {
  const backendService = new BackendService($backendAxios)
  inject('backendService', backendService)
}
