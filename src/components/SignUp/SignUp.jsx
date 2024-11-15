import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const SignUp = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";  // Determine where to navigate after sign-up

  // Function to handle user sign-up
  const handleSignUp = (data) => {
    setSignUpError('');

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        const updatingUser = {
          displayName: data.name,  // Update the user's display name
        };

        // Update user profile with display name
        updateUser(updatingUser)
          .then(() => {
            // Pass navigate and from to storedUserToDB
            storedUserToDB(data.name, data.email, data.userType, navigate, from);
      
            // Reset form after successful submission
            reset();  // Reset form fields

            // If user is successfully added to the backend
            toast.success('Account Created Successfully!');
          })
          .catch((error) => {
            setSignUpError(error.message);
          });
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };

  // Function to store user data in the database
  const storedUserToDB = (name, email, userType, navigate, from) => {
    const user = { name, email, userType };  // Include userType in the request body

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),  // Send user data with userType
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {

          // Navigate to the homepage or the previous page
          navigate(from, { replace: true });
        } else {
          toast.error('Failed to create an account');
        }
      })
      .catch((error) => {
        console.error('Error storing user:', error);
        toast.error('Error creating account');
      });
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-4">
        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
          <h3 className="text-center text-[20px] font-semibold">Sign Up</h3>

          {/* Name Field */}
          <div className="form-control pb-2">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="form-control pb-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="input input-bordered"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="form-control pb-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be minimum 8 characters long",
                },
              })}
              placeholder="Password"
              className="input input-bordered"
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>

          {/* User Type Field */}
          <div className="form-control pb-2">
            <label className="label">
              <span className="label-text">User Type</span>
            </label>
            <select
              {...register("userType", { required: "Please select your user type" })}
              className="select select-bordered"
            >
              <option value="">Select User Type</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.userType && <p className="text-red-600">{errors.userType.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-3">
            <input type="submit" className="btn btn-neutral" value="Sign Up" />
          </div>

          {/* Sign Up Error */}
          {signUpError && <p className="text-red-600">{signUpError}</p>}

          {/* Redirect to Login */}
          <label className="text-center pt-2">
            <Link to="/login" className="label-text-alt link link-hover">Already have an account? Please login</Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
