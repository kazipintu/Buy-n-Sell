import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [signInError, setSignInError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    //console.log(data);
    setSignInError('');
    signIn(data.email, data.password)
      .then((result) => {
        // After login, navigate to the dashboard
        toast.success('Login Successful!');
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setSignInError(error.message);
      });
  };

  return (
    <div className='container mx-auto flex justify-center items-center min-h-screen'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-4">
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
          <h3 className='text-center text-[20px] font-semibold'>Login</h3>

          <div className="form-control pb-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" {...register("email", { required: "Email is required" })} placeholder="email" className="input input-bordered" />
            {errors.email && <p className='text-red-600' role="alert">{errors.email.message}</p>}
          </div>

          <div className="form-control pb-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" {...register("password", { required: "Password is required" })} placeholder="password" className="input input-bordered" />
            {errors.password && <p className='text-red-600' role="alert">{errors.password.message}</p>}

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-3">
            <button className="btn btn-neutral">Login</button>
          </div>

          {signInError && <p className='text-red-600'>{signInError}</p>}

          <label className="text-center pt-2">
            <Link to='/signup' className="label-text-alt link link-hover">Don't have an account? <span className='text-primary'>Create a new account</span></Link>
          </label>

          <div className="divider">OR</div>

          <div className="form-control mt-1">
            <button className="btn btn-outline uppercase">CONTINUE WITH GOOGLE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
