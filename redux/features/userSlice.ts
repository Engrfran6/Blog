import {User} from '@/lib/utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  user: User | null; // Single user or null if not logged in
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    updatePhoto: (state, action: PayloadAction<User['photo']>) => {
      if (state.user) {
        state.user.photo = action.payload; // Update only the photo field
      }
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const {setUser, updatePhoto, clearUser} = userSlice.actions;
export default userSlice.reducer;
