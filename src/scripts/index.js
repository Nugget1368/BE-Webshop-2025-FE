import { fetchProducts, addProduct, deleteProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";
import { ProductFormBuilder } from "../builders/builders.js";

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
  element.dataset.productId = product.id;

  element.innerHTML = `
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <div class="product-buttons">
    <button class="add-to-cart-btn">Add to Cart</button>
    <button class="edit-product-btn">Edit</button>
    <button class="delete-product-btn">Delete</button>
    </div>
  `;

  element.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    alert(`Adding ${product.name} to cart\nFunctionality not implemented yet`);
  });

  return element;
}

//Skapa knapp för modal

const manageProductsBtn = document.querySelector("#manageProductsBtn");
const modal = document.querySelector("#modal");

manageProductsBtn.addEventListener("click", () => {
  modal.showModal();
});

document.querySelector("#closeModal").addEventListener("click", () => {
  modal.close();
});
