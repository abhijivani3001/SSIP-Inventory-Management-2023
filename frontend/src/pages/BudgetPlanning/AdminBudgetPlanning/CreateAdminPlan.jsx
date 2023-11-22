import { useState } from 'react';
import axios from '../../../api/AxiosUrl';

const CreateAdminPlan = () => {
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/plan', { ...formData });
    console.log(res);
  };
  const [formData, setFormData] = useState({ startDate: '', phaseDuration: 1 });

  return (
    <div className='inset-0 flex items-center justify-center p-8'>
      <div className='bg-white w-96 p-8 text-lg font-semibold rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-black mb-4 min-w-0 flex items-center justify-center'>
          CREATE PLAN
        </h2>
        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='block text-gray-800 cursor-pointer'>
              Start Date
            </label>
            <input
              type='date'
              id='startDate'
              name='startDate'
              className='w-full px-3 py-2 border text-black cursor-pointer rounded-lg focus:outline-none focus:border-blue-500'
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prevForm) => {
                  return { ...prevForm, startDate: e.target.value };
                })
              }
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-800'>Each Phase Duration</label>
            <input
              type='number'
              id='phaseDuration'
              name='phaseDuration'
              className='w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Ex: 2 day'
              value={formData.phaseDuration}
              min={1}
              max={3}
              onChange={(e) =>
                setFormData((prevForm) => {
                  return { ...prevForm, phaseDuration: e.target.value };
                })
              }
              required
            />
          </div>
          <div className='flex justify-center align-middle gap-2'>
            <button type='submit' className='blue_btn'>
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminPlan;
