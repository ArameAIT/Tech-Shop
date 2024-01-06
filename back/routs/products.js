import express from "express"
import { getProductsController } from "../controllers/products.js"
import validateToken from "../middleware/validateToken.js"

const productRouter = express.Router()

productRouter.get("/getProducts",validateToken,getProductsController)

export default productRouter