import pool from "../index.js"
export async function getComments(product_id) {
    const comments = await pool.query(`
        SELECT comments.id, comments.user_id, comments.comment, comments.product_id, users.full_name
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.product_id = ?
    `, [product_id]);

    return comments[0];
}
export async function addComment(product_id, comment, user_id) {
    await pool.query(`INSERT INTO comments (user_id,comment,product_id) VALUES (?,?,?)`
        , [user_id, comment, product_id])
}

export async function deleteComment(comment_id, user_id) {
    if (user_id == 5) {
        await pool.query(`DELETE FROM comments WHERE id = ?`, [comment_id])
        return
    }
    const userComments = await pool.query(`SELECT * FROM comments WHERE user_id = ?`, [+user_id])
    const idArray = userComments[0].map((com) => {
        return com.id
    })
    if (idArray.includes(+comment_id)) {
        await pool.query(`DELETE FROM comments WHERE id = ?`, [comment_id])
        return
    }
    return false
}