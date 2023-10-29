import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  username: '',

  products: [],
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState('');

  const [products,setProducts]=useState([]);

  const userIsLoggedIn = !!token; // !! converts truthy/falsy to true/false boolean value

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    setUsername();
  };
  
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const productsHandler=()=>{
    setProducts();
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    username: username,

    products: products,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
