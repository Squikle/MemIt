import { Navbar } from "../components/Navbar/Navbar.ts";
import { HomePage } from "../pages/HomePage.ts";

export default {
  title: "Components/Pages/Homepage",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () => {
  return (
    <>
      <Navbar></Navbar>
      <HomePage></HomePage>
    </>
  );
};

export const Primary = Template.bind({});
