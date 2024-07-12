import express from 'express';
import { cadastrarLivro, atualizarLivro, deletarLivro, filtrarLivro, listarTodosLivro } from './controller/LivrosController';

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/api/product", cadastrarLivro)
app.put("/api/product", atualizarLivro)
app.delete("/api/product", deletarLivro)
app.get("/api/product", filtrarLivro)
app.get("/api/products", listarTodosLivro)

app.listen(PORT, ()=> console.log("API online na porta: " + PORT));