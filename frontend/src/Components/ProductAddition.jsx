/* eslint-disable no-alert */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductAdd.css";
import PropTypes from "prop-types";


const ProductAdd = ({ token }) => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate("/login");
    };

    const postProduct = async () => {
        let product = await {
            title: document.getElementById("Title").value,
            price: document.getElementById("Price").value,
            description: document.getElementById("Description").value,
            city: document.getElementById("City").value,
            image: document.getElementById("ImageLink").value
        };
        const response = await fetch("http://localhost:3001/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify(product)
        });
        if (response.ok) {
            alert("Product added successfully!");
            navigate("/");
        }
        else {
            alert("Failed to add product");
        }
    };


    if (token === "") {
        return (
            <div className='login-container'>
                <h2>Please log in to add a product.</h2>
                <button onClick={redirectToLogin} className='submit-btn log-btn'>Log In</button>
            </div>
        );
    }

    return (
        <div className='add-container'>
            <h3 className="form-title">Sell your stuff!</h3>
            <p className="productAddP">Item title</p>
            <input className='add-inp' type="text" id="Title" />
            <p className="productAddP">Price</p>
            <input className='add-inp' type="number" id="Price" />
            <p className="productAddP">Description</p>
            <textarea maxLength={200} className='add-inp desc' type="text" id="Description" />
            <p className="productAddP">Input your image url</p>
            <input type="text" id="ImageLink" className='add-inp' />
            <p className="productAddP">City</p>
            <input className='add-inp' type="text" id="City" />
            <button className="submit-btn add-btn" onClick={postProduct}>Add!</button>
        </div>
    );
};
ProductAdd.propTypes = {
    token: PropTypes.string.isRequired
};
export default ProductAdd;
