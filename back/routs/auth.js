import express from "express"
import { loginController, registerController } from "../controllers/auth.js"
import validate from "../middleware/validate.js"

const authRouter = express.Router()

authRouter.post("/register", validate("register"),registerController)

authRouter.post("/login", validate("login"),loginController)

export default authRouter

// export default function hashingPasswords(password) {
//     const hashedPassword = crypto.createHash('sha256')
//     .update(password)
//     .digest('hex')
    
//     return hashedPassword
// }