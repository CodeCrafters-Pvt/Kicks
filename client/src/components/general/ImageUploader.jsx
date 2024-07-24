import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  addImages,
  removeImage,
  selectUploader,
} from "../../redux/slices/imageUploaderSlice";
import { FaTimes } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import { Popup } from "../";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ImageUploader = ({ setSelectedFiles, className }) => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector(selectUploader);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSelect = (event) => {
    const newImages = Array.from(event.target.files);

    const imagesToUpload = newImages.slice(0, maxImages - images.length);
    const imageUrls = imagesToUpload.map((image) => URL.createObjectURL(image));

    if (imagesToUpload.length > 0) {
      dispatch(addImages(imageUrls));
      setSelectedFiles(imagesToUpload);
    }

    if (newImages.length > imagesToUpload.length) {
      dispatch(
        setError(
          `Only ${
            maxImages - images.length
          } images can be uploaded. The rest were ignored.`
        )
      );
    }
  };

  const maxImages = 10;
  const maxImagesReached = images.length >= maxImages;

  // Removes an image from the array based on its index
  const handleRemove = (index) => {
    dispatch(removeImage(index));
  };

  // Handles the "drop" event for drag-and-drop functionality
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files.length > 0) {
      const newImages = Array.from(event.dataTransfer.files);

      const imagesToUpload = newImages.slice(0, maxImages - images.length);
      const imageUrls = imagesToUpload.map((image) =>
        URL.createObjectURL(image)
      );

      if (imagesToUpload.length > 0) {
        dispatch(addImages(imageUrls));
        setSelectedFiles(imagesToUpload);
      }

      if (newImages.length > imagesToUpload.length) {
        dispatch(
          setError(
            `Only ${
              maxImages - images.length
            } images can be uploaded. The rest were ignored.`
          )
        );
      }
    }
  };

  const visibleImages = images.slice(0, 5);
  const additionalCount = images.length - 5;
  const backgroundImg = images[5];

  useEffect(() => {
    if (images.length === 0) {
      setIsPopupOpen(false);
    }
  }, [images]);

  const Card = ({ image, index }) => (
    <div key={index} className="relative">
      <div className="w-32  border-dashed border-2 border-gray-300 rounded-md p-1">
        <img
          src={image}
          alt={`Uploaded Image ${index}`}
          className="w-32 h-28 object-cover rounded-md"
        />
      </div>
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="absolute top-2 right-2 p-1 rounded-full cursor-pointer"
        style={{ backgroundColor: "black" }}
      >
        <FaTimes className="text-white" />
      </button>
    </div>
  );

  return (
    <div
      className={`p-4 border border-gray-300 rounded-md shadow-md  ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className="text-xl font-semibold mb-2">Images</h2>
      <div className="flex flex-wrap space-y-1 space-x-2">
        {visibleImages.map((image, index) => (
          <Card key={index} image={image} index={index} />
        ))}
        {additionalCount > 0 && (
          <div
            style={{
              backgroundImage: backgroundImg ? `url(${backgroundImg})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-28 h-28 p-1 cursor-pointer"
            onClick={() => setIsPopupOpen(true)}
          >
            <div className="w-28 h-28 flex items-center justify-center border-2 border-gray-300 rounded-md backdrop-blur">
              <span className="text-3xl text-gray-700">+{additionalCount}</span>
            </div>
          </div>
        )}

        {loading && (
          <div className="w-32 h-32 flex items-center justify-center">
            {/* loading spinner  */}
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid"></div>
          </div>
        )}
      </div>
      {/* Popup Modal */}
      {isPopupOpen && (
        <Popup setIsPopupOpen={setIsPopupOpen}>
          <h3 className="text-xl font-semibold mb-2">All Images</h3>
          <div className="flex flex-wrap gap-4 max-h-[50vh] overflow-auto">
            {images.map((image, index) => (
              <Card image={image} index={index} key={index} />
            ))}
          </div>
        </Popup>
      )}
      {maxImagesReached ? (
        <div className="p-2 text-right">
          <small>Max count reached</small>
        </div>
      ) : (
        <label>
          <div className="p-8 flex items-center justify-center space-x-4 cursor-pointer">
            <RiUpload2Fill className=" text-8xl text-gray-700" />
            <div className="flex flex-col gap-1">
              <span>Drop anywhere to import</span>
              <span>
                or{" "}
                <span className="text-blue-500 hover:underline">
                  Select files
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleSelect}
                  className="hidden"
                />
              </span>
            </div>
          </div>
        </label>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  setSelectedFiles: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ImageUploader;
