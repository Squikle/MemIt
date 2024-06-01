import { Modal } from "../components/Modal/Modal.tsx";
import { useArgs } from "@storybook/store";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => {
  const [, setArgs] = useArgs();

  const openModal = () => {
    setArgs({ ...args, isOpen: true });
  };

  const closeModal = () => {
    setArgs({ ...args, isOpen: false });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "500px",
        height: "500px",
        position: "relative",
      }}
    >
      <button onClick={openModal} style={{ padding: "25px" }}>
        Open modal
      </button>
      <Modal {...args} onCancel={closeModal} onConfirm={closeModal}></Modal>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: <h1>Some modal text</h1>,
  isOpen: true,
  style: {
    width: "300px",
    maxHeight: "500px",
    height: "300px",
  },
};
