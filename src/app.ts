import express from 'express';
import { cadastrarLivro, atualizarLivro, deletarLivro, filtrarLivro, listarTodosLivro } from './controller/LivrosController';

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/api/books", cadastrarLivro) //deu certo
app.get("/api/books/", listarTodosLivro) //ok
app.get("/api/books/:id", filtrarLivro) //ok
app.put("/api/books/:id", atualizarLivro) //ok
app.delete("/api/books/:id", deletarLivro)

app.listen(PORT, () => console.log("API online na porta: " + PORT));