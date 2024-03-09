import PropTypes from "prop-types";
import styles from "./TermsSet.module.css";
import LongCard from "../LongCard/LongCard";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const selectTerms = createSelector(
  (state) => state.entities.terms,
  (_, termsSetId) => termsSetId,
  (terms, termsSetId) => terms.filter((x) => x.setId === termsSetId)
);

export function TermsSet({ termsSetId }) {
  const terms = useSelector((state) => selectTerms(state, termsSetId));

  return (
    <div className={styles.wordsContainer}>
      {terms.map((x) => {
        return <LongCard key={x.id} termId={x.id}></LongCard>;
      })}
    </div>
  );
}

TermsSet.propTypes = {
  termsSetId: PropTypes.string,
};
