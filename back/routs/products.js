import express from "express"
import { addProductController, deleteProductController, getProductsController, ratingController, updateProductController, uploadPhotoController } from "../controllers/products.js"
import validateToken from "../middleware/validateToken.js"
import validateProduct from "../middleware/validateProduct.js"
import multer from "multer"

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productRouter = express.Router()

productRouter.get("/getProducts", validateToken, getProductsController)

productRouter.post("/addProduct", validateToken, validateProduct, addProductController)

productRouter.post("/upload/:product_id",upload.single('image'),validateToken,uploadPhotoController) 

productRouter.put("/updateProduct/:id", validateToken, validateProduct, updateProductController)

productRouter.delete("/deleteProduct/:id", validateToken, deleteProductController)

productRouter.post("/rating/:product_id", validateToken, ratingController)


export default productRouter