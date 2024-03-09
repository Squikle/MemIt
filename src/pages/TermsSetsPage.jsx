import styles from "./TermsSetsPage.module.css";
import { TermsSet } from "../components/TermsSet/TermsSet";
import { useNavigate, useParams } from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton";
import classname from "classname";

export function TermsSetsPage() {
  const { termsSetId } = useParams();
  const navigate = useNavigate();

  return (
    <main className="container">
      <div className={classname(styles.backButton, styles.rollout)}>
        <GoBackButton size="4em" onClick={() => navigate(-1)}></GoBackButton>
      </div>
      <div className="content">
        <TermsSet termsSetId={termsSetId}></TermsSet>
      </div>
    </main>
  );
}
