import React, { useEffect, useState, useContext } from 'react';
import { LuCheckCircle } from 'react-icons/lu';
import { AuthContext } from '../../../contexts/AuthProvider';  // Import AuthContext
import toast from 'react-hot-toast';

const Furnitures = () => {

  const [phone, setPhone] = useState("");  // Initial value
  const [location, setLocation] = useState("");  // Initial value

  const { user } = useContext(AuthContext);  // Access user data from AuthContext
  //console.log(user);  // For debugging purposes

  const [availableFurnitures, setAvailableFurnitures] = useState([]);
  const [selectedFurniture, setSelectedFurniture] = useState(null);  // State for selected furniture

  // Fetch available furniture data from the server
  useEffect(() => {
    fetch("http://localhost:5000/availableFurnitures")
      .then((res) => res.json())
      .then((data) => setAvailableFurnitures(data));
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle opening the modal with selected furniture
  const handleOpenModal = (furniture) => {
    setSelectedFurniture(furniture);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedFurniture(null);
  };

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
      meetingLocation
    };
    //console.log(booking);

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
          setSelectedFurniture(null)
          toast.success("Booking confirmed!")
        } else {
          toast.error("Booking failed")
        }
      })
  };

  return (
    <div className='bg-slate-100 py-[100px]'>
      <h1 className='w-1/2 mx-auto text-3xl lg:text-5xl text-center font-bold text-blue-500 capitalize tracking-wide'>
        Discover your affordable and durable <span className='underline'>Furnitures - {availableFurnitures.length} no.</span>
      </h1>
      <div className='lg:w-[95%] px-[1%] mx-auto pt-[70px]'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {availableFurnitures?.map((furniture) => (
            <div key={furniture._id} className='border hover:border-none shadow-2xl hover:shadow-none bg-white rounded-2xl overflow-hidden relative team-card p-4'>
              <div className="overflow-hidden relative space-x-2 text-center">
                <img
                  className="inline w-[300px] object-contain h-[250px] hover:scale-110 scale-100 transition-all duration-500"
                  src={furniture.picture}
                  alt="furniture"
                />
              </div>

              <div className="w-full bg-white tracking-wider px-5 pb-5 flex justify-between items-end">
                <div className='text-left space-y-4'>
                  <h4 className="text-xl font-bold text-blue-900">{furniture.name}</h4>
                  <p className='text-orange-600 text-lg font-bold text-blue-900/85'>Price: Rs {furniture.resalePrice}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Bought by: Rs {furniture.originalPrice}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Location: {furniture.location}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Old: {furniture.usage}</p>
                  <p className='text-blue-900/85 text-md font-semibold'>Posted on: {furniture.postedOn}</p>
                  <p className='flex gap-6 items-center text-green-500 text-lg font-semibold'>
                    Seller: {furniture.seller}{' '}
                    <LuCheckCircle className={`${furniture.emailVerified ? "font-bold text-blue-700" : "hidden"}`} />
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleOpenModal(furniture)}  // Open modal with selected furniture
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
      {selectedFurniture && (
        <div className="modal modal-open" role="dialog">
          <form onSubmit={handleBooking} className="modal-box">
            <div className='flex justify-between'>
              <h3 className="text-lg font-bold">{selectedFurniture?.category}</h3>
              <button
                type="button"
                onClick={handleCloseModal}  // Close modal when clicked
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
              {/* Pre-fill the selected furniture's name */}
              <input
                type="text"
                name="product"
                value={selectedFurniture?.name}
                placeholder="Product name"
                className="input input-bordered w-full mt-4"
                disabled
              />
              {/* Pre-fill the selected furniture's resale price */}
              <input
                type="number"
                name="price"
                value={selectedFurniture?.resalePrice}
                placeholder="Product price"
                className="input input-bordered w-full mt-4"
                disabled
              />
              {/* Phone number field */}
              <input
                type="number"
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

export default Furnitures;
