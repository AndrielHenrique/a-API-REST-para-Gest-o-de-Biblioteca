import { executarComandoSQL } from "../database/mysql";
import { Product } from "../model/Product";

export class ProductRepository{

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
        CREATE TABLE IF NOT EXISTS Vendas.Product (
            id INT AUTO_INCREMENT PRIMARY KEY,
            author VARCHAR(255) NOT NULL,
           publishedDate VARCHAR(255) NOT NULL,
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
        const query = "INSERT INTO vendas.Product (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ? ,? ,? ,?)" ;

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

    async updateProduct(id: number, name: string, price: number) :Promise<Product>{
        const query = "UPDATE vendas.product set name = ?, price = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [name, price, id]);
            console.log('Produto atualizado com sucesso, ID: ', resultado);
            const product = new Product(id, name, price);
            return new Promise<Product>((resolve)=>{
                resolve(product);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteProduct(id: number, name:string, price:number) :Promise<Product>{
        const query = "DELETE FROM vendas.product where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const product = new Product(id, name, price);
            return new Promise<Product>((resolve)=>{
                resolve(product);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterProduct(id: number) :Promise<Product>{
        const query = "SELECT * FROM vendas.product where id = ?" ;

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
        const query = "SELECT * FROM vendas.product" ;

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