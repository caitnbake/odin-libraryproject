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

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 295, 'no');
addBookToLibrary('Made Up Book', 'Fake Author', 893, 'yes');
addBookToLibrary('Fake Book 2', 'Cait Baker', 86, 'yes');

console.table(myLibrary);
console.log(myLibrary[0].info());