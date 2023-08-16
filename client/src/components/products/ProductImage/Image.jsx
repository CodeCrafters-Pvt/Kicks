import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../src/firebase-config";
import { FaCloudUploadAlt } from "react-icons/fa";
import PropTypes from "prop-types"; 
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
const Image = ({onImageChange,productID, productName}) => {
  

  
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const validateImages = (images) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    const errors = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      if (!validTypes.includes(image.type)) {
        errors.push(`Invalid file type for image ${image.name}.`);
      }

      if (image.size > maxSize) {
        errors.push(`Image ${image.name} exceeds the 5MB size limit.`);
      }
    }

    return errors;
  };

  const uploadImages = async () => {
    try {
      const validationErrors = validateImages(images);

      if (validationErrors.length > 0) {
        setError(validationErrors.join(" "));
        return;
      }

      for (let i = 0; i < images.length; i++) {
         // Generate a unique identifier (timestamp in this example)
        const timestamp = Date.now();
      const uniqueFileName = `${timestamp}-${images[i].name}`;
      
        // Use the unique filename to store the image in Firebase Storage
      const imageRef = ref(storage, `Kicks/${productID}-${productName}/${uniqueFileName}`);
        await uploadBytes(imageRef, images[i]);
        console.log(`Image ${i + 1} uploaded successfully`);
      }

      setError(null);
    } catch (error) {
      console.log("Error uploading images:", error);
      setError("Error uploading images. Please try again later.");
    }
  };

  const handleImageChange = (event) => {
    const imageFiles = event.target.files;
    setImages(Array.from(imageFiles)); // Set the images state with an array of files
    setError(null); // Reset error state when new images are selected
    onImageChange(Array.from(imageFiles));
  };

  console.log(images);



  
  return (
     <div className="bg-gray-200 p-4 rounded-md space-y-4 text-center">
     
      <div className="flex items-center justify-center space-x-4">

    <label htmlFor="image-upload" className="cursor-pointer">
          <FaCloudUploadAlt className="w-6 h-6 text-blue-500 hover:text-blue-600 transition" />
          <span className="text-gray-600 hover:text-gray-800 transition">
            Upload Image
          </span>
        </label>
        <input
          type="file"
          id="image-upload"
          className="hidden"
          multiple
          onChange={handleImageChange}
        /> 
     
      </div>
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((image, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
                className="w-16 h-16 object-contain rounded-md"
              />
              <p className="text-gray-600">{image.name}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={uploadImages}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow mx-auto block"
      >
        Upload
      </button> 
      </div>

      
  );
};

       

Image.propTypes = {
  productID: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  onImageChange: PropTypes.func.isRequired,
};
export default Image;
