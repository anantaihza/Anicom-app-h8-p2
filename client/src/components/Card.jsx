import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ anime }) {
  return (
    <Link
      to={`/${anime.mal_id}`}
      className="card bg-base-100 shadow-xl bg-local h-80 bg-cover relative"
      style={{ backgroundImage: 'url(' + anime.images.jpg.image_url + ')' }}
    >
      <div className="score absolute bg-[#E2A171] p-2 right-0 top-0 rounded-tr-2xl rounded-bl-xl">
        <p className="font-medium text-white flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 my-auto text-yellow-400 w-4"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{anime.score}</span>
        </p>
      </div>
      <div className="card-body px-7 h-full w-full bg-gradient-to-t from-[#2D2D2D] rounded-2xl">
        <div className="mt-auto text-white">
          <div className="badge">{anime.status}</div>

          <h2 className="font-bold text-xl mt-2 line-clamp-1">{anime.title}</h2>
          <p className="mt-2">Episodes: {anime.episodes}</p>
        </div>
      </div>
    </Link>
  );
}
