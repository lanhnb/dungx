const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/order");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems)
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image.url],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
  
});

// Create order function

const createOrder = async (customer, data, lineItems) => {
  // const Items = JSON.parse(customer.metadata.cart);
  
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products:lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// Stripe webhoook
// let endpointSecret;
const endpointSecret =" whsec_aa4f2e2b25e5ee2e658993411720bffd9265746ef2ebf1d680057b594c7fef96"
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          endpointSecret
        );
      } catch (err) {
        console.log(`Webhook Error:  ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          stripe.checkout.sessions.listLineItems(
            data.id,
            {},
            function(err, lineItems){
              console.log("line_items", lineItems)
              createOrder(customer, data, lineItems);
            }
          )
          
        })
        .catch((err) => console.log(err.message));
    }

    res.send().end();
  }
);

module.exports = router;
