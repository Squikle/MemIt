import styles from "./TermsStack.module.css";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import TermCard from "../TermCard/TermCard";
import { useState } from "react";
import classname from "classname";

const selectTermsFromSet = createSelector(
  (state) => state.entities.terms,
  (_, termsSetId) => termsSetId,
  (terms, termsSetId) => terms.filter((x) => x.setId === termsSetId)
);

export function TermsStack({ termsSetId }) {
  const terms = useSelector((state) => selectTermsFromSet(state, termsSetId));
  const [stack, setStack] = useState([...terms].reverse());

  const isDroppingShadow = (index) => {
    const isTopCard = index == stack.length - 1;
    if (isTopCard) return true;

    const lastOnBackground = 3;
    if (index + 1 < lastOnBackground) {
      return true;
    }

    return false;
  };

  const reversedOrderStack = stack;
  return (
    <div className={styles.stack}>
      {reversedOrderStack.map((x, ind) => {
        return (
          <div
            key={x.id}
            className={classname(styles.stackCard, {
              [styles.dropShadow]: isDroppingShadow(ind),
            })}
          >
            <TermCard
              termId={x.id}
              isActive={ind === stack.length - 1}
              width="500px"
              height="500px"
            ></TermCard>
          </div>
        );
      })}
    </div>
  );
}

TermsStack.propTypes = {
  termsSetId: PropTypes.string,
};

export default TermsStack;
