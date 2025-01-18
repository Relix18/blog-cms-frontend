import { createSlice } from "@reduxjs/toolkit";
import { site } from "./siteApi";
import { RootState } from "@/state/store";

const settingsSlice = createSlice({
  name: "settings",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      site.endpoints.getSiteSettings.matchFulfilled,
      (state, { payload }) => {
        return payload.siteSettings;
      }
    );
  },
});

export default settingsSlice.reducer;
export const selectSettings = (state: RootState) => state.settings;
