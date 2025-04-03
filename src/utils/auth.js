/*
    * För att göra ett anrop, exempelvis getproducts, behövs att man skickar med 'authentication' : 'bearer {token vi fått från login}'
    * Detta görs genom att skicka med en header i anropet, 
    * exempelvis axios.get("https://webshop-2025-be-g4.vercel.app/api/products", {headers: {authorization: `Bearer ${token}`}})
*/
const TOKEN_KEY = "token";

export class auth {
    static async register(user) {
        try {
            let response = await axios.post("https://webshop-2025-be-g4.vercel.app/api/auth/register", user);
            return response.data;
        }
        catch (err) {
            return err.message;
        }
    }

    static async login(username, password) {
        try {
            let user = {
                email: username,
                password: password
            }
            let response = await axios.post("https://webshop-2025-be-g4.vercel.app/api/auth/login", user);
            return response;
        }
        catch (err) {
            return err;
        }
    }

    static saveToken(token) {
        sessionStorage.setItem(TOKEN_KEY, token);
    }

    static getToken() {
        return sessionStorage.getItem(TOKEN_KEY);
    }
}