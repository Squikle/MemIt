import PropTypes from "prop-types";
import styles from "./CardSide.module.css";

export function CardSide({ text, image }) {
  return (
    <div className={styles.content}>
      {image && <img src={image}></img>}
      <div className={styles.text}>{text}</div>
    </div>
  );
}

CardSide.propTypes = {
  text: PropTypes.node,
  image: PropTypes.string,
};
