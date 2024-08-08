import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../config/axiosInstance';

const detailAnimeSlice = createSlice({
  name: 'detailAnime',
  initialState: {
    anime: {},
    isLoading: false,
  },
  reducers: {
    setDetailAnime: (state, action) => {
      state.anime = action.payload;
      // state.isLoading = false;
      // console.log(state.value)
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setDetailAnime, setIsLoading } = detailAnimeSlice.actions;

export const getDetailAnime = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setIsLoading(true));
      const { data } = await axios({
        method: 'GET',
        url: `/anime-list/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      });
      // console.log(data, '<--')
      
      dispatch(setDetailAnime(data.data));
      dispatch(setIsLoading(false))
    } catch (error) {
      console.log(error, '<--')
      toast.error(error.response.data.message);
    }
  };
};

export const subscribeDetailAnime = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setIsLoading(true));
      const { data } = await axios({
        method: 'POST',
        url: `/subscribe`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        },
        data: {
          mal_id: id
        }
      });
      
      dispatch(setIsLoading(false))
    } catch (error) {
      console.log(error, '<--')
      toast.error(error.response.data.message);
    }
  };
};

export default detailAnimeSlice.reducer;
