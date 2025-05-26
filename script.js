'use strict';

function main() {
  // DOM elements
  const bookContainerElement = document.querySelector('.book-container');
  const modalElement = document.querySelector('.modal');
  const modalBtns = [
    document.querySelector('.btn-add-book'),
    document.querySelector('.close-modal'),
  ];

  function toggleModalVisibility() {
    modalElement.classList.toggle('open');
  }

  function attachHandlers(arr) {
    arr.map(el => {
      el.addEventListener('click', toggleModalVisibility);
    });
  }

  attachHandlers(modalBtns);
}

main();
