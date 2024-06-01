import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">Developed By CHAND❤</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> |{" "}
        <Link to="/policy">Privacy Policy</Link>
      </p>
      <style jsx>{`
        .footer {
          background-color: #f8f9fa;
          color: black;
          padding: 20px 0;
          text-align: center;
        }
        .footer h1 {
          margin-bottom: 10px;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.7); /* Light white font */
        }
        .footer p {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; /* Center-align the text */
        }
        .footer a {
          color: white;
          text-decoration: none;
          margin: 5px 0;
        }
        @media (min-width: 768px) {
          .footer p {
            flex-direction: row;
          }
          .footer a {
            margin: 0 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;
