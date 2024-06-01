import { TermsSet } from "../components/Sets/TermsSet/TermsSet.tsx";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import GoBackButton from "../components/Buttons/GoBackButton/GoBackButton.tsx";

export function TermsSetPage() {
  const { termsSetId } = useParams();

  return (
    <main className="container">
      <GoBackButton hideOnNarrow={false} />
      <div className={classNames("content", "rollout")}>
        <TermsSet termsSetId={termsSetId!}></TermsSet>
      </div>
    </main>
  );
}
