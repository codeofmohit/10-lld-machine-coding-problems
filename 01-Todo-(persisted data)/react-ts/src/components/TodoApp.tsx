import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addToLs } from "../utils/localStorageHelper";
import ItemsList from "./ItemsList";
import { itemList } from "../Types";

const TodoApp = () => {
  const [itemString, setItemString] = useState<string>("");
  const [itemList, setItemList] = useState<itemList>([]);

  // form submit handler
  const formSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (itemString && itemString !== "") {
      // creating new item object
      const item = {
        id: uuidv4(),
        item: itemString,
        checked: false,
      };
      // adding item to ls
      addToLs(item);
      setItemList([...itemList, item]);
    } else {
      window.alert("invlaid value! enter valid input.");
    }
  };

  return (
    <>
      <form
        className="border rounded p-4 flex flex-col gap-4"
        onSubmit={formSubmitHandler}
      >
        <h2>Todo App (persisted data)</h2>
        <div className="formItems flex gap-2">
          <input
            className="rounded p-2"
            type="text"
            placeholder="add items to list..."
            value={itemString}
            onChange={(e) => {
              setItemString(e.target.value);
            }}
          />
          <button type="submit">Add item</button>
        </div>
      </form>
      <ItemsList item={itemList} />
    </>
  );
};
export default TodoApp;
