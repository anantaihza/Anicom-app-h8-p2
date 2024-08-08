import { configureStore } from '@reduxjs/toolkit';
import animeListReducer from "../features/animeListSlice"
import detailAnimeReducer from '../features/detailAnimeSlice';
import profileReducer from '../features/profileSlice';
import subscribeListReducer from '../features/subscribeListSlice';
import recommendationReducer from '../features/recommendationSlice';

const store = configureStore({
  reducer: {
    animeList: animeListReducer,
    detailAnime: detailAnimeReducer,
    profile: profileReducer,
    subscribes: subscribeListReducer,
    recommendations: recommendationReducer
  }
})

export default store;