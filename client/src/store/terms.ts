import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import * as termsSetsActions from "./termsSets.ts";
import {addOrUpdateTerm, getTerm, getTermsBySet, removeTerm as removeTermApi} from "@/api/termsApi.ts";
import {RootState} from "@/store/types.ts";
import Term, {toDomain, toDto} from "@/@types/Term.ts";
import { generateId } from "@shared/utils/generateId";

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
  const terms = await getTermsBySet(setId);
  const asDomain = terms.map(x => toDomain(x));
  return { terms: asDomain, setId };
})

export const fetchTerm = createAsyncThunk('terms/fetchById', async (termId: string) => {
  const term = await getTerm(termId);
  return toDomain(term);
})

export const addNewTerm = createAsyncThunk(
    'terms/addNew',
    async (term: Term) => {
      const asDto = toDto(term);
      return { termId: await addOrUpdateTerm(asDto), term };
    }
)

export const removeTerm = createAsyncThunk(
    'terms/remove',
    async (termId: string) => {
      return { termId: await removeTermApi(termId) };
    }
)

const slice = createSlice({
  name: "terms",
  initialState: initialState,
  reducers: {
    emptyTermAdded: (state, action) => {
      state.terms.push({
        id: generateId(),
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
    })
    .addCase(removeTerm.fulfilled, (state, action) => {
      state.terms = state.terms.filter((x) => x.id !== action.payload.termId);
    })
    .addCase(addNewTerm.fulfilled, (state, action) => {
      const index = state.terms.findIndex((term) => term.id === action.payload.termId);
      if (index === -1) {
        state.terms.push(action.payload.term);
        return;
      }

      const updatingTerm = state.terms[index];
      state.terms[index] = {
        ...updatingTerm,
        ...action.payload.term,
        isNew: false,
      };
    })
  },
});

export const { emptyTermAdded } = slice.actions;

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