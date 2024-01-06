import responseTemplate from "../lib.js/responseTemplate.js"
import { verifyToken } from "../lib.js/token.js"

export default function validateToken(req, res, next) {
    const response = responseTemplate()
    const token = req.headers.authorization.split(" ")[1]
    const verifying = verifyToken(token)
    if (verifying == false) {
        response.error = {
            message: "Token is wrong"
        }
        res.status(401).json(response)
        return
    }
    if(verifying == 5){
        req.admin = true
    }
    next()
}