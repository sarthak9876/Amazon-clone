import Header from './Header';
import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Checkout from './Checkout';
import Login from './Login';
import React, { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './stateProvider';
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
      
      <Route exact path='/' element={<><Header /><Home /></>} />
      <Route exact path='/checkout' element={<><Header /><Checkout /></>} />
      <Route exact path='/login' element={<><Login /></>} />
    
    </Routes>
    </BrowserRouter>
    

  );
}

export default App;
