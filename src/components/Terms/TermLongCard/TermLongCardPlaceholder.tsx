import classNames from "classnames";
import styles from "./TermLongCard.module.css";
import AddButton from "../../Buttons/AddButton.tsx";

type Props = {
    onTermCreating: () => void
}

function TermLongCardPlaceholder({ onTermCreating }: Props) {
  return (
    <div className={classNames(styles.card, styles.placeholder)}>
      <div className={styles.addButton}>
        <AddButton size="3em" onClick={onTermCreating}></AddButton>
      </div>
    </div>
  );
}
export default TermLongCardPlaceholder;
