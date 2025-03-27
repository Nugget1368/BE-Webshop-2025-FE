export class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export class Admin extends User {
    constructor(name, email, password) {
        super(name, email, password);
    }
}