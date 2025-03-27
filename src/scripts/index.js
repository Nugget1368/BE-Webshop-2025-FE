import { fetchProducts, addProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";
import { Cart } from "../classes/cart.js";

document.addEventListener("DOMContentLoaded", loadProducts);
let cart = new Cart();
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
        //DELETE THIS
        productCard.id = product.id;
        productCard.querySelector(".add-to-cart-btn").id = product.id;
        let btn = productCard.querySelector(`.add-to-cart-btn`);
        btn.addEventListener("click", () => {
            // alert(`Adding ${product.name + btn.id} to cart\nFunctionality not implemented yet`);
            cart.addItem(product);
            let items = cart.getItems();
            let cartLink = document.querySelector("[data-cart]");
            cartLink.textContent = `Cart (${items.length})`;
            console.log(items);
            console.log(`Total price: ${cart.getTotal()}`);
          });
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

  // element.querySelector(".add-to-cart-btn").addEventListener("click", () => {
  //   alert(`Adding ${product.name} to cart\nFunctionality not implemented yet`);
  // });

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