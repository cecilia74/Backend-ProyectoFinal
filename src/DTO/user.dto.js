export default class UserDTO {
    constructor(users) {
        this.firstName = users.firstName;
        this.lastName = users.lastName;
        this.age = users.age;
        this.email = users.email;
        this.password = users.password;
        this.cartID = users.cartID;
        this.role = users.role;
        this.premium = users.premium;
        this.purchase_made = users.purchase_made;
    }
}