'use strict';

function main() {
  // DOM elements
  const bookContainerElement = document.querySelector('.book-container');
  const modalElement = document.querySelector('.modal');
  const modalBtns = [
    document.querySelector('.btn-add-book'),
    document.querySelector('.close-modal'),
  ];
  const bookTitleElement = document.querySelector('#book-title');
  const bookAuthorElement = document.querySelector('#book-author');
  const bookPubYearElement = document.querySelector('#book-publish-year');
  const bookPagesElement = document.querySelector('#book-pages');
  const bookStatusElement = document.querySelector('#book-status');
  const insertBookBtn = document.querySelector('.btn-submit-book');

  // Helper elements
  const bookShelf = [];

  // Functions
  function genBookID() {
    return `book-${Date.now()}`;
  }

  function updateDisplay(arr, displayAll = true) {
    if (!arr || arr.length === 0) return;

    bookContainerElement.innerHTML = '';

    const booksToDisplay = displayAll ? arr : [arr[arr.length - 1]];

    booksToDisplay.forEach(el => {
      const { bookID, title, author, pubYear, pages, status } = el;

      const markdown = `
        <div class="card card-book" data-id="${bookID}">
        <h4>${title}</h4>
        <p>Author: <em>${author}</em></p>
        <p>Published: <em>${pubYear}</em></p>
        <p>Pages: <em>${pages}</em></p>
        <div class="button-container">
            <button class="btn btn-status ${status.toLowerCase()}" data-id="${bookID}">${status.toUpperCase()}</button>
            <button class="btn btn-delete-book" data-id="${bookID}">DELETE</button>
        </div>
        </div>
        `;

      bookContainerElement.insertAdjacentHTML('beforeend', markdown);
    });
  }

  function toggleModalVisibility() {
    modalElement.classList.toggle('open');
  }

  function Book(title, author, pubYear, pages, status) {
    this.bookID = genBookID();
    this.title = title;
    this.author = author;
    this.pubYear = pubYear;
    this.pages = pages;
    this.status = status;
  }

  function createBook() {
    const title = bookTitleElement.value;
    const author = bookAuthorElement.value;
    const pubYear = bookPubYearElement.value;
    const pages = bookPagesElement.value;
    const status = bookStatusElement.value;

    const newBook = new Book(title, author, pubYear, pages, status);

    return newBook;
  }

  function insertBook(e) {
    e.preventDefault();
    bookShelf.push(createBook());
    updateDisplay(bookShelf);
  }

  function findBookByID(bookID) {
    return bookShelf.find(el => el.bookID === bookID);
  }

  function toggleReadStatus(e) {
    const button = e.target.closest('.btn-status');
    if (!button) return;

    const bookID = button.dataset.id;
    const book = findBookByID(bookID);

    if (book) {
      book.status = book.status === 'Read' ? 'Unread' : 'Read';
      updateDisplay(bookShelf);
    }
  }

  function attachHandlers() {
    modalBtns.map(el => {
      el.addEventListener('click', toggleModalVisibility);
    });
    insertBookBtn.addEventListener('click', insertBook);
    bookContainerElement.addEventListener('click', function (e) {
      if (e.target.closest('.btn-status')) {
        toggleReadStatus(e);
      }
    });
  }

  // Function calls
  updateDisplay(bookShelf);
  attachHandlers(modalBtns);
}

main();
