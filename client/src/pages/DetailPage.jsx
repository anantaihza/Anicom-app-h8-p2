import React from 'react';

export default function DetailPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-10 lg:px-32">
      <h1 className="font-black text-4xl">Detail Anime</h1>
      <p className="font-bold text-gray-400">
        Detail information about anime dfdffds
      </p>

      <div className="card bg-base-100 w-full shadow-xl mt-10 px-5 py-16">
        <div className="px-12 flex gap-10">
          <div className="w-[20%]">
            <img
              src="https://cdn.myanimelist.net/images/anime/1015/138006.jpg"
              className="rounded-2xl"
              alt=""
            />
          </div>
          <div className="w-[80%] my-auto">
            <p className="flex my-auto font-bold text-2xl mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 my-auto text-yellow-400 text-5xl w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="my-auto">4.9</span>
            </p>
            <div className="">
              <p className="font-bold text-xl text-gray-400">28 Episodes</p>
              <h1 className="font-bold text-5xl text-[#E2A171]">Sousou no Frieren</h1>
              <p className="font-bold text-lg text-gray-700">
                Frieren: Beyond Journey's End
              </p>

              <div className="flex gap-2 mt-5">
                <p className="font-medium ">Genres:</p>
                <div className="badge badge-outline text-[#E2A171] my-auto">
                  Comedy
                </div>
                <div className="badge badge-outline text-[#E2A171] my-auto">
                  Drama
                </div>
              </div>

              <div className="stats stats-vertical lg:stats-horizontal shadow mt-5">
                <div className="stat">
                  <div className="stat-title">Type</div>
                  <div className="stat-value text-xl">TV</div>
                  {/* <div className="stat-desc">Anime</div> */}
                </div>

                <div className="stat">
                  <div className="stat-title">Studios</div>
                  <div className="stat-value text-xl">Toei Animation</div>
                  {/* <div className="stat-desc"></div> */}
                </div>

                <div className="stat">
                  <div className="stat-title">Status</div>
                  <div className="stat-value text-xl">Finished Airing</div>
                  {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-12 mt-10">
          <p className="font-bold text-xl">
            Rating: PG-13 - Teens 13 or older
          </p>
          <p className="font-bold mt-10">Description:</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
            possimus voluptatem, maxime est dolores odio nesciunt sapiente
            accusamus voluptas corrupti neque consequatur facere, voluptatibus
            dicta quibusdam aliquam dolorum ea voluptatum!
          </p>
        </div>
      </div>
    </div>
  );
}
