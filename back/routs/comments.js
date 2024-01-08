import express from "express"
import { addCommentController, deleteCommentController, getCommmentsController } from "../controllers/comments.js"
import validateToken from "../middleware/validateToken.js"

const commentsRouter = express.Router()

commentsRouter.get("/getComments/:product_id",validateToken,getCommmentsController)

commentsRouter.post("/addComment",validateToken,addCommentController)

commentsRouter.delete("/deleteComment/:comment_id",validateToken,deleteCommentController)

export default commentsRouter