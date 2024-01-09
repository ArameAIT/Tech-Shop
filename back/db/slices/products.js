import pool from "../index.js";

export async function getProducts(page, pageSize, sortBy, sortOrder, filterName, filterMinPrice, filterMaxPrice, filterCategory) {
    let query = `
    SELECT p.*, r.rating, ph.photo
    FROM products p
    LEFT JOIN ratings r ON p.id = r.product_id
    LEFT JOIN photos ph ON p.id = ph.product_id
    WHERE 1=1
    `;

    let countQuery = `
    SELECT COUNT(*) AS total
    FROM products p
    LEFT JOIN ratings r ON p.id = r.product_id
    LEFT JOIN photos ph ON p.id = ph.product_id
    WHERE 1=1
`;
    const params = []

    if (filterName) {
        query += ` AND p.name LIKE ?`;
        countQuery += ` AND p.name LIKE ?`;
        params.push(`%${filterName}%`);
    }

    if (filterMinPrice !== undefined) {
        query += ` AND p.value >= ?`;
        countQuery += ` AND p.value >= ?`;
        params.push(filterMinPrice);
    }

    if (filterMaxPrice !== undefined) {
        query += ` AND p.value <= ?`;
        countQuery += ` AND p.value <= ?`;
        params.push(filterMaxPrice);
    }

    if (filterCategory) {
        query += ` AND p.category = ?`;
        countQuery += ` AND p.category = ?`;
        params.push(filterCategory);
    }

    const countResult = await pool.query(countQuery, params);
    const totalCount = countResult[0][0].total;


    if (sortBy && sortOrder) {
        query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    }

    query += ` LIMIT ?,?`;
    params.push((+page - 1) * +pageSize, +pageSize);

    const products = await pool.query(query, params);
    return {
        products: products[0],
        totalCount: totalCount
    }
}

export async function addProduct(name, description, value, count, category) {
    await pool.query(`INSERT INTO products (name,description,value,count,category) VALUES (?,?,?,?,?)`
        , [name, description, value, count, category])
}

export async function updateProduct(id, name, description, value, count, category) {
    await pool.query(`
    UPDATE products
    SET name = ?,description = ?,value = ?,count = ?,category = ?
    WHERE id = ?`
        , [name, description, value, count, category, id])
}

export async function deleteProduct(id) {
    await pool.query(`DELETE FROM products WHERE id = ?`, [id])
}

export async function forRating(product_id, rating, user_id) {
    const userRate = await pool.query(`SELECT * FROM rates
     WHERE product_id = ? AND user_id = ?`, [product_id, user_id])
    if (userRate[0].length == 0) {
        await pool.query(`INSERT INTO rates (user_id,product_id,rating) VALUES (?,?,?)`, [user_id, product_id, rating])
    } else {
        await pool.query(`UPDATE rates
            SET rating = ?
            WHERE product_id = ? AND user_id = ?`
            , [rating, product_id, user_id])
    }
    const rates = await pool.query(`SELECT * FROM ratings WHERE product_id = ?`, [product_id])
    const newRating = await pool.query("SELECT AVG(rating) AS average_rating FROM rates WHERE product_id = ?", [product_id])
    const {average_rating} = newRating[0][0]
    const finalRating = (average_rating + "").split(".")[0]
    if (rates[0].length == 0) {
        await pool.query(`INSERT INTO ratings (product_id,rating ) VALUES (?,?)`, [product_id, finalRating])
    } else {
        await pool.query(`UPDATE ratings
         SET rating = ? 
         WHERE product_id = ?`
            , [finalRating,product_id])
    }


}