import express from "express";
import { ProductManager } from "../ProductManager.js";
const router = express.Router();

const productManager = new ProductManager ()


router.get ("/", async (req,res) => {
    try {
        const productos = await productManager.getProducts();
        res.render ("home",{productos: productos})
        
    } catch (error) {
        console.log ("error al obtener los productos", error)
        res.status(500).json ({error: "error interno del servidor"})
        
    }
    
})

router.get("/realTimeProducts", async (req,res)=>{
    try {
        res.render("realTimeProducts");
        
    } catch (error) {
        console.log ("error en la vista tiempo real", error);
        res.status (500).json ({error:" error interno del servidor"})
        
    }
})


export default router;