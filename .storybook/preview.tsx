import trainImage from "../src/stories/assets/train.jpg";
import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "../index.css";
import { MemoryRouter } from "react-router-dom";
import { AuthContextProvider} from "../src/contexts/AuthContext/AuthContext";
import { useAuthContext } from "../src/contexts/AuthContext/useAuthContext.ts";
import React from "react";

const termsState = [
  {
    id: "0",
    expression: "term1",
    translation: "перевод1",
    setId: "0",
  },
  {
    id: "1",
    expression: "term2",
    expressionImage: trainImage,
    translation: "перевод2",
    setId: "0",
  },
  {
    id: "2",
    expression: "term2",
    expressionImage: trainImage,
    translation: "перевод2",
    translationImage: trainImage,
    setId: "0",
  },
  {
    id: "3",
    expression: "term2",
    translation: "перевод2",
    translationImage: trainImage,
    setId: "0",
  },
  {
    id: "4",
    expression:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
    translation: "перевод2",
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
    translation: "перевод2",
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

const termsSetsState = [
  {
    id: "0",
    name: "first",
  },
  {
    id: "1",
    name: "second",
  },
];

const termsReducer = createSlice({
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
}).reducer;
const termsSetsReducer = createSlice({
  name: "termsSets",
  initialState: termsSetsState,
  reducers: {},
}).reducer;

const entitiesReducer = combineReducers({
  terms: termsReducer,
  termsSets: termsSetsReducer,
});
const rootReducer = combineReducers({ entities: entitiesReducer });
const store = configureStore({ reducer: rootReducer });

const decorators = [
  (Story: React.FC) => {
    return <MemoryRouter initialEntries={["/"]}><Story/></MemoryRouter>;
  },

  (Story: React.FC) => {
    const authContext = useAuthContext();
    authContext.login("123");
    return <Story />;
  },

  (Story: React.FC) => {
    return (
      <AuthContextProvider>
        <Story />
      </AuthContextProvider>
    );
  },

  (Story: React.FC) => {
    return <Provider store={store}><Story/></Provider>;
  },
];

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: decorators,
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "hsl(230, 35%, 20%)",
        },
      ],
    },
  },
};

export default preview;
