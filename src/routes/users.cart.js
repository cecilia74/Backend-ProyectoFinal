import express from 'express';
import CartManager from '../logic/CartManager.js';

export const cartRouter = express.Router();

const newCartManager = new CartManager("../data/Carts.json");


cartRouter.get("/", (req, res) => {

    try {
        const get = newCartManager.getCart();
        if (get) {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Found all products",
                data: get,
            })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }

});

cartRouter.get("/:cid", (req, res) => {

    try {
        const cart = req.params.cid;
        const get = newCartManager.getCartById(cart);
        if (cart) {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Cart found",
                data: get,
            })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }

});


cartRouter.post("/", (req, res) => {
    try {
        const post = req.body;
        const postbody = newCartManager.addcart(post);

        if (postbody) {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Product added",
                data: postbody,
            })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});


cartRouter.post("/:cid/product/:pid", (req, res) => {
    try {
        const postc = req.params.cid;
        const postp = req.params.pid;
        const postbody = newCartManager.addProduct(postc, postp);

        if (!postbody) {
            return res.status(404).json({ message: `Cart doesn't exist` });
        } else if (!postp) {
            return res.status(404).json({ message: `Product doesn't exist` });
        } else {

        res.status(200).send({
            status: "SUCCESS",
            msg: "Product added",
            data: postbody,
        })}
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});



// cartRouter.put("",(req,res) => {
//     try {
//         const prod = req.body;
//         res.status(200).send({
//             status: "SUCCESS",
//             msg: "Found all products",
//             data: products,
//         })
//     } catch (err) {
//         res.status(400).send({
//             status: "ERROR",
//             msg: "Found all products",
//             data: {},
//         })
//     }
// });

// cartRouter.delete(":cid",(req,res) => {
//     try {
//         res.status(200).send({
//             status: "SUCCESS",
//             msg: "Found all products",
//             data: products,
//         })
//     } catch (err) {
//         res.status(400).send({
//             status: "ERROR",
//             msg: "Product not deleted",
//             data: {},
//         })
//     }
// });



