const domainServer = import.meta.env.VITE_URL_SERVER_API;

export async function apisignUp(formInputs) {
  const response = await fetch(`${domainServer}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formInputs),
  });
  const data = await response.json();
  return data;
}

export async function apisignIn(formInputs) {
  const response = await fetch(`${domainServer}/signin`, {
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

export async function apiGetMe() {
  const response = await fetch(`${domainServer}/user-details`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function apiGetUsers() {
  const response = await fetch(`${domainServer}/all-user`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function apiUpdateUser(formInputs) {
  const response = await fetch(`${domainServer}/update-user`, {
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

export async function apiLogout() {
  const response = await fetch(`${domainServer}/userLogout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
