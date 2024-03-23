import { Router } from "express";
import { cartManager } from "../app.js";
import { CartModel } from "../models/cart.model.js";

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
    try {
        const response = await cartManager.newCart()
        res.json(response)

    } catch (error) {
        console.log("error al crear carrito")
        res.send("Error al crear carrito")
    }
})

cartsRouter.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await CartModel.findById(cartId)

        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        return res.json(carrito.products);

    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.addProductsToCart(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cart_id = req.params.cid;
        const product_id = req.params.pid;

        const updatedCart = await cartManager.eliminarProductoDelCarrito(cart_id, product_id);

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

cartsRouter.put('/:cid', async (req, res) => {
    const cart_id = req.params.cid;
    const updatedProducts = req.body;

    try {
        const updatedCart = await cartManager.actualizarCarrito(cart_id, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cart_id = req.params.cid;
        const product_id = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cartManager.actualizarCantidadDeProducto(cart_id, product_id, newQuantity);

        res.json({
            status: 'success',
            message: 'Cantidad del producto actualizada correctamente',
            updatedCart,
        });

    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

cartsRouter.delete('/:cid', async (req, res) => {
    try {
        const cart_id = req.params.cid;
        const updatedCart = await cartManager.vaciarCarrito(cart_id);

        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });

    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

export { cartsRouter }