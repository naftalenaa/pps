const BASE_URL = 'http://localhost:3001'

export const api = {
  // Search products
  searchProducts: async (query) => {
    const response = await fetch(`${BASE_URL}/food_packages/search?q=${query}`)
    return response.json()
  },

  // Filter products
  filterProducts: async (category) => {
    const response = await fetch(`${BASE_URL}/food_packages/filter?category=${category}`)
    return response.json()
  },

  // Sort products
  sortProducts: async (sortBy) => {
    const response = await fetch(`${BASE_URL}/food_packages/sorting?sort=${sortBy}`)
    return response.json()
  },

  // Get all products
  getProducts: async ({ keyword, category_id, min_price, max_price, sort_by, order }) => {
      // Build the query parameters
    const queryParams = new URLSearchParams();

    if (keyword) queryParams.append('keyword', keyword);
    if (category_id) queryParams.append('category_id', category_id);
    if (min_price) queryParams.append('min_price', min_price);
    if (max_price) queryParams.append('max_price', max_price);
    if (sort_by) queryParams.append('sort_by', sort_by);
    if (order) queryParams.append('order', order);

    // Construct the full URL with query parameters
    const url = `${BASE_URL}/food_packages?${queryParams.toString()}`;

    // Fetch the data from the API
    const response = await fetch(url);
    return response.json();

  }, //merge agar bisa berfungsi secara bersamaan

  // Create product
  createProduct: async (data) => {
    const response = await fetch(`${BASE_URL}/food_packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Update product
  updateProduct: async (id, data) => {
    const response = await fetch(`${BASE_URL}/food_packages/${id}:product`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/food_packages/${id}:product`, {
      method: 'DELETE',
    })
    return response.json()
  },

  // Get categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/categories`)
    return response.json()
  },
}

