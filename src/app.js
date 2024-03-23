import express from "express";
import ExpressHandlebars from "express-handlebars";
import { Server } from "socket.io";
import router from "./routes/views.router.js";
import { ProductManager } from "./ProductManager.js";
import { CartManager } from "./cartManager.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { Mongoose } from "./database.js";


const PORT = 8080;

const app = express();

//Configuro Express HB
app.engine("handlebars", ExpressHandlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware
app.use(express.static("./src/public"));
app.use(express.json())

//Rutas
app.use("/", router)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)


export const productManager = new ProductManager;
export const cartManager = new CartManager;


const httpServer = app.listen(PORT, (req, res) => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
