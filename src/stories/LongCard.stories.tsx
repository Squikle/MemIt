import TermLongCard from "../components/Terms/TermLongCard/TermLongCard.tsx";
import {StoryFn} from "@storybook/react";

export default {
  title: "Components/LongCard",
  component: TermLongCard,
  parameters: {
    layout: "centered",
  },
};

const Template: StoryFn<{termId: string}> = (args) => {
  return <TermLongCard {...args}></TermLongCard>;
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
