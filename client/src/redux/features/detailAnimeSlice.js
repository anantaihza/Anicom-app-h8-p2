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
      state.isLoading = false;
      // console.log(state.value)
    },
    setIsLoading: (state, action) => {
      state.isLoading = true;
    },
  },
});

export const getDetailAnime = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading());
      const { data } = await axios({
        method: 'GET',
        url: `/anime-list/${id}`,
      });

      dispatch(setDetailAnime(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const { setDetailAnime } = detailAnimeSlice.actions;

export default detailAnimeSlice.reducer;
