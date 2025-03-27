import { fetchProducts, addProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";
import { Builder } from "../builders/builder.js";

document.addEventListener("DOMContentLoaded", loadProducts);
// Function to fetch and render products
async function loadProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "<p>Loading products...</p>"; // Temporary message while loading

  try {
    const products = await fetchProducts();
    productsContainer.innerHTML = ""; // Clear loading text

    if (products.length > 0) {
      let productBuilder = new Builder();
      for(let x = 0; x < products.length; x++){
        productBuilder.buildProductCard(products[x]);
        let productCards = productBuilder.build();
        productsContainer.append(productCards[x]);
      }
    } else {
      productsContainer.innerHTML = "<p>No products available.</p>";
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
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