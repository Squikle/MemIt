import PropTypes from "prop-types";
import styles from "./TermCardSide.module.css";

export function TermCardSide({ text, image }) {
  return (
    <div className={styles.content}>
      {image && <img src={image}></img>}
      <div className={styles.text}>{text}</div>
    </div>
  );
}

TermCardSide.propTypes = {
  text: PropTypes.node,
  image: PropTypes.string,
};
