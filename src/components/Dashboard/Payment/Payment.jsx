import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QG2DwFqSTGgH4neNrhJNSqULVFMVScGBnUabUAYDlNOQqszeKaRN15TgRaL0IJVIEEwAXZq6G9DPXSKwEJcpJx800WyBBvyEX');

const Payment = () => {

  const booking = useLoaderData()
  //console.log(booking);
  const { category, productName, condition, productPrice, buyerName, buyerEmail, meetingLocation
  } = booking;

  return (
    <div>
      <h2 className='text-3xl font-semibold'>Payment for: <span className='text-blue-700'>{productName}</span></h2>
      <p className='mt-3 text-lg'>Please pay <b className='text-red-700'><span >{Number(productPrice)}</span></b></p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment; 