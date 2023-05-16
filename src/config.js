import path from "path";
import { fileURLToPath } from "url";
const url = fileURLToPath(import.meta.url);

export const file = path.dirname(url);



//     async updateProduct(id, change) {
//         let data = fs.readFileSync(this.path, "UTF-8");
//         let dataParse = JSON.parse(data);
//         dataParse.map((p) => {
//     if (+p.id === +id) {
//         p.title = change.title
//         p.description = change.description
//         p.price = change.price
//         p.thumbnail = change.thumbnail
//         p.code = change.code
//         p.stock = change.stock
//     } 
// })
//         fs.writeFileSync(this.path, JSON.stringify(dataParse));
//         return change;
//     }


// addProduct(object) {

//     let data = fs.readFileSync(this.path, "UTF-8")
//     let dataParse = JSON.parse(data)
//     let productString = JSON.stringify(dataParse);

//     if (!object.title || !object.description || !object.price || !object.thumbnail || !object.code || !object.stock) {
//         console.log("Product not added. Please complete again")
//         return undefined
//     }
//     else {
//         this.products.push({ id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1, ...object });
//         fs.writeFileSync(this.path, productString)
//         return object


//     }

// }