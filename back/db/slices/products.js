import pool from "../index.js";

export async function getProducts(page, pageSize, sortBy, sortOrder, filterName, filterMinPrice, filterMaxPrice, filterCategory) {
    let query = `
    SELECT p.*, r.rating, ph.photo
    FROM products p
    LEFT JOIN ratings r ON p.id = r.product_id
    LEFT JOIN photos ph ON p.id = ph.product_id
    WHERE 1=1
    `;
    const params = []

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

export async function deleteProduct(id){
    await pool.query(`DELETE FROM products WHERE id = ?`,[id])
}