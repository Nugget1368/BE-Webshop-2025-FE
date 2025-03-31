export class Cart {
    constructor(items = []) {
        this.items = items;
    }

    getItems() {
        return this.items;
    }

    addItem(item) {
        this.items.push(item);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    updateCart(){
        let cartLink = document.querySelector("[data-cart]");
        cartLink.textContent = `Cart (${this.items.length})`;
    }
}