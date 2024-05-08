import { useRef } from "react";
import { item } from "../Types";
import {
  updateMarkDoneLs,
  updateItemTextLs,
  deleteItemInLs,
} from "../utils/localStorageHelper";

const Item = ({ item }: { item: item }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const liRef: any = useRef();

  // markitdone item hanlder
  const handleMarkItDone = (id: string) => {
    const isChecked = liRef.current.querySelector("span>input").checked;
    const spanItemText = liRef.current.querySelector("span.item-text");
    if (isChecked) {
      spanItemText.classList.add("line-through");
      // updating in Ls
      updateMarkDoneLs(id, isChecked);
    } else {
      spanItemText.classList.remove("line-through");
      // updating in Ls
      updateMarkDoneLs(id, isChecked);
    }
  };

  // update item handler
  const handleUpdate = (id: string) => {
    const updatedItem = window.prompt("Update item : ", item.item);
    const domTextToReplace = liRef.current.querySelector("span.item-text");
    // updating item in ui
    domTextToReplace.textContent = updatedItem;
    // updating item text in localStorage as well
    updatedItem === "" && window.alert("update can not be blank! try again.");
    updatedItem && updateItemTextLs(id, updatedItem);
  };

  // delete item hanlder
  const handleDeleteItem = (id: string) => {
    //  removing item from ui
    const domItem = liRef.current;
    domItem && domItem.classList.add("hidden");
    // deleting item from local storage
    deleteItemInLs(id);
  };

  console.log(item);

  return (
    <li className="flex gap-2 justify-center " ref={liRef}>
      <span className={`item-text ${item.checked ? " line-through" : ""}`}>
        {item.item}
      </span>
      <span>
        <input
          type="checkbox"
          onChange={() => {
            handleMarkItDone(item.id);
          }}
        />
      </span>
      <span
        className="cursor-pointer"
        onClick={() => {
          handleUpdate(item.id);
        }}
      >
        ✏️
      </span>
      <span
        className="cursor-pointer"
        onClick={() => {
          handleDeleteItem(item.id);
        }}
      >
        ❌
      </span>
    </li>
  );
};
export default Item;
