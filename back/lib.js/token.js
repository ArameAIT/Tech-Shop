import jwt from "jsonwebtoken";

export function giveToken(id){
    const token = jwt.sign({  userID : id  }, 'shhhhh')
    return token
}

export function verifyToken(token){
    try{
        const verifying = jwt.verify(token, "shhhhh")
        return verifying.userID
    }catch(err){
        console.log(err);
        return false
    }
}