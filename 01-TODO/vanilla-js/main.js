// defining ui variables
const inputString = document.querySelector("#item-input");
const btnAddItem = document.querySelector(".add-item");
const divTodoList = document.querySelector(".todo-list > ol");
const form = document.querySelector("form");
const itemCheckbox = document.querySelector(".todo-list > ol > li > input");
const itemCrossIon = document.querySelector(
  ".todo-list > ol > li > span.delete"
);
const todoListSectionHeader = document.querySelector(".todo-list-section > h1");

// local storage data checking and if there loading from there on load
const locadFromLs = () => {
  let list = localStorage.getItem("list");
  if (list) {
    list = JSON.parse(list);
  } else {
    list = [];
    localStorage.setItem("list", JSON.stringify(list));
  }
  if (list.length > 0) {
    list.forEach((item) => {
      makeListItemOnUI(item);
    });
  }
};

// adding item to local storage
const addToLocalStorage = (li) => {
  if (typeof li === "string") {
    let list = JSON.parse(localStorage.getItem("list"));
    list.push(li);
    localStorage.setItem("list", JSON.stringify(list));
  } else {
    localStorage.setItem("list", JSON.stringify(li));
  }
};

// function to create list item on UI, taking input as string value
const makeListItemOnUI = (input) => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="mr-2 item-text">${input}</span> <input type="checkbox" class="mr-2" onChange="markItDoneHandler(this)"> <span class="update mr-2" onClick="updateItemHandler(this)" title="update"> ✏️ </span><span title="delete" class="delete mr-2" onClick="deleteItemHandler(this)"> ❌ </span>`;
  li.className = "my-3 cursor-pointer";
  divTodoList.appendChild(li);
};

// form submit handler
const handleOnSubmit = (e) => {
  e.preventDefault();
  // chekcing if input string is empty showing alert
  const input = inputString.value;
  if (input.length === 0) {
    window.alert("input is empty! provide a value.");
    return;
  }

  // clearing the input field value on submit click
  inputString.value = "";

  // creating a li on runtime and appent it to the ol when onclick : showing onto UI
  makeListItemOnUI(input);

  // adding the list item to lcoal storage
  addToLocalStorage(input);

  // checking items in localStorage
  const areItems = JSON.parse(localStorage.getItem("list")).length;
  if (areItems !== 0) {
    // no items in localStorage list
    todoListSectionHeader.textContent = "Todo List";
  }
};

// onLoadHandler handler || onload handler
const onLoadHandler = () => {
  // checking for data in local storage : if there loding from there
  locadFromLs();
  // checking items in localStorage
  const areItems = JSON.parse(localStorage.getItem("list")).length;
  if (areItems === 0) {
    // no items in localStorage list
    todoListSectionHeader.textContent = "List is empty! Add items...";
  }
};

// marking item done on click of checkbox
const markItDoneHandler = (element) => {
  const isChecked = element.checked;
  const currentItem = element.parentElement.querySelector(".item-text");
  isChecked
    ? currentItem.classList.add("line-through")
    : currentItem.classList.remove("line-through");
};

// deleting item on click of cross icon
const deleteItemHandler = (element) => {
  try {
    element.parentElement.remove();
    // updating localStorage with current DOM list
    localStorageReplaceWithCurrentDomList();
  } catch (error) {
    console.log(error);
  }
  // checking items in localStorage
  const areItems = JSON.parse(localStorage.getItem("list")).length;
  if (areItems === 0) {
    // no items in localStorage list
    todoListSectionHeader.textContent = "List is empty! Add items...";
  }
};

// function to replace current dom list to localStorage list on update and delete
const localStorageReplaceWithCurrentDomList = () => {
  // replacing current dom list to localStorage list to update localStorage
  const currentLis = divTodoList.querySelectorAll("li > span.item-text");
  const listUpdated = [];
  currentLis.forEach((each) => {
    listUpdated.push(each.textContent);
  });
  addToLocalStorage(listUpdated);
};

// update item handler
const updateItemHandler = (element) => {
  let currentItem = element.parentElement.querySelector("span.item-text");
  if (currentItem) {
    try {
      const editedItemText = window.prompt(
        "Edit the list item : ",
        currentItem.textContent
      );
      editedItemText.length === 0
        ? window.alert("can not updated to empty value! try again")
        : (currentItem.textContent = editedItemText);
      // updating localStorage with current DOM list
      localStorageReplaceWithCurrentDomList();
    } catch (error) {
      console.log(error);
    }
  }
};

//form submit event listener
form.addEventListener("submit", handleOnSubmit);

// onLoad event listener
document.addEventListener("DOMContentLoaded", onLoadHandler);
