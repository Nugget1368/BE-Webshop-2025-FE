export const CART_KEY = "products";

export class LocalStorage {
  static getStorageAsJSON(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
  }

  static saveToStorage(storageName, obj) {
    if (localStorage.getItem(storageName)) {
      let storage = this.getStorageAsJSON(storageName);
      storage.push(obj);
      localStorage.setItem(storageName, JSON.stringify(storage));
    } else {
      let arr = [];
      arr.push(obj);
      localStorage.setItem(storageName, JSON.stringify(arr));
    }
  }

  static clearStorage(storageName) {
    localStorage.removeItem(storageName);
  }
}
