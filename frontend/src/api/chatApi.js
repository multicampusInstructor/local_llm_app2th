import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 60000,
})

function extractErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(', ')
    }

    if (typeof detail === 'string') {
      return detail
    }

    if (typeof detail === 'object' && detail !== null) {
      return JSON.stringify(detail)
    }

    return error.message
  }

  return error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
}

export async function getModels() {
  const response = await apiClient.get('/models')
  return response.data?.models || []
}

export async function sendChatMessage(payload) {
  try {
    const response = await apiClient.post('/chat', payload)
    return response.data
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}
