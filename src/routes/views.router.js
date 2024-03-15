import express from "express";
const router = express.Router();

router.get ("/", async (req,res) => {
    try {
        res.render ("chat");
        
    } catch (error) {
        console.log ("error en el chat", error)
        res.status(500).json ({error: "error interno del servidor"})
        
    }
})

export default router;