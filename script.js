const myLibrary = [];
let counter = 0;

let selector = {
    container: document.querySelector(".container"),
    openModal: document.querySelector(".addBook"),
    stats: document.querySelector(".stats"),
    popup: document.querySelector(".popup"),
    cancelBtn: document.querySelector(".cancel"),
    addBookBtn: document.querySelector(".confirm"),
    popupForm: document.querySelector(".popupForm"),
    deleteBtn: document.querySelector(".delete"),
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
    this.numberOfPages = +numberOfPages;
    this.status = status;
    this.isNew = true;
    this.idNumber = counter++;
    this.statusChange = false;
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
                deleteBtn: document.createElement("button"),
                inProgBtn: document.createElement("button"),
                finishedBtn: document.createElement("button"),
                notStartedBtn: document.createElement("button"),
            }

            newElement.card.classList.add("card");
            newElement.bookTitle.classList.add("bookTitle");
            newElement.bookAuthor.classList.add("bookAuthor");
            newElement.deleteBtn.classList.add("delete");
            newElement.inProgBtn.classList.add("inProgBtn");
            newElement.finishedBtn.classList.add("finishedBtn");
            newElement.notStartedBtn.classList.add("notStartedBtn");

            newElement.inProgBtn.id = book.idNumber;
            newElement.finishedBtn.id = book.idNumber;
            newElement.notStartedBtn.id = book.idNumber;
            newElement.deleteBtn.id = book.idNumber;

            newElement.bookTitle.innerText = book.title;
            newElement.bookAuthor.innerHTML = `<span class="strong white">Author:</span> ${book.author}`;
            newElement.bookPages.innerHTML = `<span class="strong white">Number of pages:</span> ${book.numberOfPages}`;
            newElement.haveRead.innerHTML = `<span class="strong white">Status:</span> ${book.status}<p class="strong white padtop">Change to:</p>`;
            newElement.deleteBtn.innerText = "Delete?";
            newElement.inProgBtn.innerText = "In progress";
            newElement.notStartedBtn.innerText = "Not Started";
            newElement.finishedBtn.innerText = "Finished";

            newElement.card.appendChild(newElement.bookTitle);
            newElement.card.appendChild(newElement.bookAuthor);
            newElement.card.appendChild(newElement.bookPages);
            newElement.card.appendChild(newElement.haveRead);
            if (book.status === "Not started") {
                newElement.card.appendChild(newElement.inProgBtn);
                newElement.card.appendChild(newElement.finishedBtn);
            } else if (book.status === "Started") {
                newElement.card.appendChild(newElement.notStartedBtn);
                newElement.card.appendChild(newElement.finishedBtn);
            } else {
                newElement.card.appendChild(newElement.notStartedBtn);
                newElement.card.appendChild(newElement.inProgBtn);
            }
            newElement.card.appendChild(newElement.deleteBtn);
            selector.container.prepend(newElement.card);

            book.isNew = false;

            newElement.deleteBtn.addEventListener("click", (event) => deleteBtnListener(event));
            newElement.inProgBtn.addEventListener("click", (event) => inProgListener(event));
            newElement.finishedBtn.addEventListener("click", (event) => finishedListener(event));
            newElement.notStartedBtn.addEventListener("click", (event) => notStartedListener(event));
        }
    }
    updateStats();
}

function deleteBtnListener(event) {
    const index = myLibrary.findIndex(book => book.idNumber == event.target.id);
    myLibrary.splice(index, 1);
    event.target.closest('div.card').remove();
    updateStats();
}

function notStartedListener(event) {
    const index = myLibrary.findIndex(book => book.idNumber == event.target.id);
    myLibrary[index].status = 'Not started';
    const textToUpdate = event.target.previousElementSibling;
    textToUpdate.innerHTML = `<span class="strong white">Status:</span> Not started<p class="strong white padtop">Change to:</p>`;
    const nextButton = event.target.nextElementSibling;
    const deleteBtn = nextButton.nextElementSibling;
    nextButton.remove();
    event.target.remove();
    deleteBtn.remove();

    let parent = textToUpdate.parentElement;
    let inProgBtn = document.createElement("button");
    let finishedBtn = document.createElement("button");
    let newDeleteBtn = document.createElement("button");

    inProgBtn.classList.add("inProgBtn");
    finishedBtn.classList.add("finishedBtn");
    newDeleteBtn.classList.add("delete");

    inProgBtn.id = myLibrary[index].idNumber;
    finishedBtn.id = myLibrary[index].idNumber;
    newDeleteBtn.id = myLibrary[index].idNumber;

    newDeleteBtn.innerText = "Delete?";
    finishedBtn.innerText = "Finished";
    inProgBtn.innerText = "In Progress";

    parent.appendChild(inProgBtn);
    parent.appendChild(finishedBtn);
    parent.appendChild(newDeleteBtn);

    newDeleteBtn.addEventListener("click", (event) => deleteBtnListener(event))
    inProgBtn.addEventListener("click", (event) => inProgListener(event));
    finishedBtn.addEventListener("click", (event) => finishedListener(event));
    updateStats();
}

