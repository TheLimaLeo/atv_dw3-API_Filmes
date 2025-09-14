
import mongoose from "mongoose";


const MONGODB_URI = "mongodb+srv://leonardo_db_user:r0Ag7gPcIZ13sNxR>@cluster0.ogahs28.mongodb.net/api_filmes?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB:", error.message);
    process.exit(1); 
  }
};

export default connect;