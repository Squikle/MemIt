import { TermsSet } from "../components/Sets/TermsSet/TermsSet";
import { useParams } from "react-router-dom";
import classname from "classname";
import GoBackButton from "../components/Buttons/GoBackButton/GoBackButton";

export function TermsSetPage() {
  const { termsSetId } = useParams();

  return (
    <main className="container">
      <GoBackButton />
      <div className={classname("content", "rollout")}>
        <TermsSet termsSetId={termsSetId}></TermsSet>
      </div>
    </main>
  );
}
