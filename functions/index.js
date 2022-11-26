const functions = require("firebase-functions");
const express = require("express");
const cors= require("cors");
const stripe = require("stripe")(
"sk_test_51FQa3iCZQGKil2k51MEijjqkhN4IaAOoBerLxax1eXZBYbWwLRjeGHOVhEA5HuEFKRRcvxTv8Ma0Dq7AFJw94Jfq00gclJ3VT3"
);

// API


// - App config
const app = express();

// - Middleware
app.use(cors({origin: true}));
app.use(express.json());


// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.get("/sarthak", (request, response) => response.status(200).send("Welcome to the Amazon Clone app made by Sarthak"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log("Payment Request Received BOOM!!!  for the amount of :", total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total, //subunits of the currency
        currency: "inr", // name of the currency you are using
    });

    // 201 status is for OK - created

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
// - Listen command

exports.api =functions.https.onRequest(app);

// http://127.0.0.1:5001/clone-45588/us-central1/api