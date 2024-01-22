import { addProduct, deleteProduct, forRating, getProducts, updatePhoto, updateProduct, uploadPhoto } from "../db/slices/products.js";
import responseTemplate from "../lib.js/responseTemplate.js";

export async function getProductsController(req, res) {
    const response = responseTemplate()
    const { page = 5, pageSize = 1, sortBy, sortOrder, filterName, filterMinPrice, filterMaxPrice, filterCategory } = req.query

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
    const categoryArray = ["phone", "computer", "laptop", "tablet", "kitchen", "other"]
    if (filterCategory && !categoryArray.includes(filterCategory)) {
        response.data = {
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
    response.data = {
        products
    }
    res.status(200).json(response)
}

export async function addProductController(req, res) {
    const response = responseTemplate()
    const { name, description, value, count, category } = req.body
    // const base64String = req.body.photo;
    // const buffer = Buffer.from(base64String, 'base64');
    const categoryArray = ["phone", "computer", "laptop", "tablet", "kitchen", "other"]
    if (category && !categoryArray.includes(category)) {
        response.data = {
            message: "You wrote category that doesn't exists"
        }
        res.status(400).json(response)
        return
    }
    try {
        const productId = await addProduct(name, description, value, count, category)
        response.data = {
            message: "Product added successfully",
            id: productId
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}

export async function uploadPhotoController(req, res) {
    const fileBuffer = req.file.buffer;
    const { product_id } = req.params;
    const { requestType } = req.query; 

    if (requestType === "update") {
        try {
            updatePhoto(fileBuffer, product_id);
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            await uploadPhoto(fileBuffer, product_id);
        } catch (err) {
            console.log(err);
        }
    }

    res.status(200).json({ message: 'File uploaded successfully!' });
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
    const { id } = req.params
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

export async function ratingController(req, res) {
    const response = responseTemplate()
    const { product_id } = req.params
    const { id } = req
    const { rating } = req.body
    if (!Number.isInteger(+product_id) || !Number.isInteger(+rating)) {
        response.error = {
            message: "Wrong queries"
        }
        res.status(400).json(response)
        return
    }
    try {
        await forRating(product_id, rating, id)
        response.data = {
            message: "Rating added successfully"
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
    }
}
