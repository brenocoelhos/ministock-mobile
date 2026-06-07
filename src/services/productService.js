import api from "./api";

const PAGE_SIZE = 20;

export async function listProducts({ page = 0, search = "", category = "" } = {}) {
  const params = {
    limit: PAGE_SIZE,
    skip: page * PAGE_SIZE
  };

  if (search.trim()) {
    params.q = search.trim();
  }

  const endpoint = search.trim()
    ? "/products/search"
    : category
      ? `/products/category/${category}`
      : "/products";

  try {
    const response = await api.get(endpoint, { params });
    const products = response.data.products || [];
    const filteredProducts = search.trim() && category
      ? products.filter((product) => product.category === category)
      : products;

    return {
      products: filteredProducts,
      total: response.data.total || 0,
      skip: response.data.skip || 0,
      limit: response.data.limit || PAGE_SIZE
    };
  } catch (error) {
    throw error;
  } finally {
  }
}

export async function listCategories() {
  try {
    const response = await api.get("/products/categories");
    return (response.data || []).map((category) => {
      if (typeof category === "string") {
        return { slug: category, name: category };
      }

      return {
        slug: category.slug,
        name: category.name || category.slug
      };
    });
  } catch (error) {
    throw error;
  } finally {
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
  }
}

export async function createProduct(payload) {
  try {
    const response = await api.post("/products/add", payload);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
  }
}

export async function updateProduct(id, payload) {
  try {
    const response = await api.put(`/products/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
  }
}

export async function deleteProduct(id) {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
  }
}

export { PAGE_SIZE };
