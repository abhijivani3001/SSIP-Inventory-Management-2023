import Navbar from './Navbar';

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <div className='border border-gray-400 mx-8'></div>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
