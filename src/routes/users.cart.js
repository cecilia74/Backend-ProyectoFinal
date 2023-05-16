import express from 'express';
import ProductManager from '../logic/ProductManager.js';
import CartManager from '../logic/CartManager.js';

export const cartRouter = express.Router();

const newCartManager = new CartManager("../data/Carts.json");


cartRouter.get("/",(req,res) => {

    try {
    const get = newCartManager.getCart();
    res.status(200).send({
        status: "SUCCESS",
        msg: "Found all products",
        data: get,
    })
    } catch (err) {
        res.status(400).send({
            status: "ERROR",
            msg: "Found all products",
            data: {},
        })
    }

});

cartRouter.post("/",(req,res) => {
    try {
        const post = req.body;
        const postbody = newCartManager.addcart(post);
        res.status(200).send({
            status: "SUCCESS",
            msg: "Product added",
            data: postbody,
        })
    } catch (err) {
        res.status(400).send({
            status: "ERROR",
            msg: "Found all products",
            data: {},
        })
    }
});

cartRouter.put("",(req,res) => {
    try {
        const prod = req.body;
        res.status(200).send({
            status: "SUCCESS",
            msg: "Found all products",
            data: products,
        })
    } catch (err) {
        res.status(400).send({
            status: "ERROR",
            msg: "Found all products",
            data: {},
        })
    }
});

cartRouter.delete(":cid",(req,res) => {
    try {
        res.status(200).send({
            status: "SUCCESS",
            msg: "Found all products",
            data: products,
        })
    } catch (err) {
        res.status(400).send({
            status: "ERROR",
            msg: "Product not deleted",
            data: {},
        })
    }
});



