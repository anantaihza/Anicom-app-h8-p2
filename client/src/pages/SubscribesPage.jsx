import React from 'react';
import Card from '../components/Card';
import CardSubscribe from '../components/CardSubscribe';

export default function SubscribesPage() {
  return (
    <div className="py-32 container mx-auto px-32">
      <h1 className="font-black text-4xl">My Subscribes</h1>
      <p className="font-bold text-gray-400">Have you finished watching?</p>

      <div className="list-card mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        <CardSubscribe/>
      </div>

      <div className="join mt-10 flex justify-center rounded-full">
        <button className="join-item btn bg-[#E2A171] text-white">«</button>
        <button className="join-item btn bg-[#E2A171] text-white">
          Page 22
        </button>
        <button className="join-item btn bg-[#E2A171] text-white">»</button>
      </div>
    </div>
  );
}
