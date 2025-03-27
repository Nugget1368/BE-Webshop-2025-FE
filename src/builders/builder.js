export class Builder {
    constructor() {
        this.resultArr = [];
    }

    build() {
        return this.resultArr;
    }

    buildProductInfo(product) {
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
        info.append(name, price, description, image, button);
        this.resultArr.push(info);
    }

    buildAddToCartBtn(id = "") {
        let button = document.createElement("button");
        button.textContent = "Add to cart";
        button.classList.add("primary-btn");
        button.id = `add-to-cart-${id}` || `add-to-cart-id`;
        return button;
    }
}