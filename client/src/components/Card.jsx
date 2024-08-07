import React from 'react';
import { Link } from 'react-router-dom';

export default function Card() {
  const img = 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg';
  return (
    <Link
      to="/"
      className="card bg-base-100 shadow-xl bg-local h-80 bg-cover relative"
      style={{ backgroundImage: 'url(' + img + ')' }}
    >
      <div className="score absolute bg-[#E2A171] p-2 right-0 top-0 rounded-tr-2xl rounded-bl-xl">
        <p className='font-medium text-white'>4.9</p>
      </div>
      <div className="card-body px-7 h-full w-full bg-gradient-to-t from-[#2D2D2D] rounded-2xl">
        <div className="mt-auto text-white">
          <div className="badge">Ongoing</div>

          <h2 className="font-bold text-xl mt-2 line-clamp-2">
            Frieren
          </h2>
          <p className="mt-2">Episodes: 20</p>
        </div>
      </div>
    </Link>
  );
}
