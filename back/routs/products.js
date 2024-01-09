import express from "express"
import { addProductController, deleteProductController, getProductsController, ratingController, updateProductController } from "../controllers/products.js"
import validateToken from "../middleware/validateToken.js"
import validateProduct from "../middleware/validateProduct.js"

const productRouter = express.Router()

productRouter.get("/getProducts",validateToken,getProductsController)

productRouter.post("/addProduct",validateToken,validateProduct,addProductController)

productRouter.put("/updateProduct/:id",validateToken,validateProduct,updateProductController)

productRouter.delete("/deleteProduct/:id",validateToken,deleteProductController)

productRouter.post("/rating/:product_id",validateToken,ratingController)


export default productRouter