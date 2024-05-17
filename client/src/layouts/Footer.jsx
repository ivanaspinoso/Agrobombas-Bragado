import React from "react";
import logoip from "../assets/images/logo150.png"

const Footer = () => {
  return (
    <div className="bg-dark p-3 text-light">
      <span className="d-block text-center">
      <p><a href="https://sib-2000.com.ar" target="_blank">Powered by <img src={logoip} width={150} height={50} alt="Logo Exito IP"></img></a></p>
      </span>
    </div>
  );
};

export default Footer;