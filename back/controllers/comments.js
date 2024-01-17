import { addComment, deleteComment, getComments } from "../db/slices/comments.js";
import responseTemplate from "../lib.js/responseTemplate.js";

export async function getCommmentsController(req, res) {
    const response = responseTemplate()
    const { product_id } = req.params
    if (!Number.isInteger(+product_id)) {
        response.error = {
            message: "Wrong queries"
        }
        res.status(400).json(response)
        return
    }
    try {
        const comments = await getComments(product_id)
        response.data = {
            comments
        }
        res.status(200).json(response)
    } catch (err) {

    }
}

export async function addCommentController(req, res) {
    const response = responseTemplate()
    const { comment, product_id } = req.body
    const { id } = req
    if (comment == undefined || !Number.isInteger(+product_id)) {
        response.error = {
            message: "Wrong queries"
        }
        res.status(400).json(response)
        return
    }
    try {
        await addComment(product_id, comment, id)
        response.data = {
            message: "Comment added successfully",
            user_id : id
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}

export async function deleteCommentController(req, res) {
    const response = responseTemplate()
    const { comment_id } = req.params
    const {id} = req
    if (!Number.isInteger(+comment_id)) {
        response.error = {
            message: "Wrong queries"
        }
        res.status(400).json(response)
        return
    }
    try {
        const delComment = await deleteComment(comment_id,id)
        if(delComment == false){
            response.error = {
                message: "bad request"
            }
            res.status(400).json(response)
            return
        }
        response.data = {
            message: "comment deleted successfully"
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}