import React from 'react';
import Card from '../UI/Card';

const Product = (props) => {
  // const data = [
  //   {
  //     title: 'Apple watch series',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis soluta tempore eaque.',
  //     company: 'Apple',
  //     category: 'watch',
  //   },
  //   {
  //     title: 'Apple watch series',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis soluta tempore eaque.',
  //     company: 'Apple',
  //     category: 'watch',
  //   },
  //   {
  //     title: 'Apple watch series',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis soluta tempore eaque.',
  //     company: 'Apple',
  //     category: 'watch',
  //   },
  //   {
  //     title: 'Apple watch series',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis soluta tempore eaque.',
  //     company: 'Apple',
  //     category: 'watch',
  //   },
  // ];

  return (
    <>
      {props.data.map((val) => (
        <Card
          title={val.name}
          description={val.description}
          company={val.company}
          category={val.category}
        />
      ))}
    </>
  );
};

export default Product;
