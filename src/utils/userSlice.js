import { createSlice } from "@reduxjs/toolkit";

// Safely load user from localStorage
let storedUser = null;
try {
  const userData = localStorage.getItem("userInfo");
  if (userData && userData !== "undefined") {
    storedUser = JSON.parse(userData);
  }
} catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
    storedUser = null;
}

const initialState = storedUser;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser: () => {
      localStorage.removeItem("userInfo");
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
