import classname from "classname";
import styles from "./LongCard.module.css";
import PropTypes from "prop-types";
import AddButton from "../Buttons/AddButton";

function LongCardPlaceholder({ onTermCreating }) {
  return (
    <div className={classname(styles.card, styles.placeholder)}>
      <div className={styles.addButton}>
        <AddButton size="3em" onClick={onTermCreating}></AddButton>
      </div>
    </div>
  );
}

LongCardPlaceholder.propTypes = {
  termId: PropTypes.string,
  onTermCreating: PropTypes.func,
};

export default LongCardPlaceholder;
