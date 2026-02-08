import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  accessToken?: string | null;
}

const initialState = {
  accessToken: null,
} satisfies AuthState as AuthState;

/**
 * @deprecated Store the access token in memory only (e.g. React state or context) to enhance security.
 * Keeping tokens in Redux or any persistent storage can expose them to XSS attacks.
 * Consider using HttpOnly cookies for refresh tokens and in-memory storage for access tokens.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
export type { AuthState };
