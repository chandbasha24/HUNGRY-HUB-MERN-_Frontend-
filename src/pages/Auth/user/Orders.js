import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import UserMenu from "../../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      // Sort orders by creation date in descending order
      const sortedOrders = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.map((o, i) => (
              <div key={i} className="border shadow mb-3">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o.status}</td>
                        <td>{o.buyer.name}</td>
                        <td>{moment(o.createdAt).fromNow()}</td>
                        <td>{o.payment.success ? "Success" : "Failed"}</td>
                        <td>{o.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="container">
                  {o?.products?.map((p, index) => (
                    <div key={index} className="row mb-2 p-3 card flex-row">
                      <div className="col-4 col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100%"
                          style={{ maxWidth: "100px", height: "auto" }}
                        />
                      </div>
                      <div className="col-8 col-md-8">
                        <h4>{p.name}</h4>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>₹{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
