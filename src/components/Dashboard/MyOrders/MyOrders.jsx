import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';  // To access logged-in user details
import Loader from '../../../shared/Loading/Loader';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { user } = useContext(AuthContext); // Access the logged-in user from the context
  const [bookings, setBookings] = useState([]); // To store fetched bookings
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Check if user is logged in
    if (user?.email) {
      //console.log(user.email);
      // Fetch bookings for the logged-in user based on their email
      fetch(`http://localhost:5000/bookings?email=${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setBookings(data);  // Set bookings if they exist
          setLoading(false);   // Stop loading once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);  // Re-run the effect when the user email changes

  // Show loader while fetching bookings
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className='text-3xl font-semibold'>My Orders: {bookings?.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full mt-[25px] bg-white">
            {/* head */}
            <thead className='bg-[#E6E6E6]'>
              <tr className='text-black font-semibold text-[14px]'>
                <th scope="col">SL</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">PRODUCT</th>
                <th scope="col">PRICE (INR)</th>
                <th scope="col">LOCATION</th>
                <th scope="col">PAYMENT</th>
              </tr>
            </thead>
            <tbody>

              {
                bookings?.map((booking, i) => (
                  <tr key={booking._id}>
                    <td>{i + 1}</td>
                    <td>{booking?.category}</td>
                    <td>{booking?.productName}</td>
                    <td>{(booking?.productPrice)}</td>
                    <td>{booking?.meetingLocation}</td>
                    <td>
                      {
                        booking?.productPrice && !booking?.paid &&
                        <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-accent'>Pay</button></Link>
                      }
                      {
                        booking?.productPrice && booking?.paid &&
                        <span className='text-blue-700'>Paid</span>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default MyOrders;
