import {promises as fs} from "fs"
import { v4 as uuid } from "uuid";

export class ProductManager {
    constructor(){
        this.path = 'products.json';
        this.products = []
    }

    addProduct = async ({title, description, price, img, code, stock, status, category }) => {
       
        const id = uuid ()
        
        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            status,
            category,
            id
        };

        this.products = await this.getProducts()
        
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        return newProduct;
    }

    getProducts = async () => {
        const response = await fs.readFile (this.path, "utf-8")
        const responseJSON = JSON.parse (response)
    
        return responseJSON;
    }


    getProductById = async (id)=>{
        const response = await this.getProducts()

        const product = response.find (product => product.id == id)

        if (product){
            return product
        } else {
            console.log ("Producto no encontrado");
        }
    }

    updateProduct = async (id, {...producto}) => {
        const products = await this.getProducts()
        const index = products.findIndex (product => product.id == id)

        if (index !== -1){
            products [index] = {id, ...producto}
            await fs.writeFile (this.path, JSON.stringify (products))
            return products [index]
        
        }else{
            console.log ("no se puede actualizar")
        }
    }

    deleteProduct = async (id) =>{
        const products = await this.getProducts()
        const index = products.findIndex (product => product.id == id)

        if (index != -1){
            products.splice (index, 1)
            await fs.writeFile (this.path, JSON.stringify(products))
        }else{
            console.log ("producto no encontrado")
        }
    }

};

