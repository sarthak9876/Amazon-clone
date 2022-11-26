import React from 'react'
import './Order.css'
import moment from "moment";
import CheckoutProduct from './CheckoutProduct';


function Order({order}) {
  return (
    <div className='order'>
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
        <p className='order__id'>
            <small>{order.id}</small>
        </p>
        {order.data.basket?.map(item => (
            <CheckoutProduct
            id={order.id}
            title={order.title}
            image={order.image}
            price={order.price}
            rating={order.rating}
            />
        ))}
        
    </div>
  )
}

export default Order
