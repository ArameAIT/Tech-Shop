import { addProduct, deleteProduct, getProducts, updateProduct } from "../db/slices/products.js";
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

export async function addProductController(req, res) {
    const response = responseTemplate()
    const { name, description, value, count, category } = req.body
    const categoryArray = ["phone", "computer", "laptop", "tablet", "kitchen", "other"]
    if (category && !categoryArray.includes(category)) {
        response.data = {
            message: "You wrote category that doesn't exists"
        }
        res.status(400).json(response)
        return
    }
    try {
        await addProduct(name, description, value, count, category)
        response.data = {
            message: "Product added successfully"
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}

export async function updateProductController(req, res) {
    const response = responseTemplate()
    const { name, description, value, count, category } = req.body
    const categoryArray = ["phone", "computer", "laptop", "tablet", "kitchen", "other"]
    if (category && !categoryArray.includes(category)) {
        response.data = {
            message: "You wrote category that doesn't exists"
        }
        res.status(400).json(response)
        return
    }
    const { id } = req.params
    try {
        await updateProduct(id, name, description, value, count, category)
        response.data = {
            message: "Product updated successfully"
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}

export async function deleteProductController(req, res) {
    const response = responseTemplate()
    const {id} = req.params
    try {
        await deleteProduct(id)
        response.data = {
            message: "Product deleted successfully"
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}