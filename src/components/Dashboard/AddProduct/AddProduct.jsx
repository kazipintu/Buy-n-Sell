import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProduct = () => {

  const { user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const productName = form.productName.value;
    const category = form.category.value;
    const details = form.details.value;
    const condition = form.condition.value;
    const howOld = form.howOld.value;
    const location = form.location.value;
    const originalPrice = form.originalPrice.value;
    const offerPrice = form.offerPrice.value;
    const postedOn = form.postedOn.value;
    const mobile = form.mobile.value;
    const sellerName = form.sellerName.value;
    const sellerEmail = form.sellerEmail.value;

    const product = {
      productName,
      category,
      details,
      condition,
      howOld,
      location,
      originalPrice,
      offerPrice,
      postedOn,
      mobile,
      sellerName,
      sellerEmail,
    };

    //console.log(product);

    // Submit the product data to the server
    fetch('http://localhost:5000/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.acknowledged) {
          form.reset();
          toast.success("Product added successfully!");
        } else {
          toast.error("Failed to add a product!"); // Show error toast
        }
      })
      .catch((error) => {
        //console.error("Error submitting booking:", error);
        toast.error("An error occurred while posting the data.");
      });
  };

  return (
    <div className="max-w-sm p-4">
      <div className="card bg-base-100 shadow-2xl p-4">
        <form onSubmit={handleSubmit} className="card-body">
          <h3 className="text-center text-[20px] font-semibold pb-4">Add a New Product</h3>

          {/* Product Name */}
          <div className="form-control pb-2">
            <input type="text" name="productName" placeholder="Product name" className="input input-bordered" required />
          </div>

          {/* Product Category */}
          <div className="form-control pb-2">
            <select className="select select-bordered" name="category" required>
              <option value="">Select Product Category</option>
              <option value="furniture">Furniture</option>
              <option value="scooter">Scooter</option>
              <option value="appliance">Appliance</option>
            </select>
          </div>

          {/* Product Details */}
          <div className="form-control pb-2">
            <textarea type="text" name="details" placeholder="Product details" className="input input-bordered" required />
          </div>

          {/* Product Condition */}
          <div className="form-control pb-2">
            <select className="select select-bordered" name="condition" required>
              <option value="">Select Product Condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          {/* Procduct age */}
          <div className="form-control pb-2">
            <input type="text" name="howOld" placeholder="Years of use" className="input input-bordered" required />
          </div>

          {/* Location */}
          <div className="form-control pb-2">
            <input type="text" name="location" placeholder="Location" className="input input-bordered" required />
          </div>

          {/* Product Original Price */}
          <div className="form-control pb-2">
            <input type="number" name="originalPrice" placeholder="Buying price" className="input input-bordered" required />
          </div>

          {/* Product Resale Price */}
          <div className="form-control pb-2">
            <input type="number" name="offerPrice" placeholder="Selling price" className="input input-bordered" required />
          </div>

          {/* Product Posting Date */}
          <div className="form-control pb-2">
            <input type="text" name="postedOn" placeholder="Posting date (DD-MM-YYYY)" className="input input-bordered" required />
          </div>

          {/* Seller Mobile Number */}
          <div className="form-control pb-2">
            <input type="number" name="mobile" placeholder="Mobile number" className="input input-bordered" required />
          </div>

          {/* Seller Name */}
          <div className="form-control pb-2">
            <input type="text" name="sellerName" value={user?.displayName || ''} disabled placeholder="Seller name" className="input input-bordered" required />
          </div>

          {/* Seller Email */}
          <div className="form-control pb-2">
            <input type="email" name="sellerEmail" value={user?.email || ''} disabled placeholder="Seller email" className="input input-bordered" required />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-3">
            <input type="submit" className="btn btn-neutral" value="Add Product" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
