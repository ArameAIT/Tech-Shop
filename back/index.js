import express from "express"
import authRouter from "./routs/auth.js"

const app = express()
const PORT = 4000

app.use(express.json())

app.use("/auth", authRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running in port ${PORT}`);
})