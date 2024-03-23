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

    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const productos = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            console.log("Error al obtener los productos", error);
            throw error;
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

