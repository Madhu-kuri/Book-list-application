class Book{
    constructor(title, author, isbn){
    this.title = title;
    this.author = author ;
    this.isbn = isbn ;
    }
}
class UI{
    static displayBooks(){
         const books = Store.getBooks();

         books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class="btn btn-danger btn-sm delete">X</a></td>       
        `;
        list.appendChild(row);
    }
    static deleteBook(el){
       if(el.classList.contains('delete')){
           el.parentElement.parentElement.remove();
       }
    }
 
    //  alert message hame container me or form ke upr dikhayega  ---javascript me showAlert me className use design krne ke liye lete he like danger, success, info 
    //   boostrap me ise <div class="alert alert-success">You form succesful</div>
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //  3sec ke bad alert na dikhe
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }
    //  form submit ke bad form me data na rah uske liye 
    static clearFields(){                                        
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// handle storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') ===null) {
          books = [] ;  
         }   else{
             books = JSON.parse(localStorage.getItem('books'));
         } 
         return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);   // event -- display books
document.querySelector('#book-form').addEventListener('submit',(e) =>
{
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(!title  || !author  || !isbn ){
      UI.showAlert("Please fill all the details" ,"danger");
        return;
    } else {

    const book = new Book(title, author, isbn);
    
    UI.addBookToList(book);   // add book to ui
    Store.addBook(book);        // add book to store
    UI.clearFields();    //clear fields
    }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)       // remove book form ui

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)        // remove form store
});