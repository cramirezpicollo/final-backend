//import { promises as fs } from "fs"
//import { v4 as uuid } from "uuid";
import { CartModel } from "./models/cart.model.js";

export class CartManager {

    newCart = async () => {
        try {
            const createCart = new CartModel({ productos: [] });
            await createCart.save();
            return createCart;

        } catch (error) {
            console.log("error al crear el carrito", error)

        }
    }

    getCartProducts = async (cart_id) => {
        try {
            const cart = await CartModel.findById(cart_id)

            if (!cart) {
                throw new Error("no existe carrito con ese id");
            }

            return cart;
        } catch (error) {
            console.error("error al obtener el carrito por id", error);

        }
    }

    addProductsToCart = async (cart_id, product_id, quantity = 1) => {
        try {
            const cart = await this.getCartProducts(cart_id)
            const existingProduct = cart.products.find(item => item.product.toString() === product_id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: product_id, quantity });
            }

            cart.markModified("products");

            await cart.save();
            return cart;

        } catch (error) {
            console.error("error al obtener carrito por id", error);

        }
    }
}