export class User {

    constructor(login, hashedPassword) {
        this.login = login
        this.password = hashedPassword
    }

    show() {
        return {
            login: this.login
        }
    }
}