function finishedListener(event) {
    const index = myLibrary.findIndex(book => book.idNumber == event.target.id);
    myLibrary[index].status = 'Finished';
    const notTextToUpdate = event.target.previousElementSibling;
    const textToUpdate = notTextToUpdate.previousElementSibling;
    textToUpdate.innerHTML = `<span class="strong white">Status:</span> Finished<p class="strong white padtop">Change to:</p>`;
    const nextButton = event.target.nextElementSibling;
    const previous = event.target.previousElementSibling;
    nextButton.remove();
    event.target.remove();
    previous.remove();

    let parent = textToUpdate.parentElement;
    let inProgBtn = document.createElement("button");
    let notStartedBtn = document.createElement("button");
    let newDeleteBtn = document.createElement("button");

    inProgBtn.classList.add("inProgBtn");
    notStartedBtn.classList.add("notStartedBtn");
    newDeleteBtn.classList.add("delete");

    inProgBtn.id = myLibrary[index].idNumber;
    notStartedBtn.id = myLibrary[index].idNumber;
    newDeleteBtn.id = myLibrary[index].idNumber;

    newDeleteBtn.innerText = "Delete?";
    notStartedBtn.innerText = "Not Started";
    inProgBtn.innerText = "In Progress";

    parent.appendChild(notStartedBtn);
    parent.appendChild(inProgBtn);
    parent.appendChild(newDeleteBtn);

    newDeleteBtn.addEventListener("click", (event) => deleteBtnListener(event))
    inProgBtn.addEventListener("click", (event) => inProgListener(event));
    notStartedBtn.addEventListener("click", (event) => notStartedListener(event));
    updateStats();
}

function inProgListener(event) {
    const index = myLibrary.findIndex(book => book.idNumber == event.target.id);
    myLibrary[index].status = 'Started';
    const previousSibling = event.target.previousElementSibling;
    const itemStaying = previousSibling.previousElementSibling;

    if (previousSibling.tagName.toLowerCase() !== 'button') {
        previousSibling.innerHTML = `<span class="strong white">Status:</span> Started<p class="strong white padtop">Change to:</p>`;
        const nextButton = event.target.nextElementSibling;
        const deleteBtn = nextButton.nextElementSibling;
        deleteBtn.remove();
        nextButton.remove();
    } else {
        const textToUpdate = previousSibling.previousElementSibling;
        textToUpdate.innerHTML = `<span class="strong white">Status:</span> Started<p class="strong white padtop">Change to:</p>`;
        const deleteBtn = event.target.nextElementSibling;
        previousSibling.remove();
        deleteBtn.remove();
    }
    
    event.target.remove();

    let parent = itemStaying.parentElement;
    let finishedBtn = document.createElement("button");
    let notStartedBtn = document.createElement("button");
    let newDeleteBtn = document.createElement("button");

    finishedBtn.classList.add("finishedBtn");
    notStartedBtn.classList.add("notStartedBtn");
    newDeleteBtn.classList.add("delete");

    finishedBtn.id = myLibrary[index].idNumber;
    notStartedBtn.id = myLibrary[index].idNumber;
    newDeleteBtn.id = myLibrary[index].idNumber;

    newDeleteBtn.innerText = "Delete?";
    notStartedBtn.innerText = "Not Started";
    finishedBtn.innerText = "Finished";

    parent.appendChild(notStartedBtn);
    parent.appendChild(finishedBtn);
    parent.appendChild(newDeleteBtn);

    newDeleteBtn.addEventListener("click", (event) => deleteBtnListener(event));
    finishedBtn.addEventListener("click", (event) => finishedListener(event));
    notStartedBtn.addEventListener("click", (event) => notStartedListener(event));
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

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 295, 'Finished');
addBookToLibrary('Think Like a Programmer', 'V. Anton Spraul', 256, 'Started');
addBookToLibrary('I was Anastasia', 'Ariel Lawhon', 352, 'Not started');
addBookToLibrary('Home Front', 'ristin Hannah', 400, 'Not started');
addBookToLibrary('The Things We Cannot Say', 'Kelly Rimmer', 432, 'Not started');
addBookToLibrary('How to Stop Time', 'Matt Haig', 336, 'Finished');