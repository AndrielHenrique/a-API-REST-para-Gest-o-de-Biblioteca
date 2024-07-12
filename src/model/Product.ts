export class Product{
   ;
    title :  string ;
    author :  string ;
    publishedDate :  string ;
    isbn :  string ;
    pages :  number ;
    language :  string ;
    publisher :  string ;
    id : number;

    constructor(title?:  string, author?:  string ,publishedDate?:  string ,isbn?:  string ,pages?:  number ,language?:  string ,publisher?:  string ,id? : number){
        this.title = title || '';
        this.author = author || '',
        this.publishedDate = publishedDate|| '',
        this.isbn = isbn || '',
        this.pages = pages || 0;
        this.language = language || '',
        this.publisher = publisher || '',
        this.id = id || 0;
    }
}