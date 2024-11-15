import React from 'react';
import toast from 'react-hot-toast';

const AddProduct = () => {

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const category = form.category.value;
    const name = form.name.value;
    const location = form.location.value;
    const resalePrice = form.resalePrice.value;
    const condition = form.condition.value;
    const mobile = form.mobile.value;
    const sellerEmail = form.sellerEmail.value;
    const postedOn = form.postedOn.value;

    const product = {
      category,
      name,
      location,
      resalePrice,
      condition,
      mobile,
      sellerEmail,
      postedOn
    };

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
        console.log(data);
        if (data.acknowledged) {
          toast.success("Product added successfully!"); // Show success toast
          form.reset(); // Reset the form after successful submission
        } else {
          toast.error("Failed to add a product!"); // Show error toast
        }
      })
      .catch((error) => {
        toast.error("There was an error with the submission!"); // Show error toast if fetch fails
      });
  };

  return (
    <div className="max-w-sm p-4">
      <div className="card bg-base-100 shadow-2xl p-4">
        <form onSubmit={handleSubmit} className="card-body">
          <h3 className="text-center text-[20px] font-semibold pb-4">Add a New Product</h3>

          {/* Product Category */}
          <div className="form-control pb-2">
            <select className="select select-bordered" name="category" required>
              <option value="">Select Product Category</option>
              <option value="furniture">Furniture</option>
              <option value="scooter">Scooter</option>
              <option value="appliance">Appliance</option>
            </select>
          </div>

          {/* Product Name */}
          <div className="form-control pb-2">
            <input type="text" name="name" placeholder="Product name" className="input input-bordered" required />
          </div>

          {/* Location */}
          <div className="form-control pb-2">
            <input type="text" name="location" placeholder="Location" className="input input-bordered" required />
          </div>

          {/* Product Price */}
          <div className="form-control pb-2">
            <input type="number" name="resalePrice" placeholder="Product price" className="input input-bordered" required />
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

          {/* Mobile Number */}
          <div className="form-control pb-2">
            <input type="number" name="mobile" placeholder="Mobile number" className="input input-bordered" required />
          </div>

          <div className="form-control pb-2">
            <input type="email" name="sellerEmail" placeholder="Seller email" className="input input-bordered" required />
          </div>

          {/* Purchase Year */}
          <div className="form-control pb-2">
            <input type="text" name="postedOn" placeholder="Posted on (Date)" className="input input-bordered" required />
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
