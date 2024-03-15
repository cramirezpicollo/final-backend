import mongoose from "mongoose"

const Mongoose = mongoose

Mongoose.connect("mongodb+srv://cramirezpicollo:walenten1.@cluster0.i0f05yt.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("conexion exitosa"))
    .catch((error) => console.log("error en la conexión", error))


export {Mongoose}