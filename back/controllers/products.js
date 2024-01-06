import { getProducts } from "../db/slices/products.js";
import responseTemplate from "../lib.js/responseTemplate.js";
// import multer from "multer"

export async function getProductsController(req, res) {
    const response = responseTemplate()
    // const storage = multer.memoryStorage();
    // const upload = multer({ storage: storage });
    // upload.single('photo')
    // const photoBuffer = req.file;
    
    // console.log(photoBuffer);
    const { page, pageSize, sortBy, sortOrder, filterName, filterMinPrice, filterMaxPrice, filterCategory } = req.query

    if (!Number.isInteger(+page) || !Number.isInteger(+pageSize) || +page < 1 || +pageSize < 1) {
        response.error = {
            message: "Wrong query or queries"
        }
        res.status(400).json(response)
        return
    }
    const sortByArray = ["value", "rating"]
    const sortOrderArray = ["asc", "desc"]

    if (sortBy && !sortByArray.includes(sortBy)) {
        response.error = {
            message: "Wrong query or queries"
        }
        res.status(400).json(response)
        return
    }
    if (sortOrder && !sortOrderArray.includes(sortOrder.toLowerCase())) {
        response.error = {
            message: "Wrong query or queries"
        }
        res.status(400).json(response)
        return
    }
    if (
        (filterMinPrice !== undefined && !Number.isFinite(+filterMinPrice)) ||
        (filterMaxPrice !== undefined && !Number.isFinite(+filterMaxPrice))
    ) {
        response.error = {
            message: "Wrong query or queries"
        }
        res.status(400).json(response)
        return
    }

    const products = await getProducts(page, pageSize, sortBy, sortOrder, filterName, filterMinPrice, filterMaxPrice, filterCategory)
    // const token = 
    response.data = {
        products
    }
    res.status(200).json(response)
}