import styles from "./TermsStack.module.css";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import TermCard from "../TermCard/TermCard";
import { useEffect, useState } from "react";
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
  const [defferedCards, setDefferedCards] = useState([]);

  const isDroppingShadow = (index) => {
    const lastOnBackground = 3;
    if (index + 1 < lastOnBackground) {
      return true;
    }

    return false;
  };

  const removeTopCard = () => {
    setTopCardRemoving();

    setTimeout(() => {
      setStack((stack) => {
        if (stack.length === 0) return stack;
        return stack.slice(0, -1);
      });
    }, 300);
  };

  const defferTopCard = () => {
    setTopCardRemoving();

    setTimeout(() => {
      setStack((stack) => {
        if (stack.length === 0) return stack;

        const topCard = { ...stack[stack.length - 1], removing: false };
        setDefferedCards((cards) => [...cards, topCard]);
        return [...stack.slice(0, -1)];
      });
    }, 300);
  };

  useEffect(() => {
    if (stack.length <= 1 && defferedCards.length > 0) {
      setStack((stack) => [defferedCards[0], ...stack]);
      setDefferedCards((cards) => [...cards.slice(1)]);
    }
  }, [stack, defferedCards]);

  const setTopCardRemoving = () => {
    setStack((stack) => {
      if (stack.length === 0) return stack;

      const topCardIndex = getFirstNotRemovingCardIndex();
      if (topCardIndex === -1) {
        return stack;
      }

      const cardToUpdate = stack[topCardIndex];
      const updatedCard = {
        ...cardToUpdate,
        removing: true,
      };
      return [
        ...stack.slice(0, topCardIndex),
        updatedCard,
        ...stack.slice(topCardIndex + 1),
      ];
    });
  };

  const isTopCard = (index) => {
    return index === getFirstNotRemovingCardIndex();
  };

  const getFirstNotRemovingCardIndex = () => {
    return stack.findLastIndex((x) => x.removing !== true);
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
          onClick={defferTopCard}
        ></RejectButton>
        <ConfirmButton
          iconClassName={classname(styles.confirmButton)}
          size={"3em"}
          onClick={removeTopCard}
        ></ConfirmButton>
      </div>
    </>
  );
}

TermsStack.propTypes = {
  termsSetId: PropTypes.string,
};

export default TermsStack;
