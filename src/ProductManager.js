//import {promises as fs} from "fs"
//import { v4 as uuid } from "uuid";
import { ProductModel } from "./models/product.model.js";

export class ProductManager {

    addProduct = async ({ title, description, price, img, code, stock, status, category }) => {

        let newProduct = new ProductModel({
            title,
            description,
            price,
            img,
            code,
            stock,
            status,
            category,
        });

        await newProduct.save();

    }

    getProducts = async () => {
        try {
            const productos = await ProductModel.find();
            return productos;

        } catch (error) {
            console.log("error al recuperar producto", error);
        }
    }

    getProductById = async (id) => {
        try {
            const producto = await ProductModel.findById(id);

            if (!producto) {
                console.log("producto no encontrado");
                return null;
            } else {
                console.log("producto encontrado");
                return producto;
            }
        } catch (error) {
            console.log("error al leer archivo", error)
        }
    }

    updateProduct = async (id, productoActualizado) => {
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, productoActualizado);

            if (!updateProduct) {
                console.log("producto que queres actualizar no encontrado");
                return null;
            }

            console.log("producto actualizado: ");
            return updateProduct

        } catch (error) {
            console.log("error al actualizar el producto", error);

        }
    }

    deleteProduct = async (id) => {

        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(id);

            if (!deleteProduct) {
                console.log("producto que queres eliminar no encontrado");
                return null;
            }

            console.log("producto eliminado");

        } catch (error) {
            console.log("error al eliminar el producto", error);

        }
    }
};

