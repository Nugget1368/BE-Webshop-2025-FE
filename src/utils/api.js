export function getBaseUrl() {
  // Get the group number from the hostname to determine the base URL for BE
  const regex = /webshop\-2025\-(g[0-9]{1,2})\-fe/g;
  const href = window.location.href;
  const match = regex.exec(href);
  console.log(match);
  if (match) {
    const group = match[1];
    return `https://webshop-2025-be-g4.vercel.app/`;
  }
  return "https://webshop-2025-be-g4.vercel.app/";
  // return "http://localhost:3000/";
}

export async function fetchProducts(endpoint = "api/products") {
  //! DONT USE THIS IN PRODUCTION
  const url = `${getBaseUrl()}${endpoint}`;
  // const url = `https://webshop-2025-be-g4.vercel.app/${endpoint}`;
  const response = await axios.get(url);
  console.log(response);
  if (response.status === 200) {
    return response.data;
  }
  return [];
}

export async function addProduct(endpoint = "api/products", product) {
  const url = `${getBaseUrl()}${endpoint}`;
  const response = await axios.post(url, product);
  console.log(response);
  if (response.status === 201) {
    return response.data;
  }
  return [];
}
