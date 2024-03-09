import "./pageStyles.css";
import { TermsSetsList } from "../components/TermsSetsList/TermsSetsList";

export function TermsSetsListPage() {
  return (
    <main className="container">
      <div className="content">
        <div>
          <TermsSetsList></TermsSetsList>
        </div>
      </div>
    </main>
  );
}
