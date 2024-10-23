const domainServer = import.meta.env.VITE_URL_SERVER_API;

export async function apiAddProduct(formInputs) {
  const response = await fetch(`${domainServer}/upload-product`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formInputs),
  });
  const data = await response.json();
  return data;
}

export async function apiGetProducts() {
  const response = await fetch(`${domainServer}/get-product`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function apiGetProductCategories() {
  const response = await fetch(`${domainServer}/get-categoryProduct`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function apiUpdateProduct(formInputs) {
  const response = await fetch(`${domainServer}/update-product`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formInputs),
  });
  const data = await response.json();
  return data;
}

export async function apiCategoryWiseProduct(category) {
  const response = await fetch(`${domainServer}/category-product`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category
    }),
  });
  const data = await response.json();
  return data;
}

export async function apiGetProductDetail(id) {
  const response = await fetch(`${domainServer}/product-details`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  const data = await response.json();
  return data;
}

export async function apiSearchProduct(query) {
  // console.log(`${domainServer}/search${query}`);
  const response = await fetch(`${domainServer}/search${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function apiFilterProduct(listCategories) {
  const response = await fetch(`${domainServer}/filter-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listCategories),
  });
  const data = await response.json();
  return data;
}