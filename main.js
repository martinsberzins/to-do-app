//source: https://codepen.io/JohnPaulFich/pen/MXmzzM
var enterButton = document.getElementById("enter");
enterButton.addEventListener("click", addListAfterClick);
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var editItemId = null;

function inputLength() {
  return input.value.length;
}

function addListAfterClick() {
  if (inputLength() > 0) {
    //makes sure that an empty input field doesn't create a li
    createListElement();
  }
}

function createListElement() {
  var li;
  const liId = `li-${Date.now()}`;
  //save or edit?
  if (editItemId === null) {
    //save -> add new item
    li = document.createElement("li"); // creates an element "li"

    li.appendChild(document.createTextNode(input.value)); //makes text from input field the li text
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-start"
    );

    ul.appendChild(li); //adds li to ul
  } else {
    //edit -> replace existing item text
    li = document.getElementById(editItemId);
    li.innerText = input.value;
  }

  //add ID to list item
  li.setAttribute("id", liId);
  //CHECKBOX and Text

  // BUTTON SPAN
  let btnSpan = document.createElement("span");
  let editBtn = document.createElement("button");
  let editIcon = document.createElement("i");
  editIcon.classList.add("bi", "bi-pen");
  editBtn.appendChild(editIcon);
  editBtn.classList.add("btn", "btn-secondary", "btn-sm");
  btnSpan.appendChild(editBtn);
  editBtn.addEventListener("click", function () {
    editListItem(liId);
  });

  let dBtn = document.createElement("button");
  let delIcon = document.createElement("i");
  delIcon.classList.add("bi", "bi-trash");
  dBtn.appendChild(delIcon);
  dBtn.classList.add("btn", "btn-secondary", "btn-sm", "ms-2");
  btnSpan.appendChild(dBtn);
  dBtn.addEventListener("click", function () {
    deleteListItem(liId);
  });
  li.appendChild(btnSpan);

  //START STRIKETHROUGH
  // because it's in the function, it only adds it for new items
  li.addEventListener("click", function () {
    crossOut(liId);
  });
  //END STRIKETHROUGH

  // reset
  input.value = ""; //Reset text input field
  editItemId = null;
}

//ADD CLASS DELETE (DISPLAY: NONE)
function deleteListItem(liId) {
  let deleteLi = document.getElementById(liId);
  deleteLi.classList.add("delete");
}

//edit item function
function editListItem(liId) {
  let editLi = document.getElementById(liId);
  input.value = editLi.textContent;
  editItemId = liId;
}

function crossOut(liId) {
  //check if not pressed on edit btn
  if (editItemId === null) {
    let doneLi = document.getElementById(liId);
    //check if found the element
    if (doneLi) {
      doneLi.classList.toggle("done");
    }
  }
}

//LISTEN FOR ENTER
input.addEventListener("keypress", addListAfterKeypress);
function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.key === "Enter") {
    //this now looks to see if you hit "enter"/"return"
    createListElement();
  }
}
