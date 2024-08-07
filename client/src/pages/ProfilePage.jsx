import React from 'react';

export default function ProfilePage() {
  return (
    <div className="py-32 container mx-auto px-10 lg:px-32">
      <h1 className="font-black text-4xl text-center">Profile</h1>
      <p className="font-bold text-gray-400 text-center">
        Do you want to change your profile?
      </p>

      <div className="flex justify-center mt-10">
        <div className="card bg-gradient-to-r from-[#E2A171] to-[#E49255] w-full md:w-[80%] lg:w-[60%] xl:w-[40%] shadow-xl">
          <div className="card-body text-white">
            <h2 className="font-bold text-3xl text-center">Your Profile Form</h2>

            <form className='mt-10'>
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
                <span className="font-medium text-[#2D2D2D]">Choose Avatar </span>

                <input type="file" className=" grow file-input rounded-full text-[#2D2D2D]" />
              </label>

              <button
              type="submit"
              className="mt-5 btn btn-block btn-lg bg-[#2D2D2D] text-white hover:text-[#2D2D2D] border-none rounded-full"
            >
              Update Profile
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
