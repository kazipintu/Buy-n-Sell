import React, { useEffect, useState, useContext } from 'react';
import { LuCheckCircle } from 'react-icons/lu';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Scooters = () => {
  const { user } = useContext(AuthContext);
  const [isBuyer, setIsBuyer] = useState(false);
  const [availableScooters, setAvailableScooters] = useState([]);
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [sellerVerificationStatus, setSellerVerificationStatus] = useState({});

  // Fetch available scooters data from the server
  useEffect(() => {
    fetch("http://localhost:5000/availableScooters")
      .then((res) => res.json())
      .then((data) => setAvailableScooters(data));
  }, []);

  // Fetch user type (buyer) from the server
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/buyer/${user.email}`)
        .then((res) => res.json())
        .then((data) => setIsBuyer(data?.isBuyer));
    }
  }, [user?.email]);

  // Fetch seller verification status for each scooter
  useEffect(() => {
    if (availableScooters.length > 0) {
      availableScooters.forEach((scooter) => {
        fetch(`http://localhost:5000/users/seller/${scooter.sellerEmail}`)
          .then((res) => res.json())
          .then((data) => {
            setSellerVerificationStatus((prevState) => ({
              ...prevState,
              [scooter?.sellerEmail]: data?.emailVerified
            }));
          });
      });
    }
  }, [availableScooters]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to handle opening the modal with selected scooter details
  const handleOpenModal = (scooter) => {
    setSelectedScooter(scooter);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedScooter(null);
  };

  // Handle the form submission for booking the scooter
  const handleBooking = (event) => {
    event.preventDefault();

    const form = event.target;

    const buyerName = form.name.value;
    const buyerEmail = form.email.value;
    const buyerPhone = form.phone.value;
    const productName = form.product.value;
    const condition = form.condition.value;
    const productPrice = form.price.value;
    const meetingLocation = form.location.value;
    const category = form.category.value;

    const booking = {
      buyerName,
      buyerEmail,
      buyerPhone,
      productName,
      condition,
      productPrice,
      meetingLocation,
      category
    };

    // Submit the booking data to the server
    fetch('http://localhost:5000/bookings', {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then(response => response.json())
      .then(data => {
        if (data.acknowledged) {
          setSelectedScooter(null);
          toast.success("Booking confirmed!");
        } else {
          toast.error("Booking failed");
        }
      })
      .catch((error) => {
        console.error("Error submitting booking:", error);
        toast.error("An error occurred while posting the data.");
      });
  };

  return (
    <div className='bg-slate-100 py-[100px]'>
      <h1 className='w-1/2 mx-auto text-3xl lg:text-5xl text-center font-bold text-blue-500 capitalize tracking-wide'>
        Discover your affordable and durable <span className='underline'>Scooters - {availableScooters?.length} no.</span>
      </h1>
      <div className='lg:w-[95%] px-[1%] mx-auto pt-[70px]'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {availableScooters?.map((scooter) => (
            <div key={scooter?._id} className='border hover:border-none shadow-2xl hover:shadow-none bg-white rounded-2xl overflow-hidden relative team-card p-4'>
              <div className="overflow-hidden relative space-x-2 text-center">
                <img
                  className="inline w-[300px] object-contain h-[250px] hover:scale-110 scale-100 transition-all duration-500"
                  src={scooter?.picture} alt="scooter" />
              </div>

              <div className="w-full bg-white tracking-wider px-5 pb-5 flex justify-between items-end">
                <div className='text-left space-y-2'>
                  <h4 className="text-xl font-bold text-blue-900">{scooter?.productName}</h4>
                  <p className='text-blue-900/85 text-md font-semibold'>Condition: {scooter?.condition}</p>
                  <p className='text-orange-600 text-lg font-bold text-blue-900/85'>Price: Rs. {scooter?.offerPrice}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Bought-by: Rs. {scooter?.originalPrice}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>How-old: {scooter?.howOld}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Posted-on: {scooter?.postedOn}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Location: {scooter?.location}</p>
                  <p className='flex gap-2 items-center text-green-500 text-lg font-semibold'>
                    Seller: {scooter?.sellerEmail}
                    {sellerVerificationStatus[scooter?.sellerEmail] && (
                      <LuCheckCircle className="size-6 font-bold text-blue-700" />
                    )}
                  </p>
                </div>
                <div>
                  {isBuyer ? (
                    <button onClick={() => handleOpenModal(scooter)} className="btn btn-neutral" > Book Now </button>) : (<button disabled className="btn btn-disabled" > For Buyers </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedScooter && (
        <div className="modal modal-open" role="dialog">
          <form onSubmit={handleBooking} className="modal-box">
            <div className='flex justify-between'>
              <h3 className="text-lg font-bold">{selectedScooter?.category}</h3>
              <button type="button" onClick={handleCloseModal}
                className="btn btn-circle btn-sm rounded-full bg-accent text-white"
              >
                X
              </button>
            </div>
            <div className='mb-5'>
              <input type="text" name="name" value={user?.displayName || ''} placeholder="Full name" className="input input-bordered w-full mt-4" disabled />
              <input type="email" name="email" value={user?.email || ''} placeholder="Email id" className="input input-bordered w-full mt-4" disabled />
              <input type="text" name="category" value={selectedScooter?.category} placeholder="Product category" className="input input-bordered w-full mt-4" disabled />
              <input type="text" name="product" value={selectedScooter?.productName} placeholder="Product name" className="input input-bordered w-full mt-4" disabled />
              <input type="text" name="condition" value={selectedScooter?.condition} placeholder="Product condition" className="input input-bordered w-full mt-4" disabled />
              <input type="number" name="price" value={selectedScooter?.offerPrice} placeholder="Product price" className="input input-bordered w-full mt-4" disabled />
              <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="input input-bordered w-full mt-4" required />
              <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Meeting location" className="input input-bordered w-full mt-4" required />
            </div>
            <input type="submit" value="Submit" className="w-full btn btn-neutral" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Scooters;
