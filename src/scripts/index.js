import { fetchProducts, addProduct, deleteProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";
import { ProductFormBuilder } from "../builders/builders.js";
import { Builder } from "../builders/builder.js";

document.addEventListener("DOMContentLoaded", loadProducts);
// Function to fetch and render products
async function loadProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "<p>Loading products...</p>";

  try {
    const products = await fetchProducts();
    productsContainer.innerHTML = "";

    if (products.length > 0) {
      let productBuilder = new Builder();
      for (let x = 0; x < products.length; x++) {
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

const manageProductsBtn = document.querySelector("#manageProductsBtn");
const modal = document.querySelector("#modal");

manageProductsBtn.addEventListener("click", () => {
  modal.showModal();
});

document.querySelector("#closeModal").addEventListener("click", () => {
  modal.close();
});
