import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimeList } from '../redux/features/animeListSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const { values, pagination } = useSelector((state) => state.animeList);
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getAnimeList(page));
  }, [dispatch, page]);

  return (
    <div className="py-32 container mx-auto px-10 lg:px-32">
      <h1 className="font-black text-4xl">Explore</h1>
      <p className="font-bold text-gray-400">What are you gonna see today? </p>

      <div className="list-card mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        {values.map((anime) => {
          return <Card key={anime.mal_id} anime={anime} />;
        })}
      </div>

      <div className="join mt-10 flex justify-center rounded-full">
        <button className="join-item btn bg-[#E2A171] text-white" onClick={() => page < 1 ? null : setPage(page - 1)}>«</button>
        <button className="join-item btn bg-[#E2A171] text-white">
          Page {pagination.current_page}
        </button>
        <button className="join-item btn bg-[#E2A171] text-white" onClick={() => page >= pagination.last_visible_page ? null : setPage(page + 1)}>»</button>
      </div>
    </div>
  );
}
