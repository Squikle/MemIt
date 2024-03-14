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

const cardStates = {
  active: "active",
  deferring: "deferring",
  discarding: "discarding",
};

export function TermsStack({ termsSetId, onStackFinished }) {
  const terms = useSelector((state) => selectTermsFromSet(state, termsSetId));
  const [stack, setStack] = useState(
    [...terms].reverse().map((x) => {
      return { ...x, state: cardStates.active };
    })
  );
  const [defferedCards, setDefferedCards] = useState([]);

  const isDroppingShadow = (index) => {
    const lastOnBackground = 3;
    if (index + 1 < lastOnBackground) {
      return true;
    }

    return false;
  };

  const removeTopCard = () => {
    setTopCardDiscarding(cardStates.discarding);

    setTimeout(() => {
      setStack((stack) => {
        if (stack.length === 0) return stack;
        return stack.slice(0, -1);
      });
    }, 200);
  };

  const defferTopCard = () => {
    setTopCardDiscarding(cardStates.deferring);

    setTimeout(() => {
      setStack((stack) => {
        if (stack.length === 0) return stack;

        const topCard = {
          ...stack[stack.length - 1],
          state: cardStates.active,
        };
        setDefferedCards((cards) => [...cards, topCard]);
        return [...stack.slice(0, -1)];
      });
    }, 200);
  };

  useEffect(() => {
    if (stack.length <= 1 && defferedCards.length > 0) {
      setStack((stack) => [defferedCards[0], ...stack]);
      setDefferedCards((cards) => [...cards.slice(1)]);
    }
  }, [stack, defferedCards]);

  useEffect(() => {
    if (stack.length === 0 && defferedCards.length === 0) {
      onStackFinished();
    }
  }, [stack, defferedCards, onStackFinished]);

  const setTopCardDiscarding = (state) => {
    setStack((stack) => {
      if (stack.length === 0) return stack;

      const topCardIndex = getFirstNotDiscardingCardIndex();
      if (topCardIndex === -1) {
        return stack;
      }

      const cardToUpdate = stack[topCardIndex];
      let updatedCard = {
        ...cardToUpdate,
        state,
      };
      return [
        ...stack.slice(0, topCardIndex),
        updatedCard,
        ...stack.slice(topCardIndex + 1),
      ];
    });
  };

  const isTopCard = (index) => {
    return index === getFirstNotDiscardingCardIndex();
  };

  const getFirstNotDiscardingCardIndex = () => {
    return stack.findLastIndex((x) => x.state === cardStates.active);
  };

  return (
    <>
      <div className={styles.stack}>
        {stack.map((x, ind) => {
          return (
            <div
              key={x.id}
              className={classname(styles.stackCard, styles[x.state], {
                [styles.dropShadow]: isTopCard(ind) || isDroppingShadow(ind),
                [styles.topCard]: isTopCard(ind),
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
          onClick={defferTopCard}
        ></RejectButton>
        <ConfirmButton
          iconClassName={classname(styles.confirmButton)}
          onClick={removeTopCard}
        ></ConfirmButton>
      </div>
    </>
  );
}

TermsStack.propTypes = {
  termsSetId: PropTypes.string,
  onStackFinished: PropTypes.func,
};

export default TermsStack;
