import { Router } from "express";
import cartsManager from "../managers/CartManager.js";

const router = Router();

const cartManager = new cartsManager("./src/data/carts.json");

router.post("/", async (req, res) => {
    const newCart = await cartsManager.createCart();
    res.status(201).json(newCart);
})

router.get("/:id", async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartsManager.getCartById(cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
})

router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const result = await cartsManager.addProductToCart(cid, pid);
    res.json(result);
})



export default router;