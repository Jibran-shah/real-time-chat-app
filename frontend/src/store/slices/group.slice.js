import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGroup: null,
  selectedGroupId: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
      state.selectedGroupId =
        action.payload?._id || action.payload?.id || null;
    },

    setSelectedGroupId: (state, action) => {
      state.selectedGroupId = action.payload;
    },

    clearSelectedGroup: (state) => {
      state.selectedGroup = null;
      state.selectedGroupId = null;
    },
  },
});

export const {
  setSelectedGroup,
  setSelectedGroupId,
  clearSelectedGroup,
} = groupSlice.actions;

export default groupSlice.reducer;