import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import * as termsSetsActions from "./termsSets.ts";
import { v4 as uuidv4 } from "uuid";
import Term from "@shared/@types/Term.ts";
import {getTerm, getTermsBySet} from "@/api/termsApi.ts";
import {RootState} from "@/store/types.ts";

export type TermsState = {
  terms: Term[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: TermsState = {
  terms: [],
  status: 'idle',
  error: null
}

export const fetchTermsBySet = createAsyncThunk('terms/fetchBySet', async (setId: string) => {
    return { terms: await getTermsBySet(setId), setId };
})

export const fetchTerm = createAsyncThunk('terms/fetchById', (termId: string) => {
  return getTerm(termId);
})

const slice = createSlice({
  name: "terms",
  initialState: initialState,
  reducers: {
    termUpdated: (state, action) => {
      const index = state.terms.findIndex((bug) => bug.id === action.payload.id);
      const updatingTerm = state.terms[index];
      state.terms[index] = {
        ...updatingTerm,
        ...action.payload,
        isNew: false,
      };
    },
    termDeleted: (state, action) => {
      state.terms = state.terms.filter((x) => x.id != action.payload);
    },
    emptyTermAdded: (state, action) => {
      state.terms.push({
        id: uuidv4(),
        expression: "",
        translation: "",
        setId: action.payload.setId,
        isNew: true,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(termsSetsActions.termsSetDeleted, (state, action) => {
      state.terms = state.terms.filter((term) => term.setId !== action.payload);
    })
    .addCase(fetchTermsBySet.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchTermsBySet.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.terms = state.terms
          .filter(x => x.setId !== action.payload.setId)
          .concat(action.payload.terms);
    })
    .addCase(fetchTermsBySet.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || null
    });
  },
});

export const { termUpdated, termDeleted, emptyTermAdded } = slice.actions;

export default slice.reducer;

export const selectTermsBySetId = createSelector(
    [
        (state: RootState) => state.entities.terms.terms,
        (_: any, termsSetId: string) => termsSetId
    ],
    (terms: Term[], termsSetId) => terms.filter((x) => x.setId === termsSetId)
);

export const selectTermById = createSelector(
    [
      (state: RootState) => state.entities.terms.terms,
      (_: any, termId: string) => termId
    ],
    (terms: Term[], termId) => terms.find((x) => x.id === termId)
);