import { configureStore } from '@reduxjs/toolkit';
import animeListReducer from "../features/animeListSlice"
import detailAnimeReducer from '../features/detailAnimeSlice';
import profileReducer from '../features/profileSlice';

const store = configureStore({
  reducer: {
    animeList: animeListReducer,
    detailAnime: detailAnimeReducer,
    profile: profileReducer
  }
})

export default store;