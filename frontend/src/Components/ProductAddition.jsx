import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductAdd.css";

const ProductAdd = ({ token }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const filteredFiles = files.filter(file =>
            file.type === 'image/jpeg' || file.type === 'image/png'
        );
        setSelectedFiles(prevFiles => [...prevFiles, ...filteredFiles]);
    };

    const handleDelete = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const handleUpload = () => {
        console.log(selectedFiles);
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    const postProduct = async () => {
        let product = await {
            title: document.getElementById('Title').value,
            price: document.getElementById('Price').value,
            description: document.getElementById('Description').value,
            city: document.getElementById('City').value,
            image: document.getElementById('ImageLink').value
        };
        const response = await fetch('http://localhost:3001/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify(product)
        });
        if (response.ok) {
            alert('Product added successfully!');
            navigate('/');
        }
        else {
            alert('Failed to add product');
        }
    };


    if (token === '') {
        return (
            <div className='login-container'>
                <h2>Please log in to add a product.</h2>
                <button onClick={redirectToLogin} className='submit-btn log-btn'>Log In</button>
            </div>
        );
    }

    return (
        <div className='add-container' style={{marginTop:"5rem"}}>
            <h3 className="form-title">Sell your stuff!</h3>
            <p className="productAddP">Item title</p>
            <input className='input' type="text" id="Title" />
            <p className="productAddP">Price</p>
            <input className='input' type="number" id="Price" />
            <p className="productAddP">Description</p>
            <input maxLength={200} className='input' type="text" id="Description" />
            <p className="productAddP">Input your image url</p>
            <input type="text" id="ImageLink" className='input' />
            {/* {selectedFiles.length > 0 && (
                <div className='display-img'>
                    {selectedFiles.map((file, index) => (
                        <div key={index} style={{ margin: '5px', textAlign: 'center', cursor: 'pointer' }}>
                            <img onClick={() => handleDelete(index)} src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ maxWidth: '150px', maxHeight: '150px' }} />
                        </div>
                    ))}
                </div>
            )} */}
            {/* <label htmlFor="file-upload" className='custom-file-upload'>+</label> */}
            <input className="upload" id='file-upload' type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png" multiple />
            <p className="productAddP">City</p>
            <input className='input' type="text" id="City" />
            <button className="submit-btn" onClick={postProduct}>Add!</button>
        </div>
    );

}

export default ProductAdd;
