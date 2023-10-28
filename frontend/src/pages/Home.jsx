import React, { useEffect, useState } from 'react';
import axios from '../AxiosUrl';

const Home = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios
      .get(`/hello`)
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    //   axios
    //     .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
    //       email: 'abcd',
    //       password: '123',
    //     })
    //     .then((response) => {
    //       setData(response);
    //       console.log(response);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  }, []);

  return (
    <div className='mx-8 my-4'>
      <h1 className='text-8xl font-light'>Data: <p className='text-2xl'>{data?.data?.message}</p></h1>
    </div>
  );
};

export default Home;
