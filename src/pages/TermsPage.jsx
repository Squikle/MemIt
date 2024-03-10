import "./pageStyles.css";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton/GoBackButton";
import TermsStack from "../components/Terms/TermsStack/TermsStack";
import classname from "classname";
import style from "./Pages.module.css";

export function TermsPage() {
  const { termsSetId } = useParams();

  return (
    <main className={classname("container", style.centered)}>
      <GoBackButton hideOnNarrow={false} />
      <div className="rolloutReversed">
        <TermsStack termsSetId={termsSetId}></TermsStack>
      </div>
    </main>
  );
}
