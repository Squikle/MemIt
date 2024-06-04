import styles from "./TermCardSide.module.scss";
import classNames from "classnames";

type CardSideProps = {
  text?: string,
  image?: string,
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
