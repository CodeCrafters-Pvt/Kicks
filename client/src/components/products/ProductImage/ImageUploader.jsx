import { useDispatch, useSelector } from 'react-redux';
import { setError, addImages, removeImage } from "../../../redux/slices/imageUploaderSlice"
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import PropTypes from "prop-types"; 


const ImageUploader = ({setSelectedFiles}) => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.imageUploader);


  const handleSelect = (event) => {
    const newImages = Array.from(event.target.files);
    const newImageUrls = newImages.map((image) => URL.createObjectURL(image));
    dispatch(addImages(newImageUrls))
    setSelectedFiles(newImages)
  };

   // Removes an image from the array based on its index
  const handleRemove = (index) => {
      dispatch(removeImage(index))
  };

  // Handles the "drop" event for drag-and-drop functionality
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files.length > 0) {
      const newImages = Array.from(event.dataTransfer.files);
      const newImageUrls = newImages.map((image) => URL.createObjectURL(image));
      dispatch(addImages(newImageUrls));
      setSelectedFiles(newImages)
    }
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
              src={image}
              alt={`Uploaded Image ${index}`}
              className="w-32 h-32 object-cover rounded-md"
            />
            </div>
            <button
            type="button"
              onClick={() => handleRemove(index)}
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
              onChange={handleSelect}
              className="hidden"
            />
          </span>
        </div>
      </label>
      <p className="mt-4 text-gray-500 text-sm">
        You can also drag and drop images here.
      </p>
    </div>
  
  );

  
};


ImageUploader.propTypes = {
  setSelectedFiles: PropTypes.func.isRequired,
  };


export default ImageUploader;
