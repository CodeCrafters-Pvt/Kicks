import React from 'react';
import Category from '../SideBar/category/Category';
import Colors from '../SideBar/colors/Colors';
import Price from '../SideBar/price/Price';

const Filter = () => {
  return (
    <div className='bg-transparent'>
      <section className='mb-6 border-b border-gray-300 pb-4'>
        <h2 className='text-lg font-semibold mb-2'>Category</h2>
        <Category />
      </section>
      <section className='mb-6 border-b border-gray-300 pb-4'>
        <h2 className='text-lg font-semibold mb-2'>Colors</h2>
        <Colors />
      </section>
      <section className='pb-4'>
        <h2 className='text-lg font-semibold mb-2'>Price</h2>
        <Price />
      </section>
    </div>
  );
};

export default Filter;
