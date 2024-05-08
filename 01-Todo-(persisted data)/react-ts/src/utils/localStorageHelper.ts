import { item } from "../Types";

// setting list in LS as [], if not already there
export const loadFromLs = () => {
  const list = window.localStorage.getItem("list");
  if (!list) {
    window.localStorage.setItem("list", JSON.stringify([]));
  } else {
    return JSON.parse(list);
  }
};

// adding item to ls
export const addToLs = (item: item) => {
  const list = window.localStorage.getItem("list");
  if (!list) {
    window.localStorage.setItem("list", JSON.stringify([]));
  } else {
    const parsedList = JSON.parse(list);
    parsedList.push(item);
    window.localStorage.setItem("list", JSON.stringify(parsedList));
  }
};

// update markDone in localStorage
export const updateMarkDoneLs = (id: string, flag: boolean) => {
  const list = window.localStorage.getItem("list");
  if (!list) {
    window.localStorage.setItem("list", JSON.stringify([]));
  } else {
    const parsedList = JSON.parse(list);
    const currentItem = parsedList.find((each: item) => {
      return each.id === id;
    });
    currentItem.checked = flag;
    const updatedItem = currentItem;
    const indexOfCurrentItem = parsedList.indexOf(currentItem);
    parsedList.splice(indexOfCurrentItem, 1, updatedItem);
    window.localStorage.setItem("list", JSON.stringify(parsedList));
  }
};

// update item-text in localStorage
export const updateItemTextLs = (id: string, itemText: string) => {
  const list = window.localStorage.getItem("list");
  if (!list) {
    window.localStorage.setItem("list", JSON.stringify([]));
  } else {
    const parsedList = JSON.parse(list);
    const currentItem = parsedList.find((each: item) => {
      return each.id === id;
    });
    currentItem.item = itemText;
    const updatedItem = currentItem;
    const indexOfCurrentItem = parsedList.indexOf(currentItem);
    parsedList.splice(indexOfCurrentItem, 1, updatedItem);
    window.localStorage.setItem("list", JSON.stringify(parsedList));
  }
};

// deleting item in localStorage
export const deleteItemInLs = (id: string) => {
  const list = window.localStorage.getItem("list");
  if (!list) {
    window.localStorage.setItem("list", JSON.stringify([]));
  } else {
    const parsedList = JSON.parse(list);
    const currentItem = parsedList.find((each: item) => {
      return each.id === id;
    });
    const indexOfCurrentItem = parsedList.indexOf(currentItem);
    parsedList.splice(indexOfCurrentItem, 1);
    window.localStorage.setItem("list", JSON.stringify(parsedList));
  }
};
