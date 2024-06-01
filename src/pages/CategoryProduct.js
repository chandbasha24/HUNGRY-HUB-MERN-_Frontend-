import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import toast from "react-hot-toast"; // Added toast import
import { useCart } from "../context/cart"; // Added useCart import

// Styled components for CSS
const Container = styled.div`
  margin-top: 3rem;
`;

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  margin: 1rem;
  width: calc(33.333% - 2rem);
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  transition: height 0.3s ease;

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
  padding: 0.5rem;
`;

const CardNamePrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart(); // Destructuring useCart

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container className="container mt-3">
        <h1 className="text-center">{category?.name}</h1>
        <h5 className="text-center">{products?.length} Results found...</h5>
        <ProductsContainer>
          {products?.map((p) => (
            <Card key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <CardBody className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}</p>
                <p className="card-text">₹{p.price}</p>
                <CardNamePrice>
                  <Button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More details
                  </Button>
                  <Button
                    className="btn btn-secondary ms-1"
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
                  </Button>
                </CardNamePrice>
              </CardBody>
            </Card>
          ))}
        </ProductsContainer>
      </Container>
    </Layout>
  );
};

export default CategoryProduct;
