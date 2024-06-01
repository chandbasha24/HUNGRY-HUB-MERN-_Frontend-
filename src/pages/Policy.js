import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div style={policyContainerStyles}>
        <div style={policyImageStyles}>
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={imageStyles}
          />
        </div>
        <div style={policyInfoStyles}>
          <div style={textContainerStyles}>
            <h2>Welcome to HUNGRY HUB</h2>
            <p>
              We are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy
              outlines how we collect, use, and safeguard your information when
              you use our online food delivery services.
            </p>
            <h3>Information We Collect</h3>
            <p>
              Personal Information: When you register on our platform, place an
              order, or interact with our services, we may collect personal
              information such as your name, email address, phone number,
              delivery address, and payment details.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Styles
const policyContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const policyImageStyles = {
  flex: "1 1 50%",
  maxWidth: "500px",
  marginBottom: "1rem",
  "@media (max-width: 768px)": {
    flex: "1 1 100%",
    maxWidth: "100%",
  },
};

const policyInfoStyles = {
  flex: "1 1 50%",
  maxWidth: "500px",
  padding: "20px",
  "@media (max-width: 768px)": {
    flex: "1 1 100%",
    maxWidth: "100%",
  },
};

const imageStyles = {
  width: "100%",
  height: "auto",
};

const textContainerStyles = {
  padding: "1rem",
};

export default Policy;
