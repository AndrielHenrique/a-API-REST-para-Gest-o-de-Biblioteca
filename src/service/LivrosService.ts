import { Product } from "../model/Livros";
import { LivrosRepository } from "../repository/LivroRepository";

export class LivrosService {

    livrosRepository: LivrosRepository = new LivrosRepository();

    async cadastrarLivro(produtoData: any): Promise<Product> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = produtoData;
        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
        }
        const verificiarISBN = await this.livrosRepository.filtrarLivroPorISBN(isbn);
        if (verificiarISBN) {
            throw new Error("O livro já existe!");
        }
        const novoProduto = await this.livrosRepository.insertProduct(title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Insert ", novoProduto);
        return novoProduto;
    }

    async atualizarLivro(produtoData: any): Promise<Product> {
        const { title, author, publishedDate, isbn, pages, language, publisher, id } = produtoData;
        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher || !id) {
            throw new Error("Informações incompletas");
        }
        const verificarID = await this.livrosRepository.filterProduct(id);
        if (!verificarID) {
            throw new Error("Erro ao encontrar esse livro!");
        }

        const produto = await this.livrosRepository.updateProduct(title, author, publishedDate, isbn, pages, language, publisher, id);
        console.log("Service - Update ", produto);
        return produto;
    }

    async deletarLivro(produtoData: any): Promise<void> {
        const { id } = produtoData;
        if (!id) {
            throw new Error("Informações incompletas");
        }

        const verificarID = await this.livrosRepository.filterProduct(id);
        if (!verificarID) {
            throw new Error("Erro ao encontrar esse livro!");
        }

        const produto = await this.livrosRepository.deleteProduct(id);
        console.log("Service - Delete ", produto);
    }

    async filtrarLivroPorISBN(isbn: string): Promise<Product | null> {
        if (!isbn) {
            throw new Error("Informações incompletas");
        }

        const produto = await this.livrosRepository.filtrarLivroPorISBN(isbn);
        console.log("Service - Filtrar por ISBN", produto);
        return produto;
    }

    async filtrarLivro(id: number): Promise<Product> {
        if (!id) {
            throw new Error("Informações incompletas");
        }
        const produto = await this.livrosRepository.filterProduct(id);
        console.log("Service - Filtrar", produto);

        return produto;
    }

    async listarTodosLivros(): Promise<Product[]> {
        const produto = await this.livrosRepository.filterAllProduct();
        console.log("Service - Filtrar Todos", produto);
        return produto;
    }

}