import { useState } from "react";
import styles from "./TermCard.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { TermCardSide } from "./TermCardSide";
import classname from "classname";

function TermCard({ termId, isActive, width, height }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const term = useSelector((state) =>
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
        className={classname(styles.cardContent, {
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
