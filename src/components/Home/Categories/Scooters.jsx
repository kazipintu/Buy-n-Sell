import React, { useEffect, useState, useContext } from 'react';
import { LuCheckCircle } from 'react-icons/lu';
import { AuthContext } from '../../../contexts/AuthProvider';  // Import AuthContext
import toast from 'react-hot-toast';

const Scooters = () => {
  const { user } = useContext(AuthContext);  // Access user data from AuthContext
  console.log(user);  // For debugging purposes

  const [phone, setPhone] = useState("");  // State for phone number
  const [location, setLocation] = useState("");  // State for meeting location
  const [availableScooters, setAvailableScooters] = useState([]);
  const [selectedScooter, setSelectedScooter] = useState(null);  // State for selected scooter

  // Fetch available scooters data from the server
  useEffect(() => {
    fetch("http://localhost:5000/availableScooters")
      .then((res) => res.json())
      .then((data) => setAvailableScooters(data));
  }, []);

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

  // Handle the form submission
  const handleBooking = (event) => {
    event.preventDefault();

    const form = event.target;

    const buyerName = form.name.value;
    const buyerEmail = form.email.value;
    const buyerPhone = form.phone.value;
    const productName = form.product.value;
    const productPrice = form.price.value;
    const meetingLocation = form.location.value;

    const booking = {
      buyerName,
      buyerEmail,
      buyerPhone,
      productName,
      productPrice,
      meetingLocation,
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
          toast.success("Booking confirmed!")
        } else {
          toast.error("Booking failed")
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
        discover your affordable and durable <span className='underline'>Scooters - {availableScooters.length} no.</span>
      </h1>
      <div className='lg:w-[95%] px-[1%] mx-auto pt-[70px]'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {availableScooters?.map((scooter) => (
            <div key={scooter._id} className='border hover:border-none shadow-2xl hover:shadow-none bg-white rounded-2xl overflow-hidden relative team-card p-4'>
              <div className="overflow-hidden relative space-x-2 text-center">
                <img
                  className="inline w-[300px] object-contain h-[250px] hover:scale-110 scale-100 transition-all duration-500"
                  src={scooter?.picture} alt="scooter" />
              </div>

              <div className="w-full bg-white tracking-wider px-5 pb-5 flex justify-between items-end">
                <div className='text-left space-y-4'>
                  <h4 className="text-xl font-bold text-blue-900">{scooter?.name}</h4>
                  <p className='text-orange-600 text-lg font-bold text-blue-900/85'>Price: Rs {scooter?.resalePrice}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Bought by: Rs {scooter?.originalPrice}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Location: {scooter?.location}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Old: {scooter?.usage}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Posted-on: {scooter?.postedOn}</p>
                  <p className='flex gap-6 items-center text-green-500 text-lg font-semibold'>
                    Seller: {scooter?.seller}{' '}
                    <LuCheckCircle className={`${scooter?.emailVerified ? "font-bold text-blue-700" : "hidden"}`} />
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleOpenModal(scooter)}  // Open the modal with the selected scooter
                    className="btn btn-neutral"
                  >
                    Book Now
                  </button>
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
              <button
                type="button"
                onClick={handleCloseModal}  // Close the modal
                className="btn btn-circle btn-sm rounded-full bg-accent text-white"
              >
                X
              </button>
            </div>
            <div className='mb-5'>
              {/* Pre-fill the user's name from AuthContext */}
              <input
                type="text"
                name="name"
                value={user?.displayName || ''}  // Pre-fill with the user's name from AuthContext
                placeholder="Full name"
                className="input input-bordered w-full mt-4"
                disabled
              />
              {/* Pre-fill the user's email from AuthContext */}
              <input
                type="email"
                name="email"
                value={user?.email || ''}  // Pre-fill with the user's email from AuthContext
                placeholder="Email id"
                className="input input-bordered w-full mt-4"
                disabled
              />
              {/* Pre-fill the selected scooter's name */}
              <input
                type="text"
                name="product"
                value={selectedScooter?.name}
                placeholder="Product name"
                className="input input-bordered w-full mt-4"
                disabled
              />
              {/* Pre-fill the selected scooter's resale price */}
              <input
                type="number"
                name="price"
                value={selectedScooter?.resalePrice}
                placeholder="Product price"
                className="input input-bordered w-full mt-4"
                disabled
              />
              {/* Phone number field */}
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="input input-bordered w-full mt-4"
                required
              />
              {/* Meeting location field */}
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Meeting location"
                className="input input-bordered w-full mt-4"
                required
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="w-full btn btn-neutral"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Scooters;
