import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <div style={contactusContainerStyles}>
        <div style={contactusImageStyles}>
          <img src="/images/contact.jpeg" alt="contactus" style={imageStyles} />
        </div>
        <div style={contactusInfoStyles}>
          <h1 style={contactusTitleStyles}>CONTACT US</h1>
          <p style={contactusTextStyles}>
            Any query and info about product feel free to call anytime. We are
            available 24X7...
          </p>
          <p style={contactusTextStyles}>
            <BiMailSend /> : chandpanyam54@gmail.com
          </p>
          <p style={contactusTextStyles}>
            <BiPhoneCall /> : 9848918731
          </p>
          <p style={contactusTextStyles}>
            <BiSupport /> : 9014340105
          </p>
        </div>
      </div>
    </Layout>
  );
};

const contactusContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const contactusImageStyles = {
  flex: "1 1 50%",
  maxWidth: "500px",
};

const imageStyles = {
  width: "100%",
  height: "auto",
};

const contactusInfoStyles = {
  flex: "1 1 50%",
  maxWidth: "500px",
  padding: "20px",
};

const contactusTitleStyles = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
};

const contactusTextStyles = {
  marginTop: "10px",
};

export default Contact;
