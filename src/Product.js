import React from 'react'
import './Product.css';
import { useStateValue } from './stateProvider';


function Product({id, title, price, image, image_alt, rating}) {
  
  const [{basket}, dispatch] = useStateValue();
  
  const addToBasket=()=>{
    //dispatch the item into the data layer

    dispatch({
        type: 'ADD_TO_BASKET',
        item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
        },
    });
  };
  
  
    return (
    <div className='product'>
        <div className='product__info'>
            <p>{title}</p>
            <p className='product__price'>
                <small>₹</small>
                <strong>{price}</strong>
            </p>

        
            <div className='product__rating'>
                {Array(rating)
                .fill()
                .map((_, i) => (
                <p>🌟</p>
                ))}
            </div>
        </div>
        <div className='product__image'>
            <img src={image} alt={image_alt} />
        </div>
        <div className='product__submit'>
            <button onClick={addToBasket} >Add to Cart</button>
        </div>
    </div>
  )
}

export default Product
