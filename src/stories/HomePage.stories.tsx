import { Navbar} from "../components/Navbar/Navbar.tsx";
import { HomePage} from "../pages/HomePage.tsx";

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
