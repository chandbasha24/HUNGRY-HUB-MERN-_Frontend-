import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us"}>
      <div style={aboutContainerStyles}>
        <div style={aboutImageStyles}>
          <img src="/images/about.jpeg" alt="about us" style={imageStyles} />
        </div>
        <div style={aboutInfoStyles}>
          <div style={textContainerStyles}>
            <p>
              HUNGRY HUB is an innovative online food delivery platform designed
              to transform the way people enjoy their favorite meals from the
              comfort of their homes. Similar to popular services like Zomato
              and Swiggy, HUNGRY HUB connects users with a wide array of local
              restaurants and eateries, offering a diverse selection of cuisines
              to satisfy every palate. With a user-friendly interface and
              seamless ordering process, customers can easily browse menus,
              place orders, and track deliveries in real-time. HUNGRY HUB not
              only prioritizes convenience and speed but also ensures
              high-quality service by partnering with reliable and trusted food
              establishments, making it the go-to app for food enthusiasts
              seeking delicious and timely meal deliveries.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Styles
const aboutContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const aboutImageStyles = {
  flex: "1 1 50%",
  maxWidth: "500px",
  marginBottom: "1rem",
  "@media (max-width: 768px)": {
    flex: "1 1 100%",
    maxWidth: "100%",
  },
};

const aboutInfoStyles = {
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

export default About;
