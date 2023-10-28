import Navbar from '../Navbar';

const Layout = (props) => {
  return <>
    <Navbar/>
    <main>{props.children}</main>
  </>;
};

export default Layout;
