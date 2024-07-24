import { FaTimes } from "react-icons/fa";

export default function Popup({ setIsPopupOpen, children, className }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div
        className={`bg-white p-4 rounded-md shadow-lg relative max-w-4xl ${className}`}
      >
        <button
          type="button"
          onClick={() => setIsPopupOpen(false)}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-300"
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
}
