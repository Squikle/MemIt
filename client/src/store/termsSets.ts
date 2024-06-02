import { createSlice } from "@reduxjs/toolkit";
import TermSet from "@shared/@types/TermSet.ts";

const termsSetsState: TermSet[] = [
  {
    id: "0",
    name: "first",
  },
  {
    id: "1",
    name: "second",
  },
  {
    id: "3",
    name: "third",
  },
];

const slice = createSlice({
  name: "termsSets",
  initialState: termsSetsState,
  reducers: {
    termsSetDeleted: (termsSetsState, action) => {
      return termsSetsState.filter((x) => x.id != action.payload);
    },
  },
});

export const { termsSetDeleted } = slice.actions;

export default slice.reducer;
