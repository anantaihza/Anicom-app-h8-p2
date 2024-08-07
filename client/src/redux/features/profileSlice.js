import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../config/axiosInstance';

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: {
    profile: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const getProfile = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `/profile`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      // console.log(data)
      dispatch(setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const putProfile = (fullName, imageUrl) => {
  return async function (dispatch) {
    try {
      const dataUpload = new FormData();
      dataUpload.append('fullName', fullName);
      dataUpload.append('imageUrl', imageUrl);

      const { data } = await axios({
        method: 'PUT',
        url: `/profile`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: dataUpload,
      });

      toast.success("Success to update profile")
      dispatch(getProfile())
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
