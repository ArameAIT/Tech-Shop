import pool from "../index.js"

export async function forBasket(productsArray) {
    let query = `SELECT * FROM products
     WHERE 1=1`
    let params = []
    productsArray.forEach((prod, i) => {
        if (i == 0) {
            query += ` AND id = ?`
            params.push(prod.id)
        } else {
            query += ` OR id = ?`
            params.push(prod.id)
        }

    });
    const selectedProducts = await pool.query(query, params)
    //  const aboutCounts = selectedProducts[0].forEach(async (prod,i)=>{
    //     if(prod.count < productsArray[i].count ) return false
    //     if(prod.count > productsArray[i].count ){
    //         const newCount = prod.count - productsArray[i].count
    //         console.log(newCount, prod.count);
    //         await pool.query(`UPDATE products SET count = ? WHERE id = ?`,[newCount,productsArray[i].id])
    //     }else{
    //         await pool.query(`DELETE FROM products WHERE id = ?`,[productsArray[i].id])
    //     }
    // })
    for (const [i, prod] of selectedProducts[0].entries()) {
        if (prod.count < productsArray[i].count) {
            return false;
        }
       else if (prod.count > productsArray[i].count) {
            const newCount = prod.count - productsArray[i].count;
            await pool.query(`UPDATE products SET count = ? WHERE id = ?`, [newCount, productsArray[i].id]);
        } else if(prod.count == productsArray[i].count){
            await pool.query(`DELETE FROM products WHERE id = ?`, [productsArray[i].id]);
        }
    }
    console.log(selectedProducts[0]);

}