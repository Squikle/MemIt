import styles from "./Pages.module.css";
import { TermsSet } from "../components/Sets/TermsSet/TermsSet";
import { useNavigate, useParams } from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton";
import classname from "classname";

export function TermsSetPage() {
  const { termsSetId } = useParams();
  const navigate = useNavigate();

  return (
    <main className="container">
      <div className={classname(styles.backButton, styles.rollout)}>
        <GoBackButton size="4em" onClick={() => navigate(-1)}></GoBackButton>
      </div>
      <div className={classname("content", "rollout")}>
        <TermsSet termsSetId={termsSetId}></TermsSet>
      </div>
    </main>
  );
}
