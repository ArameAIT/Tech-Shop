import { z } from "zod";
import responseTemplate from "../lib.js/responseTemplate.js";

export default function validate(pathname) {
    return (req, res, next) => {
        if (pathname == "register") {
            const response = responseTemplate()
            const registerSchema = z.object({
                email: z.string().email(),
                password: z.number(),
                full_name: z.string()
            });
            const registerData = registerSchema.safeParse(req.body);
            if (registerData.success) {
                return next()
            }
            const errorMessage = {}
            registerData.error.issues.map((messege) => {
                const paramName = messege.path[0]
                return errorMessage[paramName] = messege.message
            })
            response.error = {
                message: errorMessage
            }
            res.status(401).json(response)
        }
        else if (pathname === "login") {
            const response = responseTemplate()
            const loginSchema = z.object({
                email: z.string().email(),
                password: z.number(),
            });
            const loginData = loginSchema.safeParse(req.body);
            if (loginData.success) {
                return next()
            }
            const errorMessage = {}
            loginData.error.issues.map((messege) => {
                const paramName = messege.path[0]
                return errorMessage[paramName] = messege.message
            })
            response.error = {
                message: errorMessage
            }
            res.status(401).json(response)
        }
    }
}