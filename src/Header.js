import React, { useState } from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './stateProvider';
import { auth } from './firebase';
function Header() {

  const [{basket, user},dispatch] = useStateValue();
 

  const handleLoginAuth = () =>{
    if(user){
      auth.signOut();
    }
    else{

    }
  }
  return (
    <div className='header'>
        <Link to='/'>
        <img 
        className='header__logo' 
        src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' 
        alt="Amazon logo" />
        </Link>


        <div className='header__search'>
            <input className='header__searchInput' type="text" />
            <SearchIcon className='header__searchIcon' />
        </div>


        <div className='header__nav'>
          <Link to={!user && '/login'}>
          <div onClick={handleLoginAuth} className='header__option'>
            <span className='header__option-line-one'>Hello {user ? user.email: 'Guest'}</span>
            <span className='header__option-line-two'>{user? 'Sign Out': 'Sign In'}</span>
          </div>
          </Link>
          <Link to='/orders'>
          <div className='header__option'>
            <span className='header__option-line-one'>Returns</span>
            <span className='header__option-line-two'>& Orders</span>
          </div>
          </Link>

          <div className='header__option'>
            <span className='header__option-line-one'>Your</span>
            <span className='header__option-line-two'>Prime</span>
          </div>
          <Link to='/checkout'>
          <div className='header__optionBasket'>
            <ShoppingBasketIcon  />
            <span className='header__optionListTwo header__basketCount'>{basket?.length}</span>
          </div>
          </Link>
        </div>
    </div>
  )
}

export default Header
