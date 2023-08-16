import React from 'react';

const Search = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        placeholder="Type your shoe"
        className="py-2 px-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
      />
      <button className="ml-2 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
        Search
      </button>
    </div>
  );
};

export default Search;
