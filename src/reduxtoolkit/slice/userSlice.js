import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginAPI, logoutAPI } from '../apiService';

export const login = createAsyncThunk(
  'user/login',
  async ( { email, password }, {dispatch, getState, rejectWithValue, fulfillWithValue} ) => {
    try {
      const response = await loginAPI( { email, password } );
      return fulfillWithValue(response);
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async ( ) => {
    try {
      const response = await logoutAPI( );
      return response;
    } catch (e) {
      return e;
    }
  }
)

const initialState = {
  userInfor: {},
  isLoggin: false,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {
    //Login
    [login.pending]: (state, action) => {
      state.isLoggin = false;
      state.userInfor={};
    },
    [login.fulfilled]: (state, action) => {
      const id = action.payload?.userData?.id;
      const email = action.payload?.userData?.email;
      const name = action.payload?.userData?.name;
      const roleID = action.payload?.userData?.roleID;

      const user = { id, email, name, roleID };

      state.userInfor = id!=="" ? user : {};
      state.isLoggin = action.payload.errCode === 0 ? true : false;
    },
    [login.rejected]: (state, action) => {
      state.isLoggin = false;
      state.userInfor={};
    },

    //Logout
    [logout.fulfilled]: (state, action) => {
      state.userInfor = {};
      state.isLoggin = false
    },
    [logout.rejected]: (state, action) => {
      
    }

  },
})

export default user.reducer


