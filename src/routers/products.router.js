import { Router } from "express";   
import productsManager from "../managers/ProductsManager.js";

const router = Router();

const ProductsManager = new productsManager("./src/data/products.json");

router.get("/", async (req, res) => {
    const products = await ProductsManager.getProducts();
    res.json(products);
})

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const product = await ProductsManager.getProductById(pid);
    product ? res.json(product) : res.status(404).json({ error: "Elemento no encontrado" });    
})

router.post("/", async (req, res) => {
    const newProduct = await ProductsManager.addProduct(req.body);
    res.status(201).json(newProduct);
})

router.put("/:pid", async (req, res) => {
    const updatedProduct = await ProductsManager.updateProduct(req.params.pid, req.body);
    res.json(updatedProduct);
})

router.delete("/:pid", async (req, res) => {
    const deletedProduct = await ProductsManager.deleteProduct(req.params.pid);
    res.json(deletedProduct);
})

export default router;