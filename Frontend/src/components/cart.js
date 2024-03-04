
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cart.css";
import CheckoutModal from "./CheckoutModal";
import generatePDF from "./PDFGenerator";


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckout = (formData) => {


        console.log("Submit button clicked");

        // Process the checkout and generate a bill
        const items = cartItems.map((item) => ({
            name: item.name,
            price: String(item.price), // Convert to string
            quantity: String(item.quantity),
            total: String(item.price * item.quantity), // Convert to string
        }));

        const billData = {
            name: String(formData.name),
            email: String(formData.email),
            phone: String(formData.phone), // Convert to string if not already
            address: String(formData.address),
            items,
        };

        // Generate and download the bill in PDF format
        generatePDF(billData);

        // Optionally, clear the cart or perform other actions
        // Reset the cart for this example
        localStorage.removeItem("cartItems");
        setCartItems([]);

        // Close the modal
        setIsModalOpen(false);
    };
    useEffect(() => {
        // Retrieve cart items from local storage
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity += 1;
        setCartItems(updatedCart);
        saveCartData(updatedCart);
    };

    const handleDecreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setCartItems(updatedCart);
            saveCartData(updatedCart);
        }
    };

    const handleRemoveItem = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        saveCartData(updatedCart);
    };

    const saveCartData = (cartData) => {
        localStorage.setItem("cartItems", JSON.stringify(cartData));
    };

    const calculateItemTotal = (item) => {
        return item.price * item.quantity;
    };

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>Rs {item.price}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleDecreaseQuantity(index)}
                                        size="small"
                                    >
                                        -
                                    </IconButton>
                                    {item.quantity}
                                    <IconButton
                                        onClick={() => handleIncreaseQuantity(index)}
                                        size="small"
                                    >
                                        +
                                    </IconButton>
                                </TableCell>
                                <TableCell>Rs {calculateItemTotal(item)}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleRemoveItem(index)}
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="cart-summary">
                <Typography variant="h6" className="total-price">Total: Rs {calculateCartTotal()}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Proceed to Checkout
                </Button>
            </div>
            <CheckoutModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCheckout={handleCheckout}
            />
        </div>
    );
};

export default Cart;
