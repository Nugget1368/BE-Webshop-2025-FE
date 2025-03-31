export class Builder {
  constructor() {
    this.resultArr = [];
  }

  build() {
    return this.resultArr;
  }

  buildProductCardInfo(product) {
    let image = document.createElement("img");
    image.src = product.imageUrl;
    let name = document.createElement("h3");
    name.textContent = product.name;
    let price = document.createElement("p");
    price.textContent = product.price;
    let description = document.createElement("p");
    description.textContent = product.description;
    let info = document.createElement("article");
    info.classList.add("product-card");
    info.id = product.id ? product.id : "missing-id";
    let button = this.buildAddToCartBtn(info.id);
    info.append(name, price, description, image);
    button.forEach((btn) => {
      info.append(btn);
    });
    this.resultArr.push(info);
  }

  buildProductCard(product) {
    const element = document.createElement("article");
    element.className = "product-card";
    element.id = product.id ? product.id : "missing-id";
    element.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
      `;
    let button = this.buildAddToCartBtn(element.id);
    button.forEach((btn) => {
      element.append(btn);
    });

    this.resultArr.push(element);
  }

  buildAddToCartBtn(id = "") {
    let button = document.createElement("button");
    let editButton = document.createElement("button");
    editButton.classList.add("edit-product-btn");
    editButton.textContent = "Edit";
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-product-btn");
    deleteButton.textContent = "Delete";
    button.textContent = "Add to cart";
    button.classList.add("add-to-cart-btn");
    button.id = `add-to-cart-${id}` || `add-to-cart-id`;
    let array = [button, editButton, deleteButton];
    return array;
  }
}
