import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-screen h-screen flex">
      <div className="w-full md:w-[45%] bg-[#E2A171] flex content-center">
        <div className="container m-auto px-24">
          <h6 className="font-bold text-lg text-white">
            HI MEMBER WELCOME BACK
          </h6>
          <h1 className="font-black text-5xl text-white">Welcome Back</h1>

          <p className="mt-5 font-medium text-white">
            Not a member yet?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register
            </Link>
          </p>

          <form className="mt-10">
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
              Login
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
