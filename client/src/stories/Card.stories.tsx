import TermCard from "../components/Terms/TermCard/TermCard.tsx";

export default {
  title: "Components/Card",
  component: TermCard,
  parameters: {
    layout: "centered",
  },
};

export const Text = {
  args: {
    termId: "0",
  },
};

export const Image = {
  args: {
    termId: "6",
  },
};

export const ImageWithText = {
  args: {
    termId: "2",
  },
};

export const ImageWithLongText = {
  args: {
    termId: "5",
  },
};

export const LongText = {
  args: {
    termId: "4",
  },
};
