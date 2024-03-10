import styles from "./TermsStack.module.css";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import TermCard from "../TermCard/TermCard";
import { useState } from "react";
import classname from "classname";
import ConfirmButton from "../../Buttons/ConfirmButton";
import RejectButton from "../../Buttons/RejectButton";

const selectTermsFromSet = createSelector(
  (state) => state.entities.terms,
  (_, termsSetId) => termsSetId,
  (terms, termsSetId) => terms.filter((x) => x.setId === termsSetId)
);

export function TermsStack({ termsSetId }) {
  const terms = useSelector((state) => selectTermsFromSet(state, termsSetId));
  const [stack, setStack] = useState([...terms].reverse());

  const isDroppingShadow = (index) => {
    const lastOnBackground = 3;
    if (index + 1 < lastOnBackground) {
      return true;
    }

    return false;
  };

  const removeTopElement = () => {
    setStack((stack) => {
      if (stack.length === 0) return stack;

      const firstNotRemovingIndex = stack.findLastIndex(
        (x) => x.removing !== true
      );

      if (
        firstNotRemovingIndex === -1 ||
        stack[firstNotRemovingIndex].removing
      ) {
        return stack;
      }

      const updatedCard = {
        ...stack[firstNotRemovingIndex],
        removing: true,
      };

      return [
        ...stack.slice(0, firstNotRemovingIndex),
        updatedCard,
        ...stack.slice(firstNotRemovingIndex + 1),
      ];
    });

    setTimeout(() => {
      setStack((stack) => {
        if (stack.length === 0) return stack;
        return stack.slice(0, -1);
      });
    }, 300);
  };

  const isTopCard = (index) => {
    const firstNotRemovingIndex = stack.findLastIndex(
      (x) => x.removing !== true
    );

    return index === firstNotRemovingIndex;
  };

  return (
    <>
      <div className={styles.stack}>
        {stack.map((x, ind) => {
          return (
            <div
              key={x.id}
              className={classname(styles.stackCard, {
                [styles.dropShadow]: isTopCard(ind) || isDroppingShadow(ind),
                [styles.topCard]: isTopCard(ind),
                [styles.fading]: x.removing,
              })}
            >
              <TermCard
                termId={x.id}
                isActive={isTopCard(ind)}
                width="500px"
                height="500px"
              ></TermCard>
            </div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <RejectButton
          iconClassName={classname(styles.rejectButton)}
          size={"3em"}
          onClick={removeTopElement}
        ></RejectButton>
        <ConfirmButton
          iconClassName={classname(styles.confirmButton)}
          size={"3em"}
          onClick={removeTopElement}
        ></ConfirmButton>
      </div>
    </>
  );
}

TermsStack.propTypes = {
  termsSetId: PropTypes.string,
};

export default TermsStack;
