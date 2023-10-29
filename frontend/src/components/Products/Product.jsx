import React from 'react';
import Card from '../UI/Card';

const Product = () => {
  const data = [
    {
      title: 'Apple watch series',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis soluta tempore eaque.',
      company: 'Apple',
      category: 'watch',
    },
    {
      title: 'Apple watch series',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis soluta tempore eaque.',
      company: 'Apple',
      category: 'watch',
    },
    {
      title: 'Apple watch series',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis soluta tempore eaque.',
      company: 'Apple',
      category: 'watch',
    },
    {
      title: 'Apple watch series',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis soluta tempore eaque.',
      company: 'Apple',
      category: 'watch',
    },
  ];

  return (
    <>
      {data.map((val) => (
        <Card
          title={val.title}
          description={val.description}
          company={val.company}
          category={val.category}
        />
      ))}
    </>
  );
};

export default Product;
