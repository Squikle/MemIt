import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {getSets, removeSet as removeSetApi} from "@/api/termSetsApi.ts";
import {RootState} from "@/store/types.ts";
import TermSet from "@/@types/TermSet.ts";

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

export const removeSet = createAsyncThunk('sets/remove', async (setId: string) => {
  return { setId: await removeSetApi(setId) };
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
      state.sets = action.payload;
    })
    .addCase(fetchSets.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || null
    })
    .addCase(removeSet.fulfilled, (state, action) => {
      state.sets = state.sets.filter((x) => x.id !== action.payload.setId);
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
