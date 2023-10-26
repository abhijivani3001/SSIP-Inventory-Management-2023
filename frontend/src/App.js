import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // If using React Router

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* <Switch> */}
        {/* Define your routes and route components here */}
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        {/* <Route path="/products" component={Products} /> */}
        {/* <Route path="/orders" component={Orders} /> */}
        {/* <Route path="/customers" component={Customers} /> */}
        {/* </Switch> */}
      </div>
    </Router>
  );
}

export default App;
