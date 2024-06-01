import "./pageStyles.css";
import { TermsSetsList } from "../components/Sets/TermsSetsList/TermsSetsList.tsx";
import classNames from "classnames";

export function TermsSetsListPage() {
  return (
    <main className="container">
      <div className={classNames("content", "rollout")}>
        <div>
          <TermsSetsList></TermsSetsList>
        </div>
      </div>
    </main>
  );
}
