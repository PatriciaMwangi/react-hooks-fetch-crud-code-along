import React from "react";

function Item({ item ,handleInCart,handleDeleted }) {

function deleted(){
fetch(`http://localhost:4000/items/${item.id}`,{
  method:'DELETE',
  headers:{
"Content-tpe":"application/json"
  }
})
.then((res)=>res.json())
.then(()=>handleDeleted(item))
}
  function handleAddToCartClick(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method:'PATCH',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        isInCart:!item.isInCart
      })
    })
      .then((res)=>res.json())
      .then((update)=>handleInCart(update))
    
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={()=>handleAddToCartClick(item.id)}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={()=>deleted(item.id)}>Delete</button>
    </li>
  );
}

export default Item;
