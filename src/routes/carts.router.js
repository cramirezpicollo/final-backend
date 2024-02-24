import { Router } from "express";
import { cartManager } from "../app.js";

const cartsRouter = Router();

cartsRouter.post("/", async(req,res)=>{
    try {
        const response = await cartManager.newCart()
        res.json (response)
        
    } catch (error) {
        console.log ("algo pasa")
        res.send ("Error al crear carrito")
    }
})

cartsRouter.get("/:cid", async (req,res)=>{
    const {cid} = req.params;
    try {
        const response = await cartManager.getCartProducts(cid)
        res.json (response)
    } catch (error) {
        res.send ("error al intentar enviar productos del carrito")
        
    }
})

cartsRouter.post("/:cid/products/:pid", async(req,res)=>{
    const {cid, pid} = req.params;
    try {
        await cartManager.addProductsToCart(cid, pid)
        res.send ("producto agregado con exito")

    } catch (error) {
        res.send ("error al intentar guardar producto en el carrito")
        
    }
})

export {cartsRouter}