import React from 'react';

const Type = () => {
  return (
    <div className='flex ml-20 my-0'>
      <h2 className='ml-10 mb-4 mt-4 text-lg font-semibold'>Collections</h2>
      <button className='ml-4 px-4 py-2 text-sm font-medium text-black bg-transparent border border-black rounded-lg hover:bg-black hover:border-transparent hover:text-white hover:py-1'>
        All Products
      </button>
      <button className='ml-4 px-4 py-2 text-sm font-medium text-black bg-transparent border border-black rounded-lg hover:bg-black hover:border-transparent hover:text-white hover:py-1'>
        Men
      </button>
      <button className='ml-4 px-4 py-2 text-sm font-medium text-black bg-transparent border border-black rounded-lg hover:bg-black hover:border-transparent hover:text-white hover:py-1'>
        Women
      </button>
      <button className='ml-4 px-4 py-2 text-sm font-medium text-black bg-transparent border border-black rounded-lg hover:bg-black hover:border-transparent hover:text-white hover:py-1'>
        Kids
      </button>
    </div>
  );
};

export default Type;
