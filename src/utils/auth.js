const TOKEN_KEY = "token";

export class auth {
    static async register(user) {
        try {
            let response = await axios.post("https://webshop-2025-be-g4.vercel.app/api/auth/register", user);
            return response;
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