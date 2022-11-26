import { snap } from 'popmotion';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import Order from './Order';
import './Orders.css';
import { useStateValue } from './stateProvider';


function Orders() {

    const [{basket, user}, dispatch] = useStateValue();
    const [ orders, setOrders] = useState([]);
    useEffect(() => {
        if(user){
        db
        .collection('users') //accessing the users collection
        .doc(user?.uid) // fetching the specific uid of the user 
        .collection('orders') //accessing the orders of the user with a particular uid in the database
        .orderBy('created', 'desc') // arrange he creted orders in desc order i.e new orders will be on top 
        .onSnapshot(snapshot => { // gives us an actual snapshot ofthe database
            setOrders(snapshot.doc.map(doc => ({ // going through a list of orders
                id: doc.id, // gte the id the document stored in the database for the order
                data: doc.data() // get the data of the document
            })))
        })
        }
        else{
            setOrders([])
        }
    }, [user])

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
    <div className='orders__order'>
        {orders?.map( order => (
            <Order order={order} />
        ))}
    </div>
    </div>
  )
}

export default Orders
