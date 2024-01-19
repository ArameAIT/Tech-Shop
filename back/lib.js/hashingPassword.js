import crypto from "crypto"

export function hashingPassword(password) {
    const hashedPassword = crypto.createHash('sha256')
        .update(password)
        .digest('hex')

    return hashedPassword
}

export function isPasswordTrue(hashedPassword, password) {
    return hashedPassword == password
}