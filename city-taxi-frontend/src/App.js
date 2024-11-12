import './App.css';
import 'bootstrap'
import Footerpage from './FooterPage';
import React, { useContext, useEffect, useState } from 'react';
import Routings from './Routings';
import { AuthProvider, useAuth } from './AuthContex.jsx';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));

  return (
    <AuthProvider>
      <Routings />
    </AuthProvider>
  );
}

export default App;
