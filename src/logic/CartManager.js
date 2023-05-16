import fs from "fs";
import ProductManager from "./ProductManager.js";


export default class CartManager {
    constructor() {
        this.path = ('./src/data/Cart.json');
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            if (data) {
                this.carts = JSON.parse(data).map((cart) => ({
                    ...cart,
                    products: cart.products || [],
                }));
            }
        } catch (err) {
            console.log(`Error al leer el archivo del carrito: ${err.message}`);
        }
    }

    saveCarts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts), "utf-8");
        } catch (err) {
            console.log(`Error al escribir el archivo del carrito: ${err.message}`);
        }
    }


    addcart() {
        const newCart = {
            id: this.carts.length + 1,
            products: [],
        };

this.carts.push(newCart);
this.saveCarts();
return newCart;
    }

    getCart() {
        return this.carts;

    }

    async getCartById(id) {
        let data = this.loadCarts()
        return data.find((product) => +product.id == +id)
    }

async addProduct(cartId,prodId) {
    const foundId = this.carts.find((c)=> +c.id === +cartId);
    const moreprod = foundId.products.find((prod) => +prod.id === +id);

    const manangerprod = this.getCartById(prodId);
    if (moreprod) {
        moreprod.quantity++;

    } else {

        foundId.products.push({
            manangerprod,
            quantity: 1,

        });
    }

    this.saveCarts();

}



}
//         { products: [ ] id:1 }
// { producto: "iddelproducto", quantly: 1 }
// [{products}]