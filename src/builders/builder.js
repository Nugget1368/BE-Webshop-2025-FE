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
        button.addEventListener("click", () => {
            alert(`Adding ${product.name} to cart\nFunctionality not implemented yet`);
          });

        info.append(name, price, description, image, button);
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
      element.append(button);
    
      button.addEventListener("click", () => {
        alert(`Adding ${product.name} to cart\nFunctionality not implemented yet`);
      });
    
      this.resultArr.push(element);
    }

    buildAddToCartBtn(id = "") {
        let button = document.createElement("button");
        button.textContent = "Add to cart";
        button.classList.add("primary-btn");
        button.id = `add-to-cart-${id}` || `add-to-cart-id`;
        return button;
    }
}