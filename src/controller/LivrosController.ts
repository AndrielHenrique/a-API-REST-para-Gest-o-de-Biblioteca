import { Request, Response } from "express";
import { LivrosService } from "../service/LivrosService";

const livrosService = new LivrosService();

export async function cadastrarLivro (req: Request, res: Response){
    try {
        const novoLivro = await livrosService.cadastrarLivro(req.body);
        res.status(201).json(
            {
                mensagem:"Livro adicionado com sucesso!",
                Livro:novoLivro
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function atualizarLivro (req: Request, res: Response){
    try {
        const Livro = await livrosService.atualizarLivro(req.body);
        res.status(200).json(
            {
                mensagem:"Livro atualizado com sucesso!",
                Livro:Livro
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function deletarLivro (req: Request, res: Response){
    try {
        const Livro = await livrosService.deletarLivro(req.body);
        res.status(200).json(
            {
                mensagem:"Livro deletado com sucesso!",
                Livro:Livro
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function filtrarLivro (req: Request, res: Response){
    try {
        const Livro = await livrosService.filtrarLivro(req.query.id);
        res.status(200).json(
            {
                mensagem:"Livro encontrado com sucesso!",
                Livro:Livro
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function listarTodosLivro (req: Request, res: Response){
    try {
        const Livros = await livrosService.listarTodosLivros();
        res.status(200).json(
            {
                mensagem:"Livros listados com sucesso!",
                Livros:Livros
            }
            );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};