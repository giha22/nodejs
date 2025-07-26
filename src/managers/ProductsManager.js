import {promises as fs} from 'fs';
import path from 'path';    
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {
    constructor(filePath) {
        this.path = path.resolve(__dirname,"..",filePath);
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        }catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p=> p.id === parseInt(id));
    }

    async addProduct(productData) {
        const products = await this.getProducts();
        const newId =products.length > 0 ? products.at(-1).id + 1 : 1;
        const newProduct = { 
            id: newId,
            title: productData.title,
            description: productData.description,
            price: productData.price,   
            code: productData.code,
            status: productData.status || true,
            price: productData.price,
            stock: productData.stock || 0,
            category: productData.category,
            thumbnails: productData.thumbnails || []
        };

        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, productData) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index === -1) return { error: "Producto no encontrado" };

        delete updateProduct.id; 
        products [index] = { ...products[index], ...this.updateProduct };
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const updatedProducts = products.filter(p => p.id !== parseInt(id));
        await fs.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
        return { message: `Producto con id ${id} eliminado`};
    }
}

export default ProductManager;