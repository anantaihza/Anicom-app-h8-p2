import React, { useEffect } from 'react';
import CardSubscribe from '../components/CardSubscribe';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribe } from '../redux/features/subscribeListSlice';

export default function SubscribesPage() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.subscribes);

  useEffect(() => {
    dispatch(getSubscribe());
  }, [dispatch]);

  return (
    <div className="py-32 container mx-auto px-32">
      <h1 className="font-black text-4xl">My Subscribes</h1>
      <p className="font-bold text-gray-400">Have you finished watching?</p>

      <div className="list-card mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        {list.map((anime) => {
          return <CardSubscribe key={anime.id} anime={anime} />;
        })}
      </div>

      
    </div>
  );
}
