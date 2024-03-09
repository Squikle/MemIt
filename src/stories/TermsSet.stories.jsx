import { TermsSet } from "../components/TermsSet/TermsSet";

export default {
  title: "Components/TermsSet",
  component: TermsSet,
  parameters: {
    layout: "centered",
  },
};

export const Primary = {
  args: { termsSetId: "0" },
};
export const Second = {
  args: {
    termsSetId: "1",
  },
};
