
import express from 'express';
import { productsRouter } from './routes/users.products.js';
// import { cartRouter } from './routes/users.cart.js';


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("products"))


app.use("/products",productsRouter);
// app.use("/cart", cartRouter)

app.get("*",(req,res) => {
    res.send("Welcome to my humble page.")
})

app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});