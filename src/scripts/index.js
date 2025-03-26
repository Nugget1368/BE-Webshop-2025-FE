import { fetchProducts, addProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";

document.addEventListener("DOMContentLoaded", loadProducts);
// Function to fetch and render products
async function loadProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "<p>Loading products...</p>"; // Temporary message while loading

  try {
    const products = await fetchProducts();
    productsContainer.innerHTML = ""; // Clear loading text

    if (products.length > 0) {
      products.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
      });
    } else {
      productsContainer.innerHTML = "<p>No products available.</p>";
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

// Function to create an individual product card
function createProductCard(product) {
  const element = document.createElement("div");
  element.className = "product-card";

  element.innerHTML = `
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button class="add-to-cart-btn">Add to Cart</button>
  `;

  element.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    alert(`Adding ${product.name} to cart\nFunctionality not implemented yet`);
  });

  return element;
}

let createProduct = document.querySelector("#createProduct");

createProduct.addEventListener("submit", (event) => {
  let nameValue = document.querySelector("form#createProduct input#name").value;
  let priceValue = Number.parseFloat(document.querySelector("form#createProduct input#price").value);
  let descrValue = document.querySelector("form#createProduct input#description").value;
  let stockValue = Number.parseInt(document.querySelector("form#createProduct input#stock").value);
  let imageValue = document.querySelector("form#createProduct input#imageUrl").value;

  
  let product = new Product(nameValue, priceValue, descrValue, stockValue, imageValue);
  console.log(product);

  addProduct("products", product);

  event.preventDefault();
});