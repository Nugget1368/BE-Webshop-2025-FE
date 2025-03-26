export function getBaseUrl() {
  // Get the group number from the hostname to determine the base URL for BE
  const regex = /webshop\-2025\-(g[0-9]{1,2})\-fe/g;
  const href = window.location.href;
  const match = regex.exec(href);
  if (match) {
    return `https://webshop-2025-be-g4.vercel.app/api/`;
  }
  // return "https://webshop-2025-be-g4.vercel.app/";
  return "http://localhost:5001/";
}

export async function fetchProducts(endpoint = "products") {
  //! DONT USE THIS IN PRODUCTION
  const url = `${getBaseUrl()}${endpoint}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data;
  }
  return [];
}

export async function addProduct(endpoint = "products", product) {
  const url = `${getBaseUrl()}${endpoint}`;
  const response = await axios.post(url, product);
  console.log(response);
  if (response.status === 201) {
    return response.data;
  }
  return [];
}
