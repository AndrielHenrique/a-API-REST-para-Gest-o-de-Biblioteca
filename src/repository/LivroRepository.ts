import { executarComandoSQL } from "../database/mysql";
import { Product } from "../model/Livros";

export class LivrosRepository{

    constructor(){
        this.createTable();
    }
/* title :  string ;
    author :  string ;
    publishedDate :  string ;
    isbn :  string ;
    pages :  number ;
    language :  string ;
    publisher :  string ;
    id : number;
    */
    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.vendas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            author VARCHAR(255) NOT NULL,
           publishedDate date NOT NULL,
           isbn VARCHAR(255) NOT NULL,
           pages int,
           language VARCHAR(255) NOT NULL,
           publisher VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertProduct(title: string, author: string, publishedDate: string, isbn: string, pages: number, language: string, publisher: string) :Promise<Product>{
        const query = "INSERT INTO biblioteca.vendas (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ? ,? ,? ,?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher]);
            console.log('Produto inserido com sucesso, ID: ', resultado.insertId);
            const product = new Product(title, author, publishedDate, isbn, pages, language, publisher, resultado.insertId);
            return new Promise<Product>((resolve)=>{
                resolve(product);
            })
        } catch (err) {
            console.error('Erro ao inserir o produto:', err);
            throw err;
        }
    }

    async updateProduct(title: string, author: string, publishedDate: string, isbn: string, pages: number, language: string, publisher: string, id: number) :Promise<Product>{
        const query = "UPDATE biblioteca.vendas set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher, id]);
            console.log('Produto atualizado com sucesso, ID: ', resultado);
            const product = new Product(title, author, publishedDate, isbn, pages, language, publisher, id);
            return new Promise<Product>((resolve)=>{
                resolve(product);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteProduct(title: string, author: string, publishedDate: string, isbn: string, pages: number, language: string, publisher: string, id: number) :Promise<Product>{
        const query = "DELETE FROM biblioteca.vendas where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const product = new Product(title, author, publishedDate, isbn, pages, language, publisher, id);
            return new Promise<Product>((resolve)=>{
                resolve(product);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterProduct(id: number) :Promise<Product>{
        const query = "SELECT * FROM biblioteca.vendas where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto localizado com sucesso, ID: ', resultado);
            return new Promise<Product>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllProduct() :Promise<Product[]>{
        const query = "SELECT * FROM biblioteca.vendas" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Product[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os produtos gerando o erro: ${err}`);
            throw err;
        }
    }

    
}