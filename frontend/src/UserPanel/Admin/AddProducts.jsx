import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/AxiosUrl';

const AddProducts = () => {
  // Create state variables for the form fields
  const [itemname, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');

  // Submission function
  const submitHandler = async (event) => {
    event.preventDefault();

    // Prepare the data to send to the backend
    const data = {
      name: itemname,
      description: description,
      company: company,
      category: category,
      imageUrl: imageURL,
    };

    const res=await axios.post('api/item', data);
    console.log(res);
  };

  return (
    <div className='inset-0 flex items-center justify-center p-16'>
      <div className='bg-white w-96 p-8 text-lg font-semibold rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-black mb-4 min-w-0 flex items-center justify-center'>
          Add Item
        </h2>
        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='block text-gray-800'>Item name</label>
            <input
              type='text'
              id='itemname'
              name='itemname'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter Item Name'
              value={itemname}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>
              Description
            </label>
            <input
              type='text'
              id='description'
              autoComplete='on'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>
              Company
            </label>
            <input
              type='text'
              id='company'
              autoComplete='on'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter Company Name'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>
              Category
            </label>
            <input
              type='text'
              id='category'
              autoComplete='on'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Image URL</label>
            <input
              type='text'
              id='imageURL'
              name='imageURL'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter Image URL'
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='bg-gray-800 w-24 text-white border-2 hover:bg-gray-700 py-1.5 px-6 rounded-lg'
            >
              Add
            </button>
          </div>

          <div className='text-center mt-4'>
            <Link
              to='/'
              className='text-gray-700 w-24 border-2 hover:bg-gray-100 py-1.5 px-6 rounded-lg'
            >
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;