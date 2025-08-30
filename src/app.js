import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

import productsRouter from './routers/products.router.js';
import cartRouter from './routers/cart.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.get('/home', async (req, res) => {
    const { default: ProductManager } = await import('./managers/ProductsManager.js');
    const pm = new ProductManager("./data/products.json");
    const products = await pm.getProducts();
    res.render('home', { products });
});

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});

app.get("/home", (req, res) => {
    res.render("home", { title: "Página Home" });
});

app.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", { title: "Productos en tiempo real" });
});

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Cliente conectado");
});


export { io };