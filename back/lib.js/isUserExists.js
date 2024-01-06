import { getUsers } from "../db/slices/auth.js";

export default async function isUserExists(body){
    const users = await getUsers()
    const user = users.find((u)=> u.email == body.email)
    return user
}