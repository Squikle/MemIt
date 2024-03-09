import { createSlice } from "@reduxjs/toolkit";
import trainImage from "../stories/assets/train.jpg";
import * as termsSetsActions from "./termsSets";

const termsState = [
  {
    id: "0",
    expression: "term1",
    translation: "переклад1",
    setId: "0",
  },
  {
    id: "1",
    expression: "term2",
    expressionImage: trainImage,
    translation: "переклад2",
    setId: "0",
  },
  {
    id: "2",
    expression: "term2",
    expressionImage: trainImage,
    translation: "переклад2",
    translationImage: trainImage,
    setId: "0",
  },
  {
    id: "3",
    expression: "term2",
    translation: "переклад2",
    translationImage: trainImage,
    setId: "0",
  },
  {
    id: "4",
    expression:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
    translation: "переклад2",
    translationImage: trainImage,
    setId: "0",
  },
  {
    id: "5",
    expression:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
    translation:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
    translationImage: trainImage,
    setId: "0",
  },
  {
    id: "6",
    expressionImage: trainImage,
    translation: "train",
    setId: "0",
  },
  {
    id: "7",
    expression:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
    translation: "переклад2",
    translationImage: trainImage,
    setId: "1",
  },
  {
    id: "8",
    expression:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
    translation:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
    translationImage: trainImage,
    setId: "1",
  },
  {
    id: "9",
    expressionImage: trainImage,
    translation: "train",
    setId: "1",
  },
];

const slice = createSlice({
  name: "terms",
  initialState: termsState,
  reducers: {
    termUpdated: (terms, action) => {
      const index = terms.findIndex((bug) => bug.id === action.payload.id);
      terms[index] = action.payload;
    },
    termDeleted: (terms, action) => {
      return terms.filter((x) => x.id != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(termsSetsActions.termsSetDeleted, (terms, action) => {
      return terms.filter((term) => term.setId !== action.payload);
    });
  },
});

export const { termUpdated, termDeleted, termsSetDeleted } = slice.actions;

export default slice.reducer;