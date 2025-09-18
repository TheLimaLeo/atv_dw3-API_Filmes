// Importando o service
import userService from "../services/userService.js";
// Importando o jwt
import jwt from 'jsonwebtoken'

//importando o dotenv (variaveis de ambiente)
import dotenv from "dotenv"
dotenv.config();
const JWTSecret = process.env.JWTSECRET;

//importando o bcrypt (para fazer o hash de senha)
import bcrypt from "bcrypt"

// Função para CADASTRAR um Usuário
const createUser = async (req, res) => {
  try {
    // Coletando os dados do corpo da requisição
    const { name, email, password } = req.body;
    // verificar se o usuario já existe
    const user = await userService.getOne(email);
    //se não houver usuario já cadastraado
    if (user == undefined) {
      //aqui será feito o hash d asenha
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt)
       await userService.Create(name, email, hash);
       //cadastando o usuario
    res.status(201).json({ success: "Usuário cadastrado com sucesso!" }); // Cod. 201: CREATED
    // se o úsuario ja estiver cadastrado
    } else {
      res.status(409).json({error: "Usuario já cadastrado."})//Cod 409: Conflit
    }

   
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Erro interno do servidor
  }
};

// FUNÇÃO para realizar o LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscando o usuário pelo email
    const user = await userService.getOne(email);
    // Se o usuário for encontrado
    if (user != undefined) {

      const correct = bcrypt.compareSync(password, user.password)
      //se a senha for válida

        if (correct){
          // gerando token
          jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (error, token) => {
            if (error) {
              res.status(400).json({error: "Não foi possível gerar token de autenticação."})
            } else {
              res.status(200).json({token})
            }
          })
    }else {
      //senha incorreta
      res.status(401).json({error: "Credenciais inválidas"})
      // cod. 401: UNATHORIZED
    }
      
    } else {
      res.status(404).json({ error: "Usuário não encontrado!" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { createUser, loginUser, JWTSecret };
