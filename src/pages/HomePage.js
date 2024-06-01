import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import styled from "styled-components"; // Import styled-components library

// Styled components for CSS
const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 200px; /* Adjust the height based on your preference */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const ProductsContainer = styled.div`
  flex: 0 0 100%;
  padding: 1rem;

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

const Card = styled.div`
  margin: 1rem;
  width: calc(25% - 2rem);
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease; // Added transition for transform and box-shadow
  position: relative;

  &:hover {
    transform: scale(1.05); // Zoom-in effect
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Slight shadow to enhance effect
  }

  @media (max-width: 992px) {
    width: calc(50% - 2rem);
  }

  @media (max-width: 768px) {
    width: calc(100% - 2rem);
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const CardNamePrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewSection = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const StarRating = styled.div`
  display: flex;
  color: #ffcc00;
`;

const LoadMoreButton = styled.button`
  margin: 1rem 0;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      // Add random rating to each product
      const productsWithRating = data.products.map((product) => ({
        ...product,
        rating: Math.floor(Math.random() * 5) + 1,
      }));
      setProducts(productsWithRating);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      // Add random rating to each product
      const newProductsWithRating = data.products.map((product) => ({
        ...product,
        rating: Math.floor(Math.random() * 5) + 1,
      }));
      setProducts([...products, ...newProductsWithRating]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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

  return (
    <Layout title={"All Products - Best offers"}>
      {/* banner image */}
      <BannerImage
        src="/images/home1.png"
        className="banner-img"
        alt="bannerimage"
      />
      {/* banner image */}
      <Container className="container-fluid">
        <ProductsContainer className="products-container">
          <h1 className="text-center">
            "Starve less, munch more, Just Order Now...! 😋"
          </h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Card className="card" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <CardBody className="card-body">
                  <ReviewSection>{renderStars(p.rating)}</ReviewSection>
                  {/* <CardName /> */}
                  <CardNamePrice>
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">₹{p.price}</h5>
                  </CardNamePrice>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <CardNamePrice>
                    <button
                      className="btn btn-info ms-1"
                      style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      Order Now
                    </button>
                  </CardNamePrice>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <LoadMoreButton
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    Load more <AiOutlineReload />
                  </>
                )}
              </LoadMoreButton>
            )}
          </div>
        </ProductsContainer>
      </Container>
    </Layout>
  );
};

export default HomePage;
