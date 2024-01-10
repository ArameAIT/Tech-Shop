import express from "express"
import updateBasketController from "../controllers/basket.js"
import validateToken from "../middleware/validateToken.js"

const basketRouter = express.Router()

basketRouter.put("/updateBasket",validateToken,updateBasketController)

export default basketRouter