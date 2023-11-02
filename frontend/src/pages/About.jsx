import React from 'react';

const About = () => {
  const dropdown = document.getElementById('user-dropdown');
  const navbarUser = document.getElementById('navbar-user');

  const toggleDropdown = () => {
    dropdown.classList.toggle('hidden');
  };
  const toggleNavbarUser = () => {
    navbarUser.classList.toggle('hidden');
  };

  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='page-title'>About page</h1>
      </div>
    </div>
  );
};

export default About;
