import { useState } from "react";
import styles from "./TermCard.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { TermCardSide } from "./TermCardSide";
import classname from "classname";

function TermCard({ termId }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const term = useSelector((state) =>
    state.entities.terms.find((x) => x.id === termId)
  );

  const flip = () => {
    setIsRevealed((x) => !x);
  };

  return (
    <div className={styles.card} onClick={flip}>
      <div
        className={classname(styles.cardContent, {
          [styles.revealed]: isRevealed,
        })}
      >
        <div className={styles.front}>
          <TermCardSide text={term.expression} image={term.expressionImage} />
        </div>
        <div className={styles.back}>
          <TermCardSide text={term.translation} image={term.translationImage} />
        </div>
      </div>
    </div>
  );
}

TermCard.propTypes = {
  termId: PropTypes.string,
};

export default TermCard;
