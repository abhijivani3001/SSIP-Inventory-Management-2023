import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from '../../api/AxiosUrl';

const Product = (props) => {
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/user');
        const user = await res.data.user;
        setUserRole(user.role);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <>
      {props.data.map((val) => (
        <ProductCard
          key={val._id}
          title={val.name}
          imageUrl={val.imageUrl}
          description={val.description}
          company={val.company}
          category={val.category}
          val={val}
          userRole={userRole}
        />
      ))}
    </>
  );
};

export default Product;
