import React from 'react';
import Card from '../components/Card';

export default function HomePage() {
  return (
    <div className="py-32 container mx-auto px-10 lg:px-32">
      <h1 className="font-black text-4xl">Explore</h1>
      <p className="font-bold text-gray-400">What are you gonna see today? </p>

      <div className="list-card mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="join mt-10 flex justify-center rounded-full">
        <button className="join-item btn bg-[#E2A171] text-white">«</button>
        <button className="join-item btn bg-[#E2A171] text-white">Page 22</button>
        <button className="join-item btn bg-[#E2A171] text-white">»</button>
      </div>
    </div>
  );
}
