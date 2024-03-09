import LongCard from "../components/LongCard/LongCard";

export default {
  title: "Components/LongCard",
  component: LongCard,
  parameters: {
    layout: "centered",
  },
};

const Template = ({ termId }) => {
  return <LongCard termId={termId}></LongCard>;
};

export const Text = Template.bind({});
Text.args = {
  termId: "0",
};

export const Image = Template.bind({});
Image.args = {
  termId: "6",
};

export const ImageWithText = Template.bind({});
ImageWithText.args = {
  termId: "2",
};

export const ImageWithLongText = Template.bind({});
ImageWithLongText.args = {
  termId: "5",
};

export const LongText = Template.bind({});
LongText.args = {
  termId: "4",
};
