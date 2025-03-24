import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
}

// Check if user is authenticated in localStorage
const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" ? localStorage.getItem("isAuthenticated") === "true" : false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

