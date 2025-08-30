import { Router } from "express";   
import productsManager from "../managers/ProductsManager.js";
import { io } from "../app.js";

const router = Router();

const pm = new productsManager("./src/data/products.json");

router.get("/", async (req, res) => {
    const products = await pm.getProducts();
    res.json(products);
});

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const product = await pm.getProductById(pid);
    product ? res.json(product) : res.status(404).json({ error: "Elemento no encontrado" });    
});

router.post("/", async (req, res) => {
    const newProduct = await pm.addProduct(req.body);
    const products = await pm.getProducts();
    io.emit("products", products); 
    res.status(201).json(newProduct);
});

router.put("/:pid", async (req, res) => {
    const updatedProduct = await pm.updateProduct(req.params.pid, req.body);
    res.json(updatedProduct);
});

router.delete("/:pid", async (req, res) => {
    const deletedProduct = await pm.deleteProduct(req.params.pid);
    const products = await pm.getProducts();
    io.emit("products", products); 
    res.json(deletedProduct);
});

export default router;