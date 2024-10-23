const domainServer = import.meta.env.VITE_URL_SERVER_API;

export async function apiAddCartProduct(productId) {
  const response = await fetch(`${domainServer}/addtocart`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productId),
  });
  const data = await response.json();
  return data;
}

export async function apiCountAddCartProduct() {
  const response = await fetch(`${domainServer}/countAddToCartProduct`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function apiViewProductCart() {
  const response = await fetch(`${domainServer}/view-card-product`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function apiUpdateCartProduct(quantity) {
  const response = await fetch(`${domainServer}/update-cart-product`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quantity),
  });
  const data = await response.json();
  return data;
}

export async function apiDeleteCartProduc(id) {
  const response = await fetch(`${domainServer}/delete-cart-product`, {
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