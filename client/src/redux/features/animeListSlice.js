import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../config/axiosInstance';

const animeListSlice = createSlice({
  name: 'animeList',
  initialState: {
    values: [],
    pagination: {},
    // isLoading: false,
  },
  reducers: {
    setAnimeList: (state, action) => {
      state.values = action.payload.data;
      state.pagination = action.payload.pagination;
      // console.log(state.values)
      // console.log(state.pagination)
    },
  },
});

export const getAnimeList = (page) => {
  return async function(dispatch) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://api.jikan.moe/v4/top/anime?page=${page}`,
        // headers: {
        //   Authorization: `Bearer ${localStorage.access_token}`
        // }
      });

      // console.log(data)
      dispatch(setAnimeList(data))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

// export const getAnimeList = (page) => {
//   return async function(dispatch) {
//     try {
//       const { data } = await axios({
//         method: 'GET',
//         url: `/anime-list?page=${page}`,
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`
//         }
//       });

//       // console.log(data)
//       dispatch(setAnimeList(data))
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// };

export const { setAnimeList } = animeListSlice.actions;

export default animeListSlice.reducer;
