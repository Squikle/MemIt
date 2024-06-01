import PropTypes from "prop-types";
import styles from "./TermCardSide.module.css";
import classNames from "classnames";

type CardSideProps = {
  text: string,
  image: string,
  isActive: boolean
}

export function TermCardSide({ text, image, isActive }: CardSideProps) {
  return (
    <div
      className={classNames(styles.content, { [styles.inactive]: !isActive })}
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
