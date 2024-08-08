import React, { useEffect, useState } from 'react';
import Option from '../components/recommendation/Option';
import { postOpenAi } from '../redux/features/recommendationSlice';
import { useDispatch, useSelector } from 'react-redux';
import CardRecommendation from '../components/CardRecommendation';

export default function RecommendationPage() {
  const dispatch = useDispatch();
  const { values, isLoading } = useSelector((state) => state.recommendations);
  const [emotion, setEmotion] = useState('');

  const handlerGenerate = () => {
    dispatch(postOpenAi(emotion));
  };

  // useEffect(() => {
  //   console.log(emotion)
  // }, [emotion])

  return (
    <div className="py-32 container mx-auto px-10 lg:px-32">
      <h1 className="font-black text-4xl">Magic Recommendation</h1>
      <p className="font-bold text-gray-400">
        Recommend anime based on your emotions
      </p>

      <div className="card bg-gradient-to-r from-[#E2A171] to-[#E49255] w-full shadow-xl mt-10">
        <div className="card-body">
          <h2 className="font-bold text-2xl text-white">Emotion</h2>
          <p className="font-bold text-gray-600">
            What are you feeling right now?
          </p>

          <div className="mt-5">
            <ul className="grid w-full gap-6 md:grid-cols-5">
              <Option emotion="Happy" setEmotion={setEmotion} />
              <Option emotion="Sad" setEmotion={setEmotion} />
              <Option emotion="Angry" setEmotion={setEmotion} />
            </ul>

            {isLoading ? (
              <button
                onClick={handlerGenerate}
                className="mt-10 btn bg-[#2D2D2D] text-white hover:text-[#2D2D2D] border-none rounded-full px-20"
                disabled
              >
                <span className="loading loading-ring loading-lg"></span>
              </button>
            ) : (
              <button
                onClick={handlerGenerate}
                className="mt-10 btn bg-[#2D2D2D] text-white hover:text-[#2D2D2D] border-none rounded-full px-20"
              >
                Generate
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="card bg-gradient-to-r from-[#E2A171] to-[#E49255] w-full shadow-xl mt-10">
        <div className="card-body">
          <h2 className="font-bold text-2xl text-white">Result Anime</h2>
          <p className="font-bold text-gray-600">
            Anime based on your emotional
          </p>

          <div className="list-card mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {values.map((anime) => {
              return <CardRecommendation key={anime.mal_id} anime={anime} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
