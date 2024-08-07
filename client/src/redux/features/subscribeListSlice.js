import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../config/axiosInstance';

const subscribeListSlice = createSlice({
  name: 'subscribeListSlice',
  initialState: {
    list: [],
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const getSubscribe = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `/subscribe`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      console.log(data)
      dispatch(setList(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const watchedSubscribe = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `/subscribe/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      
      toast.success(data.message)
      dispatch(getSubscribe())
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const upVoteSubscribe = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `/subscribe/${id}/up-vote`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      
      toast.success(data.message)
      dispatch(getSubscribe())
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const neutralVoteSubscribe = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `/subscribe/${id}/neutral-vote`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(getSubscribe())
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const downVoteSubscribe = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `/subscribe/${id}/down-vote`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      
      toast.success(data.message)
      dispatch(getSubscribe())
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const deleteSubscribe = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: `/subscribe/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      
      toast.success(data.message)
      dispatch(getSubscribe())
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const { setList } = subscribeListSlice.actions;

export default subscribeListSlice.reducer;