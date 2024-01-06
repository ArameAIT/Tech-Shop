import pool from "../index.js"

export async function getUsers() {
    const users = await pool.query("SELECT * FROM users")
    return users[0]
    // console.log(users, "users");
}

export async function addUser(full_name, email, password) {
    const add = await pool.query(`INSERT INTO users(full_name,email,password)  VALUES (?,?,?)`, [full_name, email, password])
}