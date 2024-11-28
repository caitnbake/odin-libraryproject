const myLibrary = [];

let selector = {
    container: document.querySelector(".container"),
    openModal: document.querySelector(".addBook"),
    stats: document.querySelector(".stats"),
    popup: document.querySelector(".popup"),
    cancelBtn: document.querySelector(".cancel"),
    addBookBtn: document.querySelector(".confirm"),
    popupForm: document.querySelector(".popupForm"),
}

selector.openModal.addEventListener("click", () => {
    selector.popup.showModal();
    selector.popupForm.reset();
});

selector.cancelBtn.addEventListener("click", () => {
    selector.popup.close();
});

selector.addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    selector.popup.close();
    let newTitle = document.querySelector("#title").value;
    let newAuthor = document.querySelector("#author").value;
    let newPages = document.querySelector("#pages").value;
    let newStatus = document.querySelector('input[name="status"]:checked').value;
    addBookToLibrary(newTitle, newAuthor, newPages, newStatus);
});

function Book(title, author, numberOfPages, status) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.isNew = true;
}

function addBookToLibrary(title, author, numberOfPages, status) {
    const newBook = new Book(title, author, numberOfPages, status);
    myLibrary.push(newBook);
    addBooksToPage();
}

function addBooksToPage() {
    for (book of myLibrary) {
        if (book.isNew === true) {
            let newElement = {
                card: document.createElement("div"),
                bookTitle: document.createElement("h2"),
                bookAuthor: document.createElement("p"),
                bookPages: document.createElement("p"),
                haveRead: document.createElement("p"),
            }

            newElement.card.classList.add("card");
            newElement.bookTitle.classList.add("bookTitle");
            newElement.bookAuthor.classList.add("bookAuthor");

            newElement.bookTitle.innerText = book.title;
            newElement.bookAuthor.innerHTML = `<span class="strong white">Author:</span> ${book.author}`;
            newElement.bookPages.innerHTML = `<span class="strong white">Number of pages:</span> ${book.numberOfPages}`;
            newElement.haveRead.innerHTML = `<span class="strong white">Status:</span> ${book.status}`;

            newElement.card.appendChild(newElement.bookTitle);
            newElement.card.appendChild(newElement.bookAuthor);
            newElement.card.appendChild(newElement.bookPages);
            newElement.card.appendChild(newElement.haveRead);
            selector.container.appendChild(newElement.card);
            book.isNew = false;
        }
    }
    updateStats();
}

function updateStats() {
     let stats = {
        totRead: myLibrary.filter(book => book.status === "Finished"),
        totInProgress: myLibrary.filter(book => book.status === "Started"),
        totNotStarted: myLibrary.filter(book => book.status === "Not started"),
    }

    selector.stats.innerHTML = `<p><span class="strong">Read:</span> ${stats.totRead.length}</p>
    <p><span class="strong">In progress:</span> ${stats.totInProgress.length}</p>
    <p><span class="strong">Not started:</span> ${stats.totNotStarted.length}</p>
    <p><span class="strong">Total:</span> ${myLibrary.length}</p>`;
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 295, 'Started');
addBookToLibrary('Made Up Book', 'Fake Author', 893, 'Not started');
addBookToLibrary('Fake Book 2', 'Cait Baker', 86, 'Finished');
addBookToLibrary('Long Book Title That Takes', 'J.R.R. Tolkein', 295, 'Not started');
addBookToLibrary('Made Up Book', 'Fake Author', 893, 'Started');
addBookToLibrary('Fake Book 2', 'Cait Baker', 86, 'Not started');