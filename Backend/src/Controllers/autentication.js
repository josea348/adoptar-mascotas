import { pool } from "../Databases/coexion.js";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = `SELECT id, fullname, email, password FROM users WHERE email='${email}'`;
        const [users] = await pool.query(sql);

        if (users.length > 0) {
            const user = users[0];
            const passwordMatch = bcrypt.compare(password, user.password); // Comparing hashed password
            console.log(passwordMatch);
            if (passwordMatch) {
                // If password matches, send user data without password field
                delete user.password;
                const token = JWT.sign({ users }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRET })
                res.status(200).json({user, token, message: 'Usuario Validado'});
            } else {
                res.status(401).json({ message: "Contraseña incorrecta." });
            }
        } else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const validarToken = async (req, res,next) => {
    let token_cliente = req.headers['token'];
    if (!token_cliente) {
        return res.status(404).json({'message': 'Se requiere el token.'})
    } else {
        const token = JWT.verify(token_cliente, process.env.AUT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(404).json({ 'message': 'Token incorrecto' });
            } else {
                next();
            }
        })
    }
}
