import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosInstance';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlerRegister = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios({
        method: 'POST',
        url: '/register',
        data: {
          fullName,
          email,
          password,
        },
      });

      console.log(data)
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-full md:w-[45%] bg-[#E2A171] flex content-center">
        <div className="container m-auto px-24">
          <h6 className="font-bold text-lg text-white">START FOR FREE</h6>
          <h1 className="font-black text-5xl text-white">Create New Account</h1>

          <p className="mt-5 font-medium text-white">
            Already a member?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Log In
            </Link>
          </p>

          <form className="mt-10" onSubmit={handlerRegister}>
            <label className="input input-bordered flex items-center gap-2 rounded-full p-7 mb-5">
              <span className="font-medium text-[#2D2D2D]">FullName: </span>
              <input
                type="text"
                className="grow"
                placeholder=""
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 rounded-full p-7 mb-5">
              <span className="font-medium text-[#2D2D2D]">Email: </span>
              <input
                type="email"
                className="grow"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 rounded-full p-7 mb-5">
              <span className="font-medium text-[#2D2D2D]">Password: </span>
              <input
                type="password"
                className="grow"
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="mt-5 btn btn-block btn-lg bg-[#2D2D2D] text-white hover:text-[#2D2D2D] border-none rounded-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:block md:w-[55%] bg-local bg-auth">
        <div className="h-full w-full bg-gradient-to-t from-white from-20% flex justify-center">
          <img className="w-[85%] h-fit mt-auto" src="/auth-img.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
