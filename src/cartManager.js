//import { promises as fs } from "fs"
//import { v4 as uuid } from "uuid";
import {CartModel} from "./models/cart.model.js";

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
            console.error("error al agregar producto", error);

        }
    }

    async eliminarProductoDelCarrito(cart_id, product_id) {
        try {
            const cart = await CartModel.findById(cart_id);

            if (!cart) {
                throw new Error('carrito no encontrado');
            }

            cart.products = cart.products.filter(item => item.product._id.toString() !== product_id);

            await cart.save();
            return cart;

        } catch (error) {
            console.error('Error al eliminar el producto del carrito en el gestor', error);
            throw error;
        }
    }

    async actualizarCarrito(cart_id, updatedProducts) {
        try {
            const cart = await CartModel.findById(cart_id);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = updatedProducts;

            cart.markModified('products');

            await cart.save();

            return cart;

        } catch (error) {
            console.error('Error al actualizar el carrito en el gestor', error);
            throw error;
        }
    }

    async actualizarCantidadDeProducto(cart_id, product_id, newQuantity) {
        try {
            const cart = await CartModel.findById(cart_id);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(item => item.product._id.toString() === product_id);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;

                cart.markModified('products');

                await cart.save();
                return cart;
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }

        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito', error);
            throw error;
        }
    }

    async vaciarCarrito(cart_id) {
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cart_id,
                { products: [] },
                { new: true }
            );

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            return cart;

        } catch (error) {
            console.error('Error al vaciar el carrito en el gestor', error);
            throw error;
        }
    }

}