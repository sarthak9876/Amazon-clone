import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './stateProvider';
import {db } from './firebase';

function Payment() {

    const navigate = useNavigate();
    const stripe= useStripe();
    const elements = useElements();
    const [{basket, user}, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(null);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(null);
    const [ clientSecret, setClientSecret] = useState(true);

    useEffect(() =>{
    // generate the special stripe secret which allows us to charge our customer
    //but whenever the basket changes we need a new secret
    // so that we don't end up charging the same amount for all the products

    const getClientSecret = async () => {
        const response= await axios ({
            method : 'post',
            // stripe exects the total in a currencies
            // subunits (i.e for dollar it is cents, for pounds its pents and for rupee it is paisa)
            // so we are multiplying by 100 to covert them into subunits
            url: '/payments/create?total=${getBasketTotal(basket)*100}'
        }); // axios is a way to create request( GET, POST etc) and fetch API
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret();

    },[basket])

    console.log('The SECRET is >>>', clientSecret)


    const handleSubmit = async (event)  => {
        event.preventDefault();
        setProcessing(true);
    
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) 
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confrmation in language of stripe
            
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })
            
        })
        navigate('/order')
    }

    const handleChange = e =>{
        // listen to any changes in the cardElement
        // and display any errors as the customer types their card details

        setDisabled(e.empty);
        setError(e.error? e.error.message : "");

    }

  return (
    <div className='payment'>
        <div className='payment__container'>

            <h1>
                Checkout (
                    <Link to='/checkout'>{basket?.length} items</Link>
                )
            </h1>

            {/* Payment Section - delivery section */}
            <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__address'>
                <p>{user?.email}</p>
                <p>123 Fake Street</p>
                <p>Fake town, India</p>

            </div>

            </div>
            {/* Payment section - Review Items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__item'>
                    {basket.map(item => (
                    <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating} />
                ))}
                </div>
            </div>
            {/* Payment section - Payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <div className='payment__priceContainer'>
                        <CurrencyFormat 
                        renderText={(value) => (
                            <>
                            <h3>Order Total: {value} </h3>
                            </>
                             )}
                            decimalScale={2}
                            value={getBasketTotal(basket)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₹"}
                        
                        /> 
                        <button disabled={processing | disabled || succeeded}>
                            <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
                        </button>
                        </div>
                        
                        {/* Errors */}
                        {error && <div>{error}</div>}
                        



                    </form>

                    {/* Stripe magic will go here */}


                </div>

            </div>

        </div>
    </div>
  )
}

export default Payment
