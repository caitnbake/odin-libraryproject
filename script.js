const myLibrary = [];

function Book(title, author, numberOfPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.haveRead = haveRead;
    this.info = function() {
        return `${title} by ${author}, ${numberOfPages} pages, ${haveRead === "yes" ? "read" : "not read yet"}`;
    }
}

function addBookToLibrary(title, author, numberOfPages, haveRead) {
    const newBook = new Book(title, author, numberOfPages, haveRead);
    myLibrary.push(newBook);
}

let container = document.querySelector(".container");

function addBooksToPage() {
    for (book of myLibrary) {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        const bookTitle = document.createElement("h2");
        bookTitle.classList.add("bookTitle");
        bookTitle.innerText = book.title;
        const bookAuthor = document.createElement("h3");
        bookAuthor.classList.add("bookAuthor");
        bookAuthor.innerText = book.author;
        const bookPages = document.createElement("p");
        bookPages.classList.add("numberOfPages");
        bookPages.innerText = `Number of pages: ${book.numberOfPages}`;
        const haveRead = document.createElement("checkbox");
        haveRead.innerText = `Read: ${book.haveRead}`;
        newCard.appendChild(bookTitle);
        newCard.appendChild(bookAuthor);
        newCard.appendChild(bookPages);
        newCard.appendChild(haveRead);
        container.appendChild(newCard);
    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 295, 'no');
addBookToLibrary('Made Up Book', 'Fake Author', 893, 'yes');
addBookToLibrary('Fake Book 2', 'Cait Baker', 86, 'yes');
addBooksToPage();