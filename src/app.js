import express from 'express';
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/cart.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter); 

app.listen(PORT, () => {
    console.log(`escuchando el puerto ${PORT}`);
});