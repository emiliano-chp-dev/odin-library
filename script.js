'use strict';

function main() {
  // DOM elements
  const bookContainerElement = document.querySelector('.book-container');
  const modalElement = document.querySelector('.modal');
  const modalBtns = [
    document.querySelector('.btn-add-book'),
    document.querySelector('.close-modal'),
  ];
  const cardFormElement = document.querySelector('.card.card-form');
  const inputElements = [
    ...document.querySelectorAll('.modal .card.card-form li input'),
    document.querySelector('.modal .card.card-form li select'),
  ];
  const insertBookBtn = document.querySelector('.btn-submit-book');

  // Helper elements
  const bookShelf = [];

  // Functions
  function genBookID() {
    return `book-${Date.now()}`;
  }

  function updateDisplay(arr, displayAll = true) {
    bookContainerElement.innerHTML = '';

    if (!arr || arr.length === 0) return;

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

  function closeModalOnClickOutside(e) {
    if (
      modalElement.classList.contains('open') &&
      !cardFormElement.contains(e.target)
    ) {
      toggleModalVisibility();
    }
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
    const [title, author, pubYear, pages, status] = inputElements.map(
      el => el.value
    );

    const newBook = new Book(title, author, pubYear, pages, status);

    return newBook;
  }

  function checkFormInputs() {
    return inputElements.some(el => el.value.trim() === '');
  }

  function clearFormInputs() {
    inputElements.map(el => (el.value = ''));
  }

  function insertBook(e) {
    e.preventDefault();
    if (checkFormInputs()) {
      alert('Please fill out the form.');
      return;
    }
    bookShelf.push(createBook());
    updateDisplay(bookShelf);
    clearFormInputs();
  }

  function findBookByID(bookID) {
    return bookShelf.find(el => el.bookID === bookID);
  }

  function findBookIndexByID(bookID) {
    return bookShelf.findIndex(book => bookID === bookID);
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

  function deleteBook(e) {
    const button = e.target.closest('.btn-delete-book');
    if (!button) return;
    const bookID = button.dataset.id;

    const bookIndex = findBookIndexByID(bookID);

    if (bookIndex !== -1) {
      bookShelf.splice(bookIndex, 1);
      updateDisplay(bookShelf);
    }
  }

  function attachHandlers() {
    modalBtns.map(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleModalVisibility();
      });
    });
    document.addEventListener('click', closeModalOnClickOutside);
    insertBookBtn.addEventListener('click', insertBook);
    bookContainerElement.addEventListener('click', function (e) {
      if (e.target.closest('.btn-status')) {
        toggleReadStatus(e);
      } else if (e.target.closest('.btn-delete-book')) {
        deleteBook(e);
      }
    });
  }

  // Function calls
  updateDisplay(bookShelf);
  attachHandlers(modalBtns);
}

main();
