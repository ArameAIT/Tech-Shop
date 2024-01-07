import { z } from "zod";
import responseTemplate from "../lib.js/responseTemplate.js";

export default function validateProduct(req,res,next){
    const response = responseTemplate()
            const productSchema = z.object({
                name : z.string(),
                description : z.string(),
                value : z.number(),
                count : z.number(),
                category : z.string()
            });
            const productData = productSchema.safeParse(req.body);
            if (productData.success) {
                return next()
            }
            const errorMessage = {}
            productData.error.issues.map((messege) => {
                const paramName = messege.path[0]
                return errorMessage[paramName] = messege.message
            })
            response.error = {
                message: errorMessage
            }
            res.status(401).json(response)
}