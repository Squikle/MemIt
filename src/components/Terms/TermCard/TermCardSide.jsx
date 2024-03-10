import PropTypes from "prop-types";
import styles from "./TermCardSide.module.css";
import classname from "classname";

export function TermCardSide({ text, image, isActive }) {
  return (
    <div
      className={classname(styles.content, { [styles.inactive]: !isActive })}
    >
      {image && <img src={image}></img>}
      <div className={styles.text}>{text}</div>
    </div>
  );
}

TermCardSide.propTypes = {
  text: PropTypes.node,
  image: PropTypes.string,
  isActive: PropTypes.bool,
};
