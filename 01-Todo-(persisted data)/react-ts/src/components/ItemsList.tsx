import { useEffect, useState } from "react";
import { itemList } from "../Types";
import Item from "./Item";
import { loadFromLs } from "../utils/localStorageHelper";

const ItemsList = ({ item }: { item: itemList }) => {
  const [combinedItems, setCombinedItems] = useState<itemList>([]);

  // checking if items are there in ls if yes loading from there
  useEffect(() => {
    const itemsFromLs = loadFromLs();
    if (itemsFromLs && itemsFromLs.length > 0) {
      setCombinedItems([...itemsFromLs]);
    }
  }, [item]);

  if (combinedItems.length === 0) {
    return <h2 className="my-4">List is empty! add items...</h2>;
  }

  return (
    <div className="itemList border my-2 p-4 rounded">
      <div className="item">
        <ul className="flex flex-col gap-3">
          {combinedItems?.map((each) => {
            return <Item key={each.id} item={each} />;
          })}
        </ul>
      </div>
    </div>
  );
};
export default ItemsList;
