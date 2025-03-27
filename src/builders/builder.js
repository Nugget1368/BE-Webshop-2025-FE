export class Builder{
    constructor(){
        this.resultArr = [];
    }

    build(){
        return this.resultArr;
    }

    buildProductInfo(product){
        let image = document.createElement("img");
        image.src = product.imageUrl;
        let name = document.createElement("h3");
        name.textContent = product.name;
        let price = document.createElement("p");
        price.textContent = product.price;
        let description = document.createElement("p");
        description.textContent = product.description;
        let info = document.createElement("div");
        info.append(name, price, descriptionimage);
        this.resultArr.push(info);
    }
}