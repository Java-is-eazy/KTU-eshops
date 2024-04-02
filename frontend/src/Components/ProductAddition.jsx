import React from "react";
import "./ProductAdd.css";

const ProductAdd = () => {
    return (
        <div className='add-container'>
        <h3 className="form-title">Sell your stuff!</h3>
        <p>Item title</p>
        <input className='input' type="text" name="Title" />
        <p>Price</p>
        <input className='input' type="number" name="Price" />
        <p>Description</p>
        <input maxLength={200} className='input' type="text" name="Description" />
        <p>Image</p>
        <input className='input' type="image" name="Image"/>
        <p>City</p>
        <input className='input' type="text" name="Image"/>
        <button className="submit-btn">Add!</button>
      </div>
    );
}

export default ProductAdd;