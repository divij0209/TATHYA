import axios from 'axios'

const BACKEND_BASE_URL = import.meta.env.VITE_CORE_BASE_URL || 'http://localhost:8000'
const EXTRACT_BASE_URL = import.meta.env.VITE_EXTRACT_BASE_URL || 'http://localhost:8001'

export const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: { 'Accept': 'application/json' }
})

export const extractionApi = axios.create({
  baseURL: EXTRACT_BASE_URL,
  headers: { 'Accept': 'application/json' }
})

export const endpoints = {
  uploadSet: '/api/v1/documents/upload_set',
  extract: '/api/extract'
}


