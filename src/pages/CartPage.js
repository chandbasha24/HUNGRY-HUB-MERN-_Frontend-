import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
`;

const Card = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CardImage = styled.img`
  border-radius: 8px 0 0 8px;
  object-fit: cover;
  width: 100px;
  height: 100px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  border: none;
  color: white;
  width: 100px;
  margin-top: 10px;
  &:hover {
    background-color: #c82333;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
  background-color: #green;
  border: none;
  color: white;
  &:hover {
    background-color: #green;
  }
`;

const OutlineWarningButton = styled.button`
  border: 1px solid #ffc107;
  color: #ffc107;
  &:hover {
    background-color: #ffc107;
    color: white;
  }
`;

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState();
  const [dropInReady, setDropInReady] = useState(false);
  const [showPayment, setShowPayment] = useState(false); // New state variable
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        return (total = total + item.price);
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container className="container">
        <div className="row">
          <div className="col-12">
            <h1
              className="text-center p-2 mb-2"
              style={{ backgroundColor: "black", color: "white" }}
            >
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center ">
              {cart?.length
                ? ` You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout."
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-7 col-sm-12">
            {cart?.map((p) => (
              <Card className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-4">
                  <CardImage
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>
                <CardBody className="col-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>₹{p.price}</p>
                  <RemoveButton
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </RemoveButton>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="col-lg-4 col-md-5 col-sm-12 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: ₹{totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <OutlineWarningButton
                  className="btn btn-outline-warning"
                  onClick={() =>
                    navigate("/dashboard/user/profile", {
                      state: { from: "/cart" },
                    })
                  }
                >
                  Update Address
                </OutlineWarningButton>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <OutlineWarningButton
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/dashboard/user/profile", {
                        state: { from: "/cart" },
                      })
                    }
                  >
                    Update Address
                  </OutlineWarningButton>
                ) : (
                  <OutlineWarningButton
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </OutlineWarningButton>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  {!showPayment && (  ///here not showpayment before clciking the button
                    <PrimaryButton
                      className="btn btn-success mt-1"
                      onClick={() => setShowPayment(true)}
                    >
                     {`Order ${cart.length} ${cart.length === 1 ? "item" : "items"}`}
                    </PrimaryButton>
                  )}
                  {showPayment && (
                    <>
                      <h6>Give the dummy credentials....</h6>
                      <DropIn
                        options={{
                          authorization: clientToken,
                        }}
                        onInstance={(instance) => {
                          setInstance(instance);
                          setDropInReady(true);
                        }}
                      />
                      {dropInReady && (
                        <PrimaryButton
                          className="btn btn-primary mt-2"
                          onClick={handlePayment}
                          disabled={loading || !instance || !auth?.user?.address}
                        >
                          {loading ? "Processing..." : "Make Payment"}
                        </PrimaryButton>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CartPage;
