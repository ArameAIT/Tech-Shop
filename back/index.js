import express from "express"
import authRouter from "./routs/auth.js"
import productRouter from "./routs/products.js"
import commentsRouter from "./routs/comments.js"
import basketRouter from "./routs/basket.js"
import cors from "cors"

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

app.use("/auth", authRouter)
app.use("/product", productRouter)
app.use("/comments", commentsRouter)
app.use("/basket", basketRouter)

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})