import { Router } from "express";
import { productManager } from "../app.js";

const productsRouter = Router()

productsRouter.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const productos = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });

        res.json({
            status: 'success',
            payload: productos,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
        });
    } catch (error) {
        console.log(error);
        res.send("Error al intentar recibir el producto")

    }
})

productsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const products = await productManager.getProductById(pid)
        if (!products) {
            return res.json({
                error: "producto no encontrado"
            });

        }
        res.json (products);

    } catch (error) {
        console.log(error);
        res.send("Error al intentar recibir el producto con id")
    }

});

productsRouter.post("/", async (req, res) => {

    const { title, description, price, img, code, stock, status = true, category } = req.body;

    try {
        const response = await productManager.addProduct({ title, description, price, img, code, stock, status, category })
        res.json(response)

    } catch (error) {
        console.log(error);
        res.send("Error al intentar agregar producto")
    }
});

productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, img, code, stock, status = true, category } = req.body;

    try {
        
        const response = await productManager.updateProduct(pid, { title, description, price, img, code, stock, status, category })
        res.json(response)

    } catch (error) {
        console.log(error);
        res.send("Error al intentar actualizar producto")

    }
});

productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        await productManager.deleteProduct(pid)
        res.send("producto eliminado con exito")
    } catch (error) {

        console.log(error);
        res.send("Error al intentar eliminar producto")

    }
});

export { productsRouter }