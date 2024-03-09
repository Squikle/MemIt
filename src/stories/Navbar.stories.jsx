import { Navbar } from "../components/Navbar/Navbar";

export default {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () => {
  return <Navbar></Navbar>;
};

export const Primary = Template.bind({});
