import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loader from '../../../shared/Loading/Loader';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyProducts = () => {

  const { user } = useContext(AuthContext);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (user?.email) {
      //console.log(user.email);
      // Fetch bookings for the logged-in user based on their email
      fetch(`http://localhost:5000/products?email=${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setMyProducts(data);  // Set bookings if they exist
          setLoading(false);   // Stop loading once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);



  // ==== Delete/ Remove buyer, send to back-end to delete from db ==== //
  const handleDelete = (id, category) => {
    if (id && category) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this product?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete product!',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/allProducts/${id}?category=${category}`, {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                toast.success('Product removed successfully!');
                setMyProducts(myProducts.filter((product) => product._id !== id)); // Remove the deleted product from the UI
              } else {
                toast.error('Deletion failed!');
              }
            })
            .catch((error) => {
              console.error('Error deleting product:', error);
              toast.error('Error deleting product', error)
            });
        }
      });
    } else {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
    }
  };



  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className='text-3xl font-semibold'>My Products: {myProducts?.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full mt-[25px] bg-white">
            {/* head */}
            <thead className='bg-[#E6E6E6]'>
              <tr className='text-black font-semibold text-[14px]'>
                <th scope="col">SL</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">PRODUCT</th>
                <th scope="col">PRICE</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>

              {
                myProducts?.map((product, i) => (
                  <tr key={product?._id}>
                    <td>{i + 1}</td>
                    <td>{product?.category}</td>
                    <td>{product?.productName}</td>
                    <td>{product?.offerPrice}</td>
                    <td>
                      {product?.booked ? (
                        <span className="text-green-600">Booked</span>
                      ) : (
                        <span className="text-red-600">Available</span>
                      )}
                    </td>
                    {/* {
                        booking?.price && !booking?.paid &&
                        <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-sm btn-primary'>Pay</button></Link>
                      }
                      {
                        booking?.price && booking?.paid &&
                        <span className='text-green-600'>Paid</span>
                      } */}
                    <td><button onClick={() => handleDelete(product?._id, product?.category)} className="btn btn-error text-white">Remove Product</button></td>
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

export default MyProducts;