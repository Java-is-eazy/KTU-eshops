import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductAdd.css";

const ProductAdd = ({ token }) => { // Renamed prop to 'token'
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
        // Handle file upload logic here, for example, send the file to a server
        console.log(selectedFiles);
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    if (token === '') { // Check if token is falsy or empty
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
            <p class="productAddP">Item title</p>
            <input className='input' type="text" name="Title" />
            <p class="productAddP">Price</p>
            <input className='input' type="number" name="Price" />
            <p class="productAddP">Description</p>
            <input maxLength={200} className='input' type="text" name="Description" />
            <p class="productAddP">Upload your images</p>
            {selectedFiles.length > 0 && (
                <div className='display-img'>
                    {selectedFiles.map((file, index) => (
                        <div key={index} style={{ margin: '5px', textAlign: 'center', cursor: 'pointer' }}>
                            <img onClick={() => handleDelete(index)} src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ maxWidth: '150px', maxHeight: '150px' }} />
                        </div>
                    ))}
                </div>
            )}
            <label htmlFor="file-upload" className='custom-file-upload'>+</label>
            <input className="upload" id='file-upload' type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png" multiple />
            <p class="productAddP">City</p>
            <input className='input' type="text" name="Image"/>
            <button className="submit-btn" onClick={handleUpload}>Add!</button>
        </div>
    );
}

export default ProductAdd;
