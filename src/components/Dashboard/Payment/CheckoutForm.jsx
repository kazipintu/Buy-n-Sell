import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");  // For error messages
  const [successPosting, setSuccessPosting] = useState("");  // For success messages
  const [transactionId, setTransactionId] = useState("");  // For success transaction ID
  const [clientSecret, setClientSecret] = useState("");  // Store the client secret
  const stripe = useStripe();
  const elements = useElements();

  const { productPrice, buyerName, buyerEmail, _id } = booking;

  // Fetch the client secret when the component mounts or productPrice changes
  useEffect(() => {
    if (productPrice) {
      // Make a request to your back-end to create the payment intent
      fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productPrice }),  // Send the price to the back-end
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);  // Update the clientSecret state
          }
        })
        .catch((error) => {
          console.error('Error fetching client secret:', error);
          setCardError('Failed to fetch payment details.');
        });
    }
  }, [productPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet or Elements is not ready
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError('Card element not found!');
      return;
    }

    // Create a payment method using the card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);  // Display the error message
      return;
    }

    setCardError('');  // Clear previous error if any

    // Confirm the payment with the client secret
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: buyerName,
            email: buyerEmail,
          },
        },
      }
    );

    if (confirmError) {
      console.log(confirmError.message);
      setCardError(confirmError.message);
      return;
    }

    // Handle payment success (paymentIntent contains payment details)
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price: Number(productPrice),
        amount: paymentIntent.amount,
        transactionId: paymentIntent.id,
        email: buyerEmail,
        bookingId: _id,
      };
      fetch('http://localhost:5000/payments', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            setSuccessPosting("Congratulations! Your payment is successful.");
            setTransactionId(data.transactionId);
          }
        })
        .catch(error => {
          console.error('Error posting payment:', error);
          setCardError('Payment failed.');
        });
    }
  };

  return (
    <div>
      <form className='w-[500px]' onSubmit={handleSubmit}>
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
            hidePostalCode: false, // Show ZIP code field
          }}
        />
        <button
          className='btn btn-accent mt-6 font-bold'
          type="submit"
          disabled={!stripe || !clientSecret}  // Disable button if Stripe or clientSecret is missing
        >
          PAY
        </button>
      </form>
      {cardError && <div className="text-red-500 mt-2">{cardError}</div>}
      {successPosting && (
        <div>
          <p className='text-green-500'>{successPosting}</p>
          <p><b>{transactionId}</b></p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
