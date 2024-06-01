import { useState } from "react";
import styles from "./TermCard.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { TermCardSide } from "./TermCardSide.tsx";
import classNames from "classnames";
import {RootState, Term} from "@/store/types.ts";

type CardProps = {
  termId: string,
  isActive: boolean,
  width: string,
  height: string
}

function TermCard({ termId, isActive, width, height }: CardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const term = useSelector<RootState>((state) =>
    state.entities.terms.find((x) => x.id === termId)
  );

  const flip = () => {
    if (!isActive) return;
    setIsRevealed((x) => !x);
  };

  const cardStyle = {
    width: width || "300px",
    height: height || "300px",
  };

  return (
    <div className={styles.card} style={cardStyle} onClick={flip}>
      <div
        className={classNames(styles.cardContent, {
          [styles.revealed]: isRevealed,
          [styles.inactive]: !isActive,
        })}
      >
        <div className={styles.front}>
          <TermCardSide
            text={term.expression}
            image={term.expressionImage}
            isActive={isActive}
          />
        </div>
        <div className={styles.back}>
          <TermCardSide
            text={term.translation}
            image={term.translationImage}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
}

TermCard.propTypes = {
  termId: PropTypes.string,
  isActive: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default TermCard;
