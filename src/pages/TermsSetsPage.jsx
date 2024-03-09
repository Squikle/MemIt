import "./pageStyles.css";
import { TermsSet } from "../components/TermsSet/TermsSet";
import { useParams } from "react-router-dom";

export function TermsSetsPage() {
  const { termsSetId } = useParams();

  return (
    <main className="container">
      <div className="content">
        <TermsSet termsSetId={termsSetId}></TermsSet>
      </div>
    </main>
  );
}
