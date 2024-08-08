import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../config/axiosInstance';

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState: {
    values: [],
    isLoading: false,
  },
  reducers: {
    setRecommendation: (state, action) => {
      state.values = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const postOpenAi = (emotion) => {
  return async function (dispatch) {
    try {
      dispatch(setIsLoading(true));
      const { data } = await axios({
        method: 'POST',
        url: `/open-ai`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: {
          emotion,
        },
      });

      // toast.success(data.message);
      dispatch(setRecommendation(data));
      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsLoading(false))
      toast.error(error.response.data.message);
    }
  };
};

export const { setRecommendation, setIsLoading } = recommendationSlice.actions;

export default recommendationSlice.reducer;
