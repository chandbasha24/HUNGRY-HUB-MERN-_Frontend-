import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const Createcategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCategory) {
        // Update existing category
        const { data } = await axios.put(
          `/api/v1/category/update-category/${currentCategory._id}`,
          {
            name,
          }
        );
        if (data.success) {
          toast.success(`${name} is updated`);
          getAllCategory();
          setName("");
          setVisible(false);
          setCurrentCategory(null); // Reset current category
        } else {
          toast.error(data.message);
        }
      } else {
        // Create new category
        const { data } = await axios.post("/api/v1/category/create-category", {
          name,
        });
        if (data.success) {
          toast.success(`${name} is created`);
          getAllCategory();
          setName("");
          setVisible(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in form submission");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle edit button click
  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setName(category.name);
    setVisible(true);
  };

  // Handle delete button click
  const handleDeleteClick = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${categoryId}`
      );
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting category");
    }
  };

  return (
    <Layout title={"Dashboard - Create products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1> Manage Category </h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-1"
                          onClick={() => handleEditClick(c)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-1"
                          onClick={() => handleDeleteClick(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              title="Edit Category"
              visible={visible}
              onCancel={() => {
                setVisible(false);
                setCurrentCategory(null); // Reset current category when modal is closed
              }}
              footer={null}
            >
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createcategory;
