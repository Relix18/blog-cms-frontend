import { createSlice } from "@reduxjs/toolkit";
import { site } from "./siteApi";
import { RootState } from "@/state/store";
import { ISiteSettings } from "@/types/types";

interface InitialState {
  settings: ISiteSettings | null;
}

const initialState: InitialState = {
  settings: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
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
export const selectSettings = (state: RootState) => state.settings.settings;
