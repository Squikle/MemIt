import { useState } from "react";
import styles from "./Card.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CardSide } from "./CardSide";
import classname from "classname";

function Card({ termId }) {
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
          <CardSide text={term.expression} image={term.expressionImage} />
        </div>
        <div className={styles.back}>
          <CardSide text={term.translation} image={term.translationImage} />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  termId: PropTypes.string,
};

export default Card;
