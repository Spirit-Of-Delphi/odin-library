const myLibrary = [];

function Book(title, author, pages, hasRead){
    if (!new.target){
        throw Error("You must use the new operator to call constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.bookID = crypto.randomUUID();
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? "read!" : "not read yet."}`;
}

Book.prototype.toggleRead = function() {
    this.hasRead = !this.hasRead;
};

function addBookToLibrary(title, author, pages, hasRead){
    const normalizedTitle = title.trim().toLowerCase();
    const normalizedAuthor = author.trim().toLowerCase();

    const isDuplicate = myLibrary.some(book => 
        book.title.trim().toLowerCase() === normalizedTitle &&
        book.author.trim().toLowerCase() === normalizedAuthor &&
        book.pages == pages
    );

    if (isDuplicate) {
        alert("Duplicate book detected. Not added.");
        return;
    }

    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.getElementById("library-container");
    libraryContainer.replaceChildren();

    for (const book of myLibrary) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        bookContainer.dataset.bookId = book.bookID;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement("p");
        status.textContent = `Status: ${book.hasRead ? "Read" : "Not read yet"}`;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.hasRead ? "Mark as Unread" : "Mark as Read";
        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.bookID === book.bookID);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBooks();
            }
        });

        bookContainer.append(title, author, pages, status, toggleBtn, removeBtn);
        libraryContainer.appendChild(bookContainer);
    }
}


document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const hasRead = document.getElementById("hasRead").checked;

    addBookToLibrary(title, author, pages, hasRead);
    displayBooks();

    this.reset();
});

addBookToLibrary("Brave New World", "Aldous Huxley", 268, false);

displayBooks();