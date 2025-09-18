import jwt from "jsonwebtoken"
import userController from "../controllers/userController.js"

//Função de Autenticação para verificar se o usuário está enviando o token e se ele é válido
const Authorization = (req, res, next) => {
    const authToken = req.headers['authorization']
    if (authToken != undefined) {
        // dividindo a string do token (para eliminar a palavra Bearer)
        const bearer = authToken.split(" ")
        const token = bearer[1]
        //validando o token
        jwt.verify(token, userController.JWTSecret, (error, data) =>{
            if (error){
                res.status(401).json({error: "Token inválido"})
                // token válido
            } else{
                req.token = token;
                req.loggedUser = {
                    id: data.id,
                    email: data.email,
                };
                next();
            }
        })
        
    } else{
        res.status(401).json({error: "Acesso não autorizado. Token inválido"})
    }
}

export default {Authorization};