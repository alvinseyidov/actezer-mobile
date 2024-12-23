import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  token: string | null;
  country: number | null;
  city: number | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  first_name: null,
  last_name: null,
  token: null,
  country: null,
  city: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.token = action.payload.token;
      state.country = action.payload.country;
      state.city = action.payload.city;
    },
    updateCountry(state, action: PayloadAction<number>) {
      state.country = action.payload;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.first_name = null;
      state.last_name = null;
      state.token = null;
      state.country = null;
      state.city = null;
    },
  },
});

export const { setUser, updateCountry, clearUser } = userSlice.actions;

export default userSlice.reducer;
