import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserAPI, getAllUsersAPI } from '../apiService';

export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async () => {
    try {
      const response = await getAllUsersAPI();
      return response;
    } catch (e) {
      return e;
    }
  }
)

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (data) => {
    try {
      const response = await createUserAPI(data);
      return response;
    } catch (e) {
      return e;
    }
  }
)

const initialState = {
  users: [],
  isLoading: false
}

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: {

    [getAllUsers.pending]: (state, action) => {
      state.isLoading = false
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = true
    },
    [getAllUsers.rejected]: (state, action) => {
      state.users = [];
      state.isLoading = false
    },
  },
})

export default admin.reducer