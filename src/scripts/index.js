import { fetchProducts, addProduct, deleteProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";
import { Cart } from "../classes/cart.js";
import { LocalStorage, CART_KEY } from "../utils/localstorage.js";
import { ProductFormBuilder } from "../builders/builders.js";
import { Builder } from "../builders/builder.js";

document.addEventListener("DOMContentLoaded", loadProducts);
let cart = {};
if (LocalStorage.getStorageAsJSON(CART_KEY)) {
  let items = LocalStorage.getStorageAsJSON(CART_KEY);
  cart = new Cart(items);
}
else {
  cart = new Cart();
}
cart.updateCart();
let allProducts = [];
// Function to fetch and render products
async function loadProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "<p>Loading products...</p>";

  try {
    const products = await fetchProducts();
    allProducts = products;
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
  let addProductBtns = document.querySelectorAll(".add-to-cart-btn");
  addProductBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn);
      //Hittar inte id:et, söker på add-to-cart-{id}, behöver söka på bara {id}-nummer
      let product = allProducts.find((p) => p.id == btn.id);
      console.log(product);
      addToCart(product);
    });
  });
}

const addToCart = (product) => {
  cart.addItem(product);
  cart.updateCart();
  LocalStorage.saveToStorage(CART_KEY, product);
}

const manageProductsBtn = document.querySelector("#manageProductsBtn");
const modal = document.querySelector("#modal");
manageProductsBtn.addEventListener("click", () => {
  modal.showModal();
});

document.querySelector("#closeModal").addEventListener("click", () => {
  modal.close();
});
