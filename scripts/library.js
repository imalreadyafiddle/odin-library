let myLibrary = [];



function Book(title, author, pageCount, isRead) {
    // creates a new book
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pageCount + " pages, " + this.isRead;
}

function addBookToLibrary (title, author, pageCount, isRead) {
    const newBook = new Book(title, author, pageCount, isRead)
    myLibrary.push(newBook);
    updateLibrary();
}


function removeBookFromLibrary (index) {
    myLibrary.splice(index, 1);
    updateLibrary();
}

function updateLibrary () {
    let libraryCanvas = document.querySelector('.library');
    libraryCanvas.innerHTML = "";
    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].isRead == false) {
            libraryCanvas.innerHTML += `
            <div class="book-card" data-index-number="${i}">
            <p class="book-name">${myLibrary[i].title}</p>
            <p class="book-author">${myLibrary[i].author}</p>
            <p class="book-pages">${myLibrary[i].pageCount} Pages</p>
            <div class="card-buttons">
                <button class="read-button is-unread">Unread</button>
                <button class="remove-button">Remove</button>
            </div>
        </div>
            `
        }
        else {
            libraryCanvas.innerHTML += `
            <div class="book-card" data-index-number="${i}">
            <p class="book-name">${myLibrary[i].title}</p>
            <p class="book-author">${myLibrary[i].author}</p>
            <p class="book-pages">${myLibrary[i].pageCount} Pages</p>
            <div class="card-buttons">
                <button class="read-button is-read">Read</button>
                <button class="remove-button">Remove</button>
            </div>
        </div>
            `
        }
    }

    let removeButtons = Array.from(document.querySelectorAll('.remove-button'));
    removeButtons.forEach(button => button.addEventListener('click', () => {
        removeBookFromLibrary(myLibrary[button.parentElement.parentElement.dataset.indexNumber]);
    }));

    let readButtons = Array.from(document.querySelectorAll('.read-button'));
    readButtons.forEach(button => button.addEventListener('click', () => {
        if (button.classList.contains('is-read')) {
            button.classList.remove('is-read');
            button.innerText = ('Unread');
            button.classList.add('is-unread');
            myLibrary[button.parentElement.parentElement.dataset.indexNumber].isRead = false;
        } else {
            button.classList.remove('is-unread');
            button.innerText = ('Read');
            button.classList.add('is-read');
            myLibrary[button.parentElement.parentElement.dataset.indexNumber].isRead = true;
        }
    }));
}