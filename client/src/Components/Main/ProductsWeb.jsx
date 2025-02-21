import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsWeb } from "../../app/actions/products";
import { Card, Row, Col, Tag ,Typography} from "antd";
import { ShoppingCartOutlined, FireOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Text } = Typography;

 const ProductsWeb = () => {
    const dispatch = useDispatch();
    const webproducts = useSelector((state) => 
        state.productsReducer.productsweb?.filter(product => product.show)
      );
  useEffect(() => {
    dispatch(getAllProductsWeb());
  }, [dispatch]);

  const getPlaceholderImage = (product) => {
    if (product.isofert) {
      return "data:image/svg+xml,%3Csvg width='250' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' font-family='Inter' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3E%F0%9F%94%A5 PROMO %F0%9F%94%A5%3C/text%3E%3C/svg%3E";
    }
    return "data:image/svg+xml,%3Csvg width='250' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f0f2f5'/%3E%3Ctext x='50%25' y='50%25' font-family='Inter' font-size='16' fill='%23666' text-anchor='middle' dy='.3em'%3E%3C/text%3E%3C/svg%3E";
  };

  return (
        <div className="container mx-auto px-4 py-8">
      {/* Título principal */}
      <div className="text-center mb-12">
        <Title 
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "#0e6fa5" }}
        >
          Productos AgroBombas
        </Title>
        <Text 
          className="text-lg md:text-xl text-gray-600"
          style={{ color: "#666" }}
        >
          Descubre nuestra selección de productos de calidad
        </Text>
      </div>
      <Row gutter={[16, 16]} justify="center">
        {webproducts?.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image || getPlaceholderImage(product)}
                  
                  style={{height: "100px", 
                    objectFit: "cover",
                    width: "100%",
                    background: "#f0f2f5" }}
                />
                
              }
              
              actions={[
                product.showprice ? (
                  <div style={{ color: "#52c41a", fontWeight: "bold" }}>
                    <ShoppingCartOutlined /> ${product.webprice}
                  </div>
                ) : (
                  <div style={{ color: "#1890ff", fontWeight: "bold" }}>
                    <QuestionCircleOutlined /> Consultar
                  </div>
                ),
              ]}
            >
              <Meta
                title={product.name}
                description={
                  product.isofert && (
                    <Tag icon={<FireOutlined />} color="red">
                      PROMO
                    </Tag>
                  )
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductsWeb;

