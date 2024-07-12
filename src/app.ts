import express from 'express';
import { cadastrarLivro, atualizarLivro, deletarLivro, filtrarLivro, listarTodosLivro } from './controller/LivrosController';

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/api/books", cadastrarLivro)
app.get("/api/books/", listarTodosLivro)
app.get("/api/books/:id", filtrarLivro)
app.put("/api/books/:id", atualizarLivro)
app.delete("/api/books/:id", deletarLivro)

app.listen(PORT, ()=> console.log("API online na porta: " + PORT));