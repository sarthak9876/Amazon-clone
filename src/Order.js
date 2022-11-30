import React from 'react'
import './Order.css'
import moment from "moment";
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';


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
            hideButton
            />
        ))}
        <CurrencyFormat 
        renderText={(value) => (
            <>
                <h3 className='order__total'>Order Total: {value}</h3>  
            </>
        )}
        decimalScale={2} //shows values till 2 decimal place only
        value={order.data.amoun/100} // convert the sub unit of currency to the actual amount i.e, paisa to INR, cent to Dollar and pent to Pount etc
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
        />
    </div>
  )
}

export default Order
