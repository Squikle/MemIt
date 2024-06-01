import { TermsSetCard} from "../components/Sets/TermsSetCard/TermsSetCard.tsx";

export default {
  title: "Components/TermsSetCard",
  component: TermsSetCard,
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
