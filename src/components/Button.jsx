import React from 'react';
import './Button.css';
import {useNavigate} from 'react-router-dom';

const Button = () => {
    const navigate = useNavigate();
const navigatetoprovide =()=>{
    navigate('/Provideride');
}

const navigatetobook = () => {
navigate('/Bookride');
}

  return (
  <h1>
    hello;
  </h1>
  );
};

export default Button;
