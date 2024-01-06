// import pool from "../index.js"

// export async function getProducts(page, pageSize) {
//     const params = []
//     params.push((+page - 1) * +pageSize, +pageSize);

//     const products = await pool.query(`
//     SELECT p.*, r.rating,ph.photo
//     FROM products p
//     LEFT JOIN ratings r ON p.id = r.product_id
//     LEFT JOIN photos ph ON p.id = ph.product_id
//     LIMIT ?,?`,
//      params)
//     return products[0]
// }

import pool from "../index.js";

export async function getProducts(page, pageSize, sortBy, sortOrder, filterName, filterMinPrice, filterMaxPrice, filterCategory) {
    let query = `
    SELECT p.*, r.rating, ph.photo
    FROM products p
    LEFT JOIN ratings r ON p.id = r.product_id
    LEFT JOIN photos ph ON p.id = ph.product_id
    WHERE 1=1
    `;
    const params =  []

    if (filterName) {
        query += ` AND p.name LIKE ?`;
        params.push(`%${filterName}%`);
    }
    
    if (filterMinPrice !== undefined) {
        query += ` AND p.value >= ?`;
        params.push(filterMinPrice);
    }
    
    if (filterMaxPrice !== undefined) {
        query += ` AND p.value <= ?`;
        params.push(filterMaxPrice);
    }
    
    if (filterCategory) {
        query += ` AND p.category = ?`;
        params.push(filterCategory);
    }
    
    if (sortBy && sortOrder) {
        query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    }

    query += ` LIMIT ?,?`;
     params.push((+page - 1) * +pageSize, +pageSize);
    
    const products = await pool.query(query, params);
    return products[0];
}
