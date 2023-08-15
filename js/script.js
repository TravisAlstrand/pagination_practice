// ELEMENT SELECTORS
const authorContainer = document.querySelector("#authorContainer");
const paginationList = document.querySelector("#paginationList");

// console.log(authors);
const authorsPerPage = 3;

/* This function will handle calculating how many buttons are
needed and dynamically add them to the page */

function handlePagination(array) {
  // 1. Create a variable to store the number of buttons needed.
  //    The math should be (the length of the array divided by the authorsPerPage) rounded up ????
  //    Hint: Math.ceil()
  const numberOfButtons = Math.ceil(array.length / authorsPerPage);

  // 2-a. Start a loop to the length of the number of buttons calculated above.
  // 2-b. Inside, create a variable storing a template literal of the HTML markup of a button
  //      (see example in index.html lines 34 - 36).
  // 2-c. Then add this variable to the paginationList element
  //      Hint: insertAdjacentHTML()
  for (let i = 1; i <= numberOfButtons; i++) {
    const html = `
      <li>
        <button>${i}</button>
      </li>
    `;
    paginationList.insertAdjacentHTML("beforeend", html);
  }
}

/* This function will handle calculating how many and which
authors to show on the current page and dynamically add them */

function showPage(array, page) {
  // 3. Create a variable to represent which author to start with on the page.
  //    The math should be (the page multiplied by the authorsPerPage) minus the authorsPerPage ????
  // 4. Create a variable to represent which author to end with on the page.
  //    The math should be (the page multiplied by the authorsPerPage) minus one ????
  const start = page * authorsPerPage - authorsPerPage;
  const end = page * authorsPerPage - 1;
  // 5. Reset the authorContainer's content to nothing to prevent previous cards staying on the page
  authorContainer.innerHTML = "";

  // 6-a. Start a loop to the length of the array's length
  // 6-b. Inside, create a conditional checking if `i` is...
  //      - greater than or equal to the start variable
  //      - less than or equal to the end variable
  // 6-c. If true, create a variable storing a template literal of the HTML markup of an author card.
  //      (see example in index.html lines 17 - 28).
  //      Hint: You'll need to dynamically add each author's information
  // 6-d. Then add this variable to the authorContainer element
  //      Hint: insertAdjacentHTML()
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

/* This function will handle adding and removing
the active class from the correct buttons */

function handleActiveClass(button) {
  // 7-a. Create a conditional checking if a button was passed as an argument
  //      Hint: not null
  // 7-b. If true...
  //      - Select the button that currently has the `active` class and remove that class from it.
  //      - Add the `active` class to the button passed in.
  //      If false...
  //      - Select the first button on the page and add the `active` class to it
  //      Hint: querySelector()
  if (button) {
    const activeButton = document.querySelector(".active");
    activeButton.classList.remove("active");
    button.classList.add("active");
  } else {
    button = document.querySelector("button");
    button.classList.add("active");
  }
}

/* This event listener will handle calling our
functions above to change the page & active button  */

paginationList.addEventListener("click", (e) => {
  // 8-a. Make sure the user has clicked a `button`
  //      Hint: e.target
  // 8-b. If true...
  //      - Call the showPage() passing `authors` and the content of the button just clicked.
  //      - Call the handleActiveClass() passing the button just clicked.
  const buttonClicked = e.target.closest("button");

  if (buttonClicked) {
    showPage(authors, buttonClicked.innerHTML);
    handleActiveClass(buttonClicked);
  }
});

/* These function calls are needed to initialize the page */

handlePagination(authors);
showPage(authors, 1);
handleActiveClass(null);
