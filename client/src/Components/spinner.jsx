import React from "react";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = ({ visible }) => {
  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
      width={500}
      className="flex flex-col items-center justify-center p-6"
    >
      <div className="flex flex-col items-center justify-center">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 48, color: "#9063CD" }} spin />}
        />
        <p className="mt-4 text-[#32475C] text-[16px] font-semibold">
          Cargando información...
        </p>
      </div>
    </Modal>
  );
}

export default Spinner;
