import React, { useState,useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

useEffect(()=>{
fetch("http://localhost:4000/items")
.then((res)=>res.json())
.then((dta)=>setItems(dta))
},[])

function handleDeleted(data){
  const leftu=items.filter((item)=>item.id !== data.id)
  setItems(leftu)
}
function handleInCart(update){
  const updatedItems = items.map((item) => {
    if (item.id === update.id) {
      return update;
    } else {
      return item;
    }
  });
  setItems(updatedItems);
}

function handleAddItem(newItem){
  setItems([...items,newItem])
}
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleDeleted={handleDeleted} handleInCart={handleInCart} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
