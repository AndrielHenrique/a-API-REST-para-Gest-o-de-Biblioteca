import { Product } from "../model/Livros";
import { LivrosRepository } from "../repository/LivroRepository";

export class LivrosService{

    livrosRepository: LivrosRepository = new LivrosRepository();

    async cadastrarLivro(produtoData: any): Promise<Product> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = produtoData;
        if(!title || !author || !publishedDate || !isbn ||!pages || !language || !publisher ){
            throw new Error("Informações incompletas");
        }
        if(await this.livrosRepository.filtrarLivroPorISBN(isbn)){
            throw new Error("O livro já existe!");
        }
        const novoProduto =  await this.livrosRepository.insertProduct(title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Insert ", novoProduto);
        return novoProduto;
    }

    async atualizarLivro(produtoData: any): Promise<Product> {
        const { title, author, publishedDate, isbn, pages, language, publisher, id } = produtoData;
        if(!title || !author || !publishedDate || !isbn ||!pages || !language || !publisher|| !id ){
            throw new Error("Informações incompletas");
        }

        const produto =  await this.livrosRepository.updateProduct(title, author, publishedDate, isbn, pages, language, publisher, id);
        console.log("Service - Update ", produto);
        return produto;
    }

    async deletarLivro(produtoData: any): Promise<Product> {
        const { title, author, publishedDate, isbn, pages, language, publisher, id } = produtoData;
        if(!title || !author || !publishedDate || !isbn ||!pages || !language || !publisher|| !id ){
            throw new Error("Informações incompletas");
        }

        const produto =  await this.livrosRepository.deleteProduct(title, author, publishedDate, isbn, pages, language, publisher, id);
        console.log("Service - Delete ", produto);
        return produto;
    }

    async filtrarLivroPorISBN(produtoData: any): Promise<Product> {
        if(!produtoData ){
            throw new Error("Informações incompletas");
        }
        const isbn = parseInt(produtoData, 10);

        const produto =  await this.livrosRepository.filtrarLivroPorISBN(isbn);
        console.log("Service - Filtrar", produto);
        return produto;
    }

    async filtrarLivro(produtoData: any): Promise<Product> {
        if(!produtoData ){
            throw new Error("Informações incompletas");
        }
        const id = parseInt(produtoData, 10);

        const produto =  await this.livrosRepository.filterProduct(id);
        console.log("Service - Filtrar", produto);
        
        return produto;
    }

    async listarTodosLivros(): Promise<Product[]> {
        const produto =  await this.livrosRepository.filterAllProduct();
        console.log("Service - Filtrar Todos", produto);
        return produto;
    }

}