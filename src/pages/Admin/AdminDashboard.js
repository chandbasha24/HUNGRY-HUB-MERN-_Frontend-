import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div
              className="card p-3"
              style={{
                maxWidth: "800px",
                margin: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
                Admin Details
              </h1>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                Admin Name: {auth?.user?.name}
              </p>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                Admin Email: {auth?.user?.email}
              </p>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                Admin Phone: {auth?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
