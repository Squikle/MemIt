import "./pageStyles.css";
import { TermsSetsList } from "../components/TermsSetsList/TermsSetsList";
import classname from "classname";

export function TermsSetsListPage() {
  return (
    <main className="container">
      <div className={classname("content", "rollout")}>
        <div>
          <TermsSetsList></TermsSetsList>
        </div>
      </div>
    </main>
  );
}
