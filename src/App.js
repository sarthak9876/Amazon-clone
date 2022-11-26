import Header from './Header';
import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Checkout from './Checkout';
import Login from './Login';
import React, { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './stateProvider';
import Footer from './Footer';
import Payment from './Payment';

import { loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Order from './Order';
import Orders from './Orders';

const promise = loadStripe('pk_test_qAmoMTlWcLM9rXisx1Al6oUJ00BZf08efJ');


function App() {

  const[{}, dispatch] = useStateValue();
useEffect(() =>{
  //will run only once when the app component loads...
  auth.onAuthStateChanged(authUser => {
    console.log('THE USER IS >>>', authUser);
    if(authUser){
      //the user just logged in / was logged in

      dispatch({
        type: 'SET_USER',
        user: authUser

      })
    }
    else{
      //the user is logged out
      dispatch({
        type: 'SET_USER',
        user: null
      })

    }
  })


},[])

  return (
    // BEM
    <BrowserRouter>
    
    <Routes>
      
      <Route exact path='/' element={<><Header /><Home /><Footer /></>} />
      <Route exact path='/checkout' element={<><Header /><Checkout /><Footer /></>} />
      <Route exact path='/login' element={<><Login /></>} />
      <Route exact path='/payment' element={<>
      <Header />
      <Elements stripe={promise}>
        <Payment />
      </Elements>
      
      <Footer /></>} />

<Route exact path='/payment' element={<Orders />} />

    </Routes>
    </BrowserRouter>
    

  );
}

export default App;
