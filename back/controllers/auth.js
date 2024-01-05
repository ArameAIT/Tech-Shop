import responseTemplate from "../lib.js/responseTemplate.js"

export function registerController(req, res){
    const response = responseTemplate()
    response.data = {
        message : "User registered succesfully"
    }
    res.status(200).json(response)
}

export function loginController(req,res){
    const response = responseTemplate()
    response.data = {
        message : "User logined succesfully"
    }
    res.status(200).json(response)

}