import PropTypes from "prop-types";
import styles from "./TermsSet.module.css";
import TermLongCard from "../../Terms/TermLongCard/TermLongCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import TermLongCardPlaceholder from "../../Terms/TermLongCard/TermLongCardPlaceholder.tsx";
import { emptyTermAdded } from "../../../store/terms.ts";
import { useEffect, useRef, useState } from "react";
import {Term} from "@/store/types.ts";

const selectTerms = createSelector(
  (state) => state.entities.terms,
  (_, termsSetId) => termsSetId,
  (terms: Term[], termsSetId) => terms.filter((x) => x.setId === termsSetId)
);

type Props = {
  termsSetId: string
}

export function TermsSet({ termsSetId }: Props) {
  const terms = useSelector((state) => selectTerms(state, termsSetId));
  const [shouldScroll, setShouldScroll] = useState(false);
  const dispatch = useDispatch();
  const placeHolderRef = useRef<HTMLDivElement>(null);

  const handleAddClick = () => {
    const event = emptyTermAdded({ setId: termsSetId });
    dispatch(event);
    setShouldScroll(true);
  };

  const scrollToBottom = () => {
    placeHolderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  return (
    <div className={styles.wordsContainer}>
      {terms.map((x) => {
        return <TermLongCard key={x.id} termId={x.id}></TermLongCard>;
      })}
      <div ref={placeHolderRef}>
        <TermLongCardPlaceholder
          onTermCreating={handleAddClick}
        ></TermLongCardPlaceholder>
      </div>
    </div>
  );
}

TermsSet.propTypes = {
  termsSetId: PropTypes.string,
};
