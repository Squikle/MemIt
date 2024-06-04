import styles from "./TermsStack.module.scss";
import TermCard from "../TermCard/TermCard.tsx";
import { useEffect, useState } from "react";
import classNames from "classnames";
import ConfirmButton from "../../Buttons/ConfirmButton.tsx";
import RejectButton from "../../Buttons/RejectButton.tsx";
import Term from "@/@types/Term.ts";

type CardState = "active" | "deferring" | "discarding";

type TermsStackProps = {
  terms: Term[],
  onStackFinished: () => void
}

type StackCard = Term & {
  state?: CardState
}

export function TermsStack({ terms, onStackFinished }: TermsStackProps) {
  const [stack, setStack] = useState<StackCard[]>(
    [...terms].reverse().map((x) => {
      return { ...x, state: "active" };
    })
  );
  const [defferedCards, setDefferedCards] = useState<Term[]>([]);

  const isDroppingShadow = (index: number) => {
    const lastOnBackground = 3;
    return index + 1 < lastOnBackground;
  };

  const removeTopCard = () => {
    setTopCardDiscarding("deferring");

    setTimeout(() => {
      setStack((stack) => {
        if (stack.length === 0) return stack;
        return stack.slice(0, -1);
      });
    }, 200);
  };

  const defferTopCard = () => {
    setTopCardDiscarding("deferring");

    setTimeout(() => {
      setStack((stack) => {
        if (stack.length === 0) return stack;

        const topCard : StackCard = {
          ...stack[stack.length - 1],
          state: "active",
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

  const setTopCardDiscarding = (state: CardState) => {
    setStack((stack) => {
      if (stack.length === 0) return stack;

      const topCardIndex = getFirstNotDiscardingCardIndex();
      if (topCardIndex === -1) {
        return stack;
      }

      const cardToUpdate = stack[topCardIndex];
      const updatedCard = {
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

  const isTopCard = (index: number) => {
    return index === getFirstNotDiscardingCardIndex();
  };

  const getFirstNotDiscardingCardIndex = () => {
    return stack.findLastIndex((x) => x.state === "active");
  };

  return (
    <>
      <div className={styles.stack}>
        {stack.map((x, ind) => {
          return (
            <div
              key={x.id}
              className={classNames(styles.stackCard, styles[x.state || "active"], {
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
          iconClassName={classNames(styles.rejectButton)}
          onClick={defferTopCard}
        ></RejectButton>
        <ConfirmButton
          iconClassName={classNames(styles.confirmButton)}
          onClick={removeTopCard}
        ></ConfirmButton>
      </div>
    </>
  );
}

export default TermsStack;
