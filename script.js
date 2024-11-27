const myLibrary = [];

function Book(title, author, numberOfPages, status) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
}

function addBookToLibrary(title, author, numberOfPages, status) {
    const newBook = new Book(title, author, numberOfPages, status);
    myLibrary.push(newBook);
}

let container = document.querySelector(".container");

function addBooksToPage() {
    const totalBooks = document.querySelector(".total");
    totalBooks.innerHTML = `<span class="strong">Total:</span> ${myLibrary.length}`;

    const readBooks = document.querySelector(".read");
    const totRead = myLibrary.filter(book => book.status === "Finished");
    readBooks.innerHTML = `<span class="strong">Read:</span> ${totRead.length}`;

    const inProgress = document.querySelector(".inprogress");
    const totInProgress = myLibrary.filter(book => book.status === "Started");
    inProgress.innerHTML = `<span class="strong">In progress:</span> ${totInProgress.length}`;

    const notStarted = document.querySelector(".notstarted");
    const totNotStarted = myLibrary.filter(book => book.status === "Not started");
    notStarted.innerHTML = `<span class="strong">Not started:</span> ${totNotStarted.length}`;

    for (book of myLibrary) {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        const bookTitle = document.createElement("h2");
        bookTitle.classList.add("bookTitle");
        bookTitle.innerText = book.title;
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("bookAuthor");
        bookAuthor.innerHTML = `<span class="strong white">Author:</span> ${book.author}`;
        const bookPages = document.createElement("p");
        bookPages.classList.add("numberOfPages");
        bookPages.innerHTML = `<span class="strong white">Number of pages:</span> ${book.numberOfPages}`;
        const haveRead = document.createElement("p");
        haveRead.innerHTML = `<span class="strong white">Status:</span> ${book.status}`;
        newCard.appendChild(bookTitle);
        newCard.appendChild(bookAuthor);
        newCard.appendChild(bookPages);
        newCard.appendChild(haveRead);
        container.appendChild(newCard);
    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 295, 'Started');
addBookToLibrary('Made Up Book', 'Fake Author', 893, 'Not started');
addBookToLibrary('Fake Book 2', 'Cait Baker', 86, 'Finished');
addBookToLibrary('Long Book Title That Takes', 'J.R.R. Tolkein', 295, 'Not started');
addBookToLibrary('Made Up Book', 'Fake Author', 893, 'Started');
addBookToLibrary('Fake Book 2', 'Cait Baker', 86, 'Not started');
addBooksToPage();