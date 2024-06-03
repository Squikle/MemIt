import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {getSets} from "@/api/termSetsApi.ts";
import TermSet from "@shared/@types/TermSet";
import {RootState} from "@/store/types.ts";

export type TermsSetsState = {
  sets: TermSet[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: TermsSetsState = {
  sets: [],
  status: 'idle',
  error: null
}

export const fetchSets = createAsyncThunk('sets/fetchAll', () => {
  return getSets();
})

const slice = createSlice({
  name: "termsSets",
  initialState: initialState,
  reducers: {
    termsSetDeleted: (state, action) => {
      state.sets = state.sets.filter((x) => x.id != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSets.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchSets.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.sets = state.sets.concat(action.payload);
    })
    .addCase(fetchSets.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || null
    })
  }
});

export const { termsSetDeleted } = slice.actions;

export default slice.reducer;

export const selectTermsSet = createSelector(
    [
      (state: RootState) => state.entities.termsSets.sets,
      (_: any, termsSetId: string) => termsSetId
    ],
    (terms, termsSetId) => terms.find((x) => x.id === termsSetId)
);

export const selectAllTermsSets = createSelector(
    (state: RootState) => state.entities.termsSets.sets,
    (termsSets) => termsSets,
);
