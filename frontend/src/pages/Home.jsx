import React, { useContext, useEffect, useState } from 'react';
import axios from '../AxiosUrl';
import AuthContext from '../store/auth-context';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    // axios
    //   // .get(`/hello`)
    //   // .get(`/api/order/`)
    //   // .get('api/user')
    //   .then((response) => {
    //     setData(response);
    //     console.log(response.data);

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // axios
    //   .get('api/user', {
    //     headers: {
    //       Authorization: 'Bearer ' + token, //the token is a variable which holds the token
    //     },
    //   })
    //   .then((response) => {
    //     setData(response);
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // const response = axios.get('/api/users');
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

  // const temp=data?.data?.users[0].name;

  return (
    <div className='mx-8 my-4'>
      <h1 className='text-8xl font-light'>
        Data: <p className='text-2xl'>{token}</p>
      </h1>
    </div>
  );
};

export default Home;
