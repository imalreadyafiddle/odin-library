let myLibrary = [];

document.addEventListener("DOMContentLoaded", () => {
  let newBookButton = document.querySelector(".add-book-button");
  newBookButton.addEventListener("click", showBookForm);
});

document.addEventListener("DOMContentLoaded", () => {
  let submitBookButton = document.querySelector(".submit-book-button");
  submitBookButton.addEventListener("click", submitBookForm);
});

// turn this into a class constructor
class Book {
  constructor(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
  }
  info() {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pageCount +
      " pages, " +
      this.isRead
    );
  }
}

// function Book(title, author, pageCount, isRead) {
//   this.title = title;
//   this.author = author;
//   this.pageCount = pageCount;
//   this.isRead = isRead;
// }

// Book.prototype.info = function () {
//   return (
//     this.title +
//     " by " +
//     this.author +
//     ", " +
//     this.pageCount +
//     " pages, " +
//     this.isRead
//   );
// };

function showBookForm() {
  let overlay = document.querySelector(".overlay");
  overlay.classList.toggle("hidden");
  let formWrapper = document.querySelector(".new-book-form");
  formWrapper.classList.toggle("hidden");
}

function submitBookForm() {
  let form = document.querySelector("form");
  let overlay = document.querySelector(".overlay");
  let formWrapper = document.querySelector(".new-book-form");
  let title = document.querySelector(
    "#book-form-title > input[type=text]"
  ).value;
  let author = document.querySelector(
    "#book-form-author > input[type=text]"
  ).value;
  let pages = document.querySelector(
    "#book-form-pages > input[type=number]"
  ).value;
  let checkbox = document.querySelector(
    "#book-form-read > input[type=checkbox]"
  ).checked;
  event.preventDefault();
  if (title == "" || author == "" || pages == "") {
    alert("Please enter missing fields");
    return;
  }
  formWrapper.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  if (checkbox == true) {
    addBookToLibrary(title, author, pages, true);
  } else {
    addBookToLibrary(title, author, pages, false);
  }
  form.reset();
}

function addBookToLibrary(title, author, pageCount, isRead) {
  const newBook = new Book(title, author, pageCount, isRead);
  myLibrary.push(newBook);
  updateLibrary();
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  updateLibrary();
}

function updateLibrary() {
  let libraryCanvas = document.querySelector(".library");
  libraryCanvas.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
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
            `;
    } else {
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
            `;
    }
  }

  let removeButtons = Array.from(document.querySelectorAll(".remove-button"));
  removeButtons.forEach((button) =>
    button.addEventListener("click", () => {
      removeBookFromLibrary(
        myLibrary[button.parentElement.parentElement.dataset.indexNumber]
      );
    })
  );

  let readButtons = Array.from(document.querySelectorAll(".read-button"));
  readButtons.forEach((button) =>
    button.addEventListener("click", () => {
      if (button.classList.contains("is-read")) {
        button.classList.remove("is-read");
        button.innerText = "Unread";
        button.classList.add("is-unread");
        myLibrary[
          button.parentElement.parentElement.dataset.indexNumber
        ].isRead = false;
      } else {
        button.classList.remove("is-unread");
        button.innerText = "Read";
        button.classList.add("is-read");
        myLibrary[
          button.parentElement.parentElement.dataset.indexNumber
        ].isRead = true;
      }
    })
  );
}
