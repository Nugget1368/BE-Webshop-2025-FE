import { addProduct, deleteProduct } from "../utils/api.js";
import { Product } from "../classes/product.js";

export class ProductFormBuilder {
  constructor(targetSelector) {
    this.targetElement = document.querySelector(targetSelector);
    this.form = document.createElement("form");
    this.form.id = "createProduct";

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }
  addTextField(id, label, required = true) {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", id);
    labelElement.textContent = label;

    const input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.name = id;
    if (required) {
      input.required = true;
    }

    this.form.append(labelElement);
    this.form.append(input);

    return this;
  }

  addNumberField(id, label, required = true) {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", id);
    labelElement.textContent = label;

    const input = document.createElement("input");
    input.type = "number";
    input.id = id;
    input.name = id;
    if (required) {
      input.required = true;
    }

    this.form.append(labelElement);
    this.form.append(input);

    return this;
  }

  addButton(id, text, type = "submit") {
    const button = document.createElement("button");
    button.id = id;
    button.type = type;
    button.textContent = text;

    this.form.append(button);

    return this;
  }

  handleSubmit() {
    let nameValue = document.querySelector("form#createProduct input#name").value;
    let priceValue = Number.parseFloat(document.querySelector("form#createProduct input#price").value);
    let descrValue = document.querySelector("form#createProduct input#description").value;
    let stockValue = Number.parseInt(document.querySelector("form#createProduct input#stock").value);
    let imageValue = document.querySelector("form#createProduct input#imageUrl").value;

    let product = new Product(nameValue, priceValue, descrValue, stockValue, imageValue);
    console.log(product);

    addProduct("products", product);

    event.preventDefault();
  }

  render() {
    if (this.targetElement) {
      this.targetElement.append(this.form);
    } else {
      console.error("Target element not found");
    }
  }
}

let addProductBtn = document.querySelector("#manageProductsBtn");

addProductBtn.addEventListener("click", () => {
  modalContent.innerHTML = "";
  // Skapa och konfigurera formulärbyggaren
  const productForm = new ProductFormBuilder("#modalContent");

  // Bygg formuläret med metoder från builder-klassen
  productForm
    .addTextField("name", "Name:")
    .addNumberField("price", "Price:")
    .addTextField("description", "Description:")
    .addNumberField("stock", "Stock:")
    .addTextField("imageUrl", "Image:")
    .addButton("createProductBtn", "Lägg till produkt")
    .render();
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete-product-btn")) {
      const productCard = event.target.closest(".product-card");
      console.log(productCard);
      const productName = productCard.querySelector("h3").textContent;
      console.log(productName);
      const productId = productCard.id;
      console.log(productId);

      const modalContent = document.querySelector("#modalContent");
      const modal = document.querySelector("#modal");

      // Rensa tidigare innehåll
      modalContent.innerHTML = "";

      // Skapa bekräftelseinnehåll
      const confirmationDiv = document.createElement("div");
      confirmationDiv.className = "delete-confirmation";
      confirmationDiv.innerHTML = `
          <h2>Radera produkt</h2>
          <p>Är du säker att du vill radera produkten "${productName}"?</p>
          <div class="confirmation-buttons">
            <button id="cancelDeleteBtn">Nej, avbryt</button>
            <button id="confirmDeleteBtn">Ja, radera</button>
          </div>
        `;

      modalContent.appendChild(confirmationDiv);

      // Lägg till event listeners för knapparna
      document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
        modal.close();
      });

      document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
        deleteProduct("products", productId)
          .then(() => {
            console.log("Produkt borttagen!");
            modal.close();
            location.reload(); // Ladda om sidan för att visa ändringarna
          })
          .catch((error) => {
            console.error("Fel vid borttagning:", error);
            alert("Ett fel uppstod när produkten skulle tas bort");
          });
      });

      // Visa modalen
      modal.showModal();
    }
  });
});
