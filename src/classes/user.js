export class User {
    constructor(name, lastName, email, password) {
        this.firstname = name;
        this.lastname = lastName;
        this.email = email;
        this.password = password;
    }
}

export class Admin extends User {
    constructor(name,lastName, email, password) {
        super(name,lastName, email, password);
        this.isadmin = true;
    }
}