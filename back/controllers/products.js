import { getProducts } from "../db/slices/products.js";
import responseTemplate from "../lib.js/responseTemplate.js";

export async function getProductsController(req,res){
    const response = responseTemplate()
    const {page, pageSize} = req.query
    const products = await getProducts(page,pageSize)
    // const token = 
    response.data = {
        products
    }
    res.status(200).json(response)
}