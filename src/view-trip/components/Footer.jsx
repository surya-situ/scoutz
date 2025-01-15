import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-gray-600 py-10 border-t-2 font-poppins mt-10">
      <div className="container">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <strong>Scoutz</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
