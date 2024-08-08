import React from 'react';
import { Link } from 'react-router-dom';

export default function CardRecommendation({ anime }) {
  return (
    <div className="card bg-gradient-to-r to-[#2D2D2D] from-slate-700 shadow-xl">
      <div className="score absolute bg-[#E49255] p-2 right-0 top-0 rounded-tr-xl rounded-bl-xl">
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
      <div className="card-body px-7 h-full w-full rounded-2xl">
        <div className=" text-white flex flex-col gap-5 content-between">
          <div className="mt-0">
            <div className="badge">{anime.status}</div>
            <h2 className="font-bold text-xl mt-3 line-clamp-1">
              {anime.title}
            </h2>
            <p className="">Episodes: {anime.episodes}</p>
          </div>
          <div className="">
            <p className="mt-5 font-bold">Synopsis:</p>
            <p>{anime.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
