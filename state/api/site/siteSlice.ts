import { createSlice } from "@reduxjs/toolkit";
import { site } from "./siteApi";
import { RootState } from "@/state/store";
import { ISiteSettings } from "@/types/types";

interface InitialState {
  siteSettings: ISiteSettings | null;
}

const initialState: InitialState = {
  siteSettings: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      site.endpoints.getSiteSettings.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
  },
});

export default settingsSlice.reducer;
export const selectSettings = (state: RootState) => state.settings.siteSettings;
