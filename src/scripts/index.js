import { fetchProducts, addProduct, deleteProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";
import { Cart } from "../classes/cart.js";
import { LocalStorage, CART_KEY } from "../utils/localstorage.js";
import { ProductFormBuilder } from "../builders/ProductFormBuilder.js";
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
      let product = allProducts.find((p) => p._id == btn.id.substring(btn.id.lastIndexOf("-") + 1));
      addToCart(product);
    });
  });
}

const openCart = (parentElement, userCart) => {
  let builder = new Builder();
  builder.buildCartInfo(userCart);
  let child = builder.build();
  child.forEach((c) => parentElement.append(c));
}

const addToCart = (product) => {
  cart.addItem(product);
  cart.updateCart();
  LocalStorage.saveToStorage(CART_KEY, product);
}

const cartBtn = document.querySelector("[data-cart]");
const closeCartBtn = document.querySelector("[data-close-bar]");
closeCartBtn.addEventListener("click", () => {
  let sidebar = document.querySelector("dialog[data-sidebar]");
  sidebar.close();
});
cartBtn.addEventListener("click", () => {
  let sidebar = document.querySelector("dialog[data-sidebar]");
  let section = sidebar.querySelector("dialog[data-sidebar] section");
  openCart(section, cart);
  sidebar.showModal();
  sidebar.addEventListener("close", () => {
    section.innerHTML = "";
  });
});

const manageProductsBtn = document.querySelector("#manageProductsBtn");
const modal = document.querySelector("#modal");
manageProductsBtn.addEventListener("click", () => {
  modal.showModal();
});

document.querySelector("#closeModal").addEventListener("click", () => {
  modal.close();
});
