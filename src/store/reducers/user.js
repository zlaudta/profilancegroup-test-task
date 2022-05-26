import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: null,
	isAdmin: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: () => {
			return initialState;
		},
		login: (state, { payload }) => {
			state.name = payload.username;

			if (payload.username === "admin") {
				state.isAdmin = true;
			} else {
				state.isAdmin = false;
			}
		},
	},
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
