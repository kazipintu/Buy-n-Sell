import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllSellers = () => {

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // Fetch sellers data from the backend
    fetch('http://localhost:5000/sellers')
      .then((response) => response.json())
      .then((data) => {
        setSellers(data);
        console.log("Fetched Sellers:", data); // Debug log
      })
      .catch((error) => {
        toast.error('Error fetching sellers:', error);
      });
  }, []);

  const refetchSellers = () => {
    fetch('http://localhost:5000/sellers')
      .then((response) => response.json())
      .then((data) => setSellers(data))
      .catch((error) => {
        toast.error('Error refetching sellers:', error);
      });
  };

  const handleVerifySeller = (id) => {
    //console.log("hanldleVerifySeller", id);
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to verify this seller?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, verify it!',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/sellers/${id}`, {
            method: 'PUT',
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                toast.success('Seller verified successfully!');
                // Refetch sellers data after successful verification
                refetchSellers(); // This will reload the sellers list after verification
              } else {
                toast.error('Verification failed!');
              }
            })
            .catch((error) => toast.error('Verification error', error));
        }
      });
    } else {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
    }
  };


  // ==== Delete/ Remove seller, send to back-end to delete from db ==== //
  const handleDelete = (id) => {
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this seller?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete seller!',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/sellers/${id}`, {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                toast.success('Seller removed successfully!');
                // Refetch sellers data after successful verification
                refetchSellers(); // This will reload the sellers list after verification
              } else {
                toast.error('Deletion failed!');
              }
            })
            .catch((error) => toast.error('Deletion error', error));
        }
      });
    } else {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
    }
  };


  return (
    <div>
      <h1 className='text-3xl font-semibold'>All Sellers: {sellers?.length} </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full mt-[25px] bg-white">
            {/* head */}
            <thead className='bg-[#E6E6E6]'>
              <tr className='text-black font-semibold text-[14px]'>
                <th scope="col">SL</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">VERIFICATION</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {sellers?.map((seller, i) => (
                <tr key={seller?._id}>
                  <td>{i + 1}</td>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td>
                    {seller?.emailVerified === true
                      ? (<button className='btn btn-accent'>Verified</button>)
                      : (<button onClick={() => handleVerifySeller(seller?._id)} className="btn btn-neutral text-white">Verify</button>)
                    }
                  </td>
                  <td><button onClick={() => handleDelete(seller?._id)} className="btn btn-error text-white">Remove Seller</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSellers;
