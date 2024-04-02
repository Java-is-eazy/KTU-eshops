import React, { useState } from 'react';
import "./ProductAdd.css";


const ProductAdd = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const filteredFiles = files.filter(file =>
            file.type === 'image/jpeg' || file.type === 'image/png'
        );
        setSelectedFiles(filteredFiles);
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

    return (
        <div className='add-container'>
            <h3 className="form-title">Sell your stuff!</h3>
            <p>Item title</p>
            <input className='input' type="text" name="Title" />
            <p>Price</p>
            <input className='input' type="number" name="Price" />
            <p>Description</p>
            <input maxLength={200} className='input' type="text" name="Description" />
            <p>Upload your images</p>
            {selectedFiles.length > 0 && (
            <div className='display-img'>
                {selectedFiles.map((file, index) => (
                    <div key={index} style={{ margin: '5px', textAlign: 'center' }}>
                        <img onClick={() => handleDelete(index)} src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ maxWidth: '150px', maxHeight: '150px' }} />
                    </div>
                ))}
            </div>
            )}
            <label htmlFor="file-upload" className='custom-file-upload'>+</label>
            <input className="upload" id='file-upload' type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png" multiple />
            <p>City</p>
            <input className='input' type="text" name="Image"/>
            <button className="submit-btn" onClick={handleUpload}>Add!</button>
        </div>
    );
}

export default ProductAdd;
