import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllBuyers = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    // Fetch buyers data from the backend
    fetch('http://localhost:5000/buyers')
      .then((response) => response.json())
      .then((data) => { setBuyers(data) })
      .catch((error) => {
        toast.error('Error fetching buyers:', error);
      });
  }, []);


  return (
    <div>
      <h1 className='text-3xl font-semibold'>All Buyers: {buyers?.length} </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full mt-[25px] bg-white">
            {/* head */}
            <thead className='bg-[#E6E6E6]'>
              <tr className='text-black font-semibold text-[14px]'>
                <th scope="col">SL</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>

              {
                buyers?.map((buyer, i) => (
                  <tr key={buyer._id}>
                    <td>{i + 1}</td>
                    <td>{buyer?.name}</td>
                    <td>{buyer?.email}</td>
                    <td><button className="btn btn-error text-white">Remove Buyer</button></td>
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

export default AllBuyers;