import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/AxiosUrl';

const AddProducts = () => {
  // Create state variables for the form fields
  const [formData, setFormData] = useState({
    itemname: '',
    description: '',
    company: '',
    category: '',
    imageURL: '',
    price: 0,
  });

  // Submission function
  const submitHandler = async (event) => {
    event.preventDefault();

    // Prepare the data to send to the backend
    const data = {
      name: formData.itemname,
      description: formData.description,
      company: formData.company,
      category: formData.category,
      imageUrl: formData.imageURL,
      price: formData.price,
    };

    try {
      const res = await axios.post('api/item', data);
      console.log(res);

      // Clear the form after successful submission
      setFormData({
        itemname: '',
        description: '',
        company: '',
        category: '',
        imageURL: '',
        price: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className='inset-0 flex items-center justify-center p-8'>
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
              value={formData.itemname}
              onChange={(e) => handleInputChange('itemname', e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Description</label>
            <input
              type='text'
              id='description'
              autoComplete='on'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter Description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Company</label>
            <input
              type='text'
              id='company'
              autoComplete='on'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter Company Name'
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Category</label>
            <input
              type='text'
              id='category'
              autoComplete='on'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter Category'
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
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
              value={formData.imageURL}
              onChange={(e) => handleInputChange('imageURL', e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Enter the price'
              value={formData.price}
              min={0}
              onChange={(e) =>
                handleInputChange('price', Math.max(0, e.target.value))
              }
              required
            />
          </div>
          <div className='flex justify-center align-middle gap-2'>
            <button type='submit' className='blue_btn'>
              Add
            </button>

            <div className='my-auto'>
              <Link to='/' className='trans_btn'>
                Close
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
