// ELEMENT SELECTORS
const authorContainer = document.querySelector("#authorContainer");
const paginationList = document.querySelector("#paginationList");
let activeButton = document.querySelector(".active");

// console.log(authors);
const authorsPerPage = 3;

function handlePagination(array) {
  const numberOfPages = Math.ceil(array.length / authorsPerPage);

  for (let i = 1; i <= numberOfPages; i++) {
    const html = `
      <li>
        <button>${i}</button>
      </li>
    `;
    paginationList.insertAdjacentHTML("beforeend", html);
  }

  if (!activeButton) {
    activeButton = document.querySelector("button");
    activeButton.classList.add("active");
  }
}

function showPage(array, page) {
  const start = page * authorsPerPage - authorsPerPage;
  const end = page * authorsPerPage - 1;
  authorContainer.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    if (i >= start && i <= end) {
      const html = `
        <div class="author-card">
          <div class="card-header">
            <img src="${authors[i].image}" alt="photo of ${authors[i].name}" />
          </div>
          <div class="card-content">
            <h2 class="title">${authors[i].name}</h2>
            <p>${authors[i].text}</p>
          </div>
        </div>
      `;

      authorContainer.insertAdjacentHTML("beforeend", html);
    }
  }
}

paginationList.addEventListener("click", (e) => {
  const buttonClicked = e.target.closest("button");

  if (buttonClicked) {
    activeButton.classList.remove("active");
    activeButton = buttonClicked;
    activeButton.classList.add("active");
    showPage(authors, activeButton.innerHTML);
  }
});

handlePagination(authors);
showPage(authors, 1);
