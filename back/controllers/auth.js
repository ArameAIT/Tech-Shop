import { addUser, getUsers } from "../db/slices/auth.js"
import { hashingPassword, isPasswordTrue } from "../lib.js/hashingPassword.js";
import isUserExists from "../lib.js/isUserExists.js";
import responseTemplate from "../lib.js/responseTemplate.js"
import { giveToken } from "../lib.js/token.js";

export async function registerController(req, res) {
    const response = responseTemplate()
    try {

        const user = await isUserExists(req.body)
        if (user) {
            response.error = {
                message: "User already exists"
            }
            res.status(401).json(response)
            return
        }
        const hashedPassword = hashingPassword(req.body.password + "")
        await addUser(req.body.full_name, req.body.email, hashedPassword)

        response.data = {
            message: "User registered succesfully"
        }
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err);
    }
}

export async function loginController(req, res) {
    // if()
    const response = responseTemplate()
    try {

        const user = await isUserExists(req.body)
        if (!user) {
            response.error = {
                message: "email or password is wrong"
            }
            res.status(401).json(response)
            return
        }
        const hashedPassword = hashingPassword(req.body.password + "")
        const isPasswordsTrue = isPasswordTrue(hashedPassword, user.password)
        if (!isPasswordsTrue) {
            response.error = {
                message: "email or password is wrong"
            }
            res.status(401).json(response)
            return

        }
        const token = giveToken(user.id)
        if (req.body.email == "admin@gmail.com") {
            response.isAdmin = true
        }
        response.data = {
            message: `hello ${user.full_name}`,
            token
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}