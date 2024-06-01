import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import styled from "styled-components";

const StarRating = styled.div`
  display: flex;
  color: #ffcc00;
`;

const ProductsDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [rating, setRating] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  useEffect(() => {
    if (product) {
      setRating(Math.floor(Math.random() * 5) + 1);
    }
  }, [product]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      if (data?.product) {
        setProduct(data.product);
        getSimilarProducts(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      const filteredProducts = data?.products.filter(
        (product) => product._id !== pid
      );
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i}>★</span>);
      } else {
        stars.push(<span key={i}>☆</span>);
      }
    }
    return <StarRating>{stars}</StarRating>;
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mt-2 text-center">
          <h1>Loading...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width="300px"
          />
        </div>

        <div className="col-md-6">
          <h1 className="text-center"> Item Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ₹{product.price}</h6>
          <h6>Category: {product.category.name}</h6>
          <div>
            <h6>
              Rating:
              {renderStars(rating)}
            </h6>
          </div>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => handleAddToCart(product)}
          >
            Order Now
          </button>
        </div>
      </div>
      <div className="row container mt-4">
        <h2 className="text-center">Similar Items</h2>
        <div className="d-flex flex-wrap">
          {relatedProducts.length ? (
            relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="card m-2"
                style={{ width: "18rem" }}
              >
                <img
                  src={`/api/v1/product/product-photo/${relatedProduct._id}`}
                  className="card-img-top"
                  alt={relatedProduct.name}
                  height="200"
                  width="200px"
                />
                <div className="card-body">
                  <h5 className="card-title">{relatedProduct.name}</h5>
                  <p className="card-text">₹{relatedProduct.price}</p>
                  <Link
                    to={`/product/${relatedProduct.slug}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No similar products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsDetails;
