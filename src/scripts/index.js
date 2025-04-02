import { fetchProducts, addProduct, deleteProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";
import { Cart } from "../classes/cart.js";
import { LocalStorage, CART_KEY } from "../utils/localstorage.js";
import { ProductFormBuilder } from "../builders/ProductFormBuilder.js";
import { Builder } from "../builders/builder.js";

document.addEventListener("DOMContentLoaded", loadProducts);
const modal = document.querySelector("#modal");

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
  renderProductCardEventListeners(allProducts);
}

const renderProductCardEventListeners = (allProducts = []) => {
  let addProductBtns = document.querySelectorAll(".add-to-cart-btn");
  addProductBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let product = allProducts.find((p) => p._id == btn.id.substring(btn.id.lastIndexOf("-") + 1));
      addToCart(product);
    });
  });
  let products = document.querySelectorAll(".product-card");
  products.forEach((product) => {
    product.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() !== "button") {
        let builder = new Builder();
        builder.buildProductCardInfo(allProducts.find((p) => p._id == product.id));
        let productInfo = builder.build();
        let modalContent = document.querySelector("#modalContent");
        modalContent.append(productInfo[0]);
        modal.showModal();
        let addToCartBtn = modalContent.querySelector(".add-to-cart-btn");
        addToCartBtn.addEventListener("click", () => {
          addToCart(allProducts.find((p) => p._id == product.id));
        });
      }
    })
  })
}

const addToCart = (product) => {
  cart.addItem(product);
  cart.updateCart();
  LocalStorage.saveToStorage(CART_KEY, product);
}

const manageProductsBtn = document.querySelector("#manageProductsBtn");
manageProductsBtn.addEventListener("click", () => {
  modal.showModal();
});

document.querySelector("#closeModal").addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("close", () => {
  document.querySelector("#modalContent").innerHTML = "";
});
