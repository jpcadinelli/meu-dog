const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })
  } catch {
    throw new ApiError(0, 'Não foi possível conectar à API. Verifique se o backend está em execução.')
  }

  if (!response.ok) {
    const messages = {
      400: 'Os dados enviados são inválidos. Revise os campos destacados.',
      404: 'O animal solicitado não foi encontrado.',
      500: 'A API encontrou um erro interno. Tente novamente.',
    }
    throw new ApiError(response.status, messages[response.status] || `A API respondeu com erro ${response.status}.`)
  }

  if (response.status === 204) return null
  return response.json()
}

export function getAnimals({ page = 0, size = 10, sort = 'dataCadastro', direction = 'desc' } = {}) {
  const params = new URLSearchParams({ page, size, sort: `${sort},${direction}` })
  return request(`/api/animais?${params.toString()}`)
}

export function getAnimal(id) {
  return request(`/api/animais/${id}`)
}

export function createAnimal(animal) {
  return request('/api/animais', {
    method: 'POST',
    body: JSON.stringify(animal),
  })
}

export function updateAnimal(id, animal) {
  return request(`/api/animais/${id}`, {
    method: 'PUT',
    body: JSON.stringify(animal),
  })
}

export function deleteAnimal(id) {
  return request(`/api/animais/${id}`, { method: 'DELETE' })
}
