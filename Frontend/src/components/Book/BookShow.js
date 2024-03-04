import { Button } from "@mui/material";
import React, { useState } from "react";
import "./Book.css";


const BookShow = (props) => {
  const [quantity, setQuantity] = useState(1)
  const { _id, name, author, description, price, image } = props.book;

  const [cartItems, setCartItems] = useState([]); // Initialize an empty cart

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Create a copy of the current cart items
    const updatedCart = [...cartItems];

    // Add the product to the cart
    updatedCart.push(product);

    // Update the state with the new cart items
    setCartItems(updatedCart);

    // Store the cart data in local storage 
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Function to retrieve cart items from local storage on component mount
  React.useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  return (
    <div className="card">
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h3>Rs {price}</h3>
      <h3>Quantity : <select value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                        {[...Array(10).keys()].map((x, i) => {
                            return <option value={i + 1}>{i + 1}</option>
                        })}
                    </select></h3>
      <Button onClick={() => addToCart({ name, price , quantity})}>
        Add To Cart
      </Button>


    </div>
  );
};

export default BookShow;
