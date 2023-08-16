import React, { useState, useEffect } from 'react';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../src/firebase-config';
import PropTypes from "prop-types"; 
const ImageUploader = ({ productID, productName }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Uploads images to Firebase storage
 
  const uploadImages = async () => {
    try {
      setLoading(true);

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const newImageName = `image ${i + 1}.jpg`;

        const productFolderRef = ref(storage, `Kicks/${productID}-${productName}`);
        const imageRef = ref(productFolderRef, newImageName);
        await uploadBytes(imageRef, image);
        console.log(`Image ${i + 1} uploaded successfully`);
      }

      setError(null);
    } catch (error) {
      console.error('Error uploading images:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files);
    setImages([...images, ...newImages]);
  };

   // Removes an image from the array based on its index
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Handles the "drop" event for drag-and-drop functionality
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files.length > 0) {
      const newImages = Array.from(event.dataTransfer.files);
      setImages([...images, ...newImages]);
    }
  };
 
  const clearImages = () => {
    setImages([]); // Clear the images state
  };

  return (
    
    <div
    className="p-4 border border-gray-300 rounded-md shadow-md"
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
  >
      <h2 className="text-xl font-semibold mb-4">Product Images</h2>
      <div className="flex flex-wrap space-x-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
          <div
              className="w-32 h-32 border-dashed border-2 border-gray-300 rounded-md p-1"
              style={{ backgroundColor: 'white' }}
            >
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded Image ${index}`}
              className="w-32 h-32 object-cover rounded-md"
            />
            </div>
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 rounded-full"
      style={{ backgroundColor: 'black' }} 
            >
               <FaTimes className="text-white" /> 
            </button>
          </div>
        ))}
        {loading && (
          <div className="w-32 h-32 flex items-center justify-center">
            {/* loading spinner  */}
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid"></div>
          </div>
        )}
      </div>
      <label className="block text-sm font-medium text-gray-700 mt-4">
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaCloudUploadAlt className="text-blue-500 text-lg" />
          <span className="text-blue-500 hover:underline">
            Select File
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </span>
        </div>
      </label>
      <p className="mt-4 text-gray-500 text-sm">
        You can also drag and drop images here.
      </p>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={uploadImages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
        >
          Upload
        </button>
        <button
          type="button"
          onClick={clearImages}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow"
        >
          Clear
        </button>
      </div>
    </div>
  
  );

  
};


ImageUploader.propTypes = {
    productID: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    onImageChange: PropTypes.func.isRequired,
  };


export default ImageUploader;
