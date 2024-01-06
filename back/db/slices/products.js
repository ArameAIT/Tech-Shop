import pool from "../index.js"

export async function getProducts(page, pageSize) {
    const params = []
    params.push((+page - 1) * +pageSize, +pageSize);

    const products = pool.query(`
    SELECT p.*, r.rating,ph.photo
    FROM products p
    LEFT JOIN ratings r ON p.id = r.product_id
    LEFT JOIN photos ph ON p.id = ph.product_id
    LIMIT ?,?`,
     params)
    return products[0]
}