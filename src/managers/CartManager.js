import {promises as fs} from 'fs';
import path from 'path';    
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CartManager {
    constructor(filePath) {
        this.path = path.resolve(__dirname, "..", filePath);
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);       
        } catch (error) {
            return [];  
        }
    }

    async createCart() {
        const carts = await this.getCarts();
        const newId = carts.length > 0 ? carts.at(-1).id + 1 : 1;
        const newCart = { id: newId, products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === parseInt(id));
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === parseInt(cid));
        if (!cart) return { error: "Carrito no encontrado" };

        const productIndex = cart.products.findIndex(p => p.id === parseInt(pid));
        if (productIndex) {
            productIndex.quantity += 1;
        } else {
            cart.products.push({ id: parseInt(pid), quantity: 1 });
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
}


export default CartManager;