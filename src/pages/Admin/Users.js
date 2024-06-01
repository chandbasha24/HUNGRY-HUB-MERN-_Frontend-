import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Function to fetch user data
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users"); // Replace with your actual API endpoint
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">ALL Users</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
