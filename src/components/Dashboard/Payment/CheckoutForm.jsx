import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");  // Store the client secret
  const stripe = useStripe();
  const elements = useElements();
  const { productPrice } = booking;

  // Fetch the client secret on component mount or whenever productPrice changes
  useEffect(() => {
    if (productPrice) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productPrice }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);  // Update the clientSecret state
          }
        })
        .catch((error) => {
          console.error("Error fetching client secret: ", error);
          setCardError("Failed to fetch payment details.");
        });
    }
  }, [productPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet or Elements is not ready
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError("Card element not found!");
      return;
    }

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error("Stripe error: ", error);
      setCardError(error.message);  // Show the error message
    } else {
      setCardError("");  // Clear any previous errors
    }
  };

  return (
    <>
      <form className='w-[520px]' onSubmit={handleSubmit}>
        <CardElement
          className='mt-4'
          options={{
            style: {
              base: {
                fontSize: '18px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className='btn btn-accent mt-6 font-bold'
          type="submit"
          disabled={!stripe || !clientSecret}  // Disable the button if Stripe is not ready or clientSecret is missing
        >
          PAY
        </button>
      </form>
      {cardError && <div className="text-red-500 mt-2">{cardError}</div>}
    </>
  );
};

export default CheckoutForm;
