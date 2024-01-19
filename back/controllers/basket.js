import { forBasket } from "../db/slices/basket.js";
import responseTemplate from "../lib.js/responseTemplate.js";

export default async function updateBasketController(req, res) {
    const response = responseTemplate()
    const { products } = req.body
    products.forEach((prod) => {
        const { id, count } = prod
        if (!Number.isInteger(id) || !Number.isInteger(count)) {
            response.error = {
                message: "Wrong queries"
            }
            res.status(400).json(response)
            return
        }
    });
    const selectProducts = products.sort((a, b) => a.id - b.id);

    try {
        const basket = await forBasket(selectProducts)
        response.data = {
            message: "you buyed them"
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}