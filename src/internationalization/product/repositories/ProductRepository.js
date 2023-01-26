import { http } from "../../../httpHelper";

class ProductRepository{
    async registerProduct(product){
        try {
            const response = await http.post("/register", product)
            return response
        } catch (error) {
            return error
        } 
    }
}

export const productRepository = new ProductRepository()