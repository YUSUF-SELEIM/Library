let myLibrary = [];
var addButton = document.getElementById("add-button");
var inputOverlay = document.getElementById("input-overlay");
var submitButton = document.getElementById("submit-button");
var closeButton = document.getElementById("close-button");

var bookName = document.getElementById("book-name");
var bookAuthor = document.getElementById("book-author");
var noPages = document.getElementById("no-pages");
var readCheck = document.getElementById("read-check");
var form = document.querySelector("form");
var showError = document.getElementById("show-error");
var booksGrid = document.getElementById("books-grid");

readCheck.addEventListener("click", function () {
    if (readCheck.checked) {
        readCheck.value = "on";
    } else {
        readCheck.value = "off";
    }
});

addButton.addEventListener("click", function () {
    inputOverlay.classList.remove("hidden");
});

closeButton.addEventListener("click", function () {
    inputOverlay.classList.add("hidden");
    form.reset();
    showError.textContent = "";
});

submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (!isDuplicate()) {
        inputOverlay.classList.add("hidden");
        addBookToLibrary();
        createBookCard();
    } else {
        showError.textContent = "Book Already Exists !";
        form.reset();
    }
});

function Book(name, author, noPages, isRead, drawn) {
    this.name = name;
    this.author = author;
    this.noPages = noPages;
    this.isRead = isRead;
    this.drawn = false;
}

function addBookToLibrary() {
    var book = new Book(
        bookName.value,
        bookAuthor.value,
        noPages.value,
        readCheck.value
    );
    myLibrary.push(book);
    console.log(book);
    form.reset();
    showError.textContent = "";
}

function isDuplicate() {
    return myLibrary.some(function (book) {
        return book.name === bookName.value;
    });
}

function createBookCard() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].drawn) {
            continue;
        }
        var card = document.createElement("div");
        var nameSpan = document.createElement("span");
        var authorSpan = document.createElement("span");
        var pagesNoSpan = document.createElement("span");
        var readOrNot = document.createElement("input");
        readOrNot.type = "checkbox";
        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function (e) {
            e.preventDefault();
            myLibrary.splice(i, 1);
            card.remove();
            console.log("removed");
        });

        if (myLibrary[i].isRead == "on") {
            readOrNot.checked = true;
        }

        readOrNot.addEventListener("click", function () {
            if (readOrNot.checked) {
                myLibrary[i].isRead = "on";
            } else {
                myLibrary[i].isRead = "off";
            }
            console.log(myLibrary[i]);
        });

        nameSpan.textContent = myLibrary[i].name;
        authorSpan.textContent = myLibrary[i].author;
        pagesNoSpan.textContent = myLibrary[i].noPages;

        nameSpan.classList.add("info-span");
        authorSpan.classList.add("info-span");
        pagesNoSpan.classList.add("info-span");
        removeButton.classList.add("remove-button");
        card.classList.add("dark:bg-gray-800");
        card.classList.add("book-card");

        card.append(nameSpan);
        card.append(authorSpan);
        card.append(pagesNoSpan);
        card.append(readOrNot);
        card.append(removeButton);

        booksGrid.append(card);
        myLibrary[i].drawn = true;
    }
}

