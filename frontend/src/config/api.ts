export const API_URL = "http://localhost:8080"

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/user/login`,
    register: `${API_URL}/api/user/register`,
    profile: `${API_URL}/api/user/me`,
    logout: `${API_URL}/api/user/logout`
  },
  category: {
    get: `${API_URL}/api/category`,
    add: `${API_URL}/api/category/add`,
    update: `${API_URL}/api/category/{id}`,
    delete: `${API_URL}/api/category/{id}`
  },
  product: {
    get: `${API_URL}/api/product`,
    getDetails: `${API_URL}/api/product/{id}`,
    add: `${API_URL}/api/product/add`,
    update: `${API_URL}/api/product/{id}`,
    delete: `${API_URL}/api/product/{id}`
  },
  cart: {
    get: `${API_URL}/api/cart`,
    add: `${API_URL}/api/cart/add/{id}`,
    remove: `${API_URL}/api/cart/remove/{id}`,
    clear: `${API_URL}/api/cart/clear`
  }
} as const
