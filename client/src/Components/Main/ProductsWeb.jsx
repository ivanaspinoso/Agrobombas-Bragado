import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsWeb } from "../../app/actions/products";
import { Card, Row, Col, Tag, Typography, Pagination, Input, Modal, Empty } from "antd";
import { FireOutlined, QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { REACT_APP_CLOUDINARY_NAME } from "../../app/consts/consts";

const { Meta } = Card;
const { Title, Text } = Typography;

const cld = new Cloudinary({
  cloud: { cloudName: REACT_APP_CLOUDINARY_NAME },
});
const ProductsWeb = () => {
  const dispatch = useDispatch();
  const webproducts = useSelector((state) =>
    state.productsReducer.productsweb?.filter((product) => product.show)
  ) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsPerPage = 32;
  const filteredProducts = webproducts?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredProducts, currentPage, productsPerPage]);

  useEffect(() => {
    dispatch(getAllProductsWeb());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const getOptimizedImage = (imagepid) => {
    return cld
      .image(imagepid)
      .resize(scale().width(500))
      .delivery(quality(auto()))
      .delivery(format(auto()))
      .toURL();
  };

  const getPlaceholderImage = (product) => {
    if (product.isofert) {
      return "data:image/svg+xml,%3Csvg width='250' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' font-family='Inter' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3E%F0%9F%94%A5 PROMO %F0%9F%94%A5%3C/text%3E%3C/svg%3E";
    }
    return "data:image/svg+xml,%3Csvg width='250' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f0f2f5'/%3E%3Ctext x='50%25' y='50%25' font-family='Inter' font-size='16' fill='%23666' text-anchor='middle' dy='.3em'%3E%3C/text%3E%3C/svg%3E";
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };
  // 📌 Si no hay productos en absoluto, no renderiza la sección.
  if (webproducts.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 🔹 Encabezado */}
      <div className="text-center mb-12">
        <Title className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0e6fa5" }}>
          Nuestros Productos
        </Title>
        <Text className="text-lg md:text-xl text-gray-600" style={{ color: "#666" }}>
          Descubre nuestra selección de productos de calidad
        </Text>
      </div>
      {/* 🔹 Barra de Búsqueda */}
      <div className="flex justify-center mb-8">
        <Input
          placeholder="Buscar producto..."
          prefix={<SearchOutlined className="text-gray-500" />}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0e6fa5]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {/* 🔹 Mensaje de "No se encontró el producto" SOLO SI HAY PRODUCTOS pero la búsqueda no tiene coincidencias */}
      {webproducts.length > 0 && filteredProducts.length === 0 && (
        <div className="flex justify-center mt-8">
          <Empty description="No se encontró el producto" />
        </div>
      )}
      {/* 🔹 Grid de Productos (Solo si hay productos en la búsqueda) */}
      {filteredProducts.length > 0 && (
        <>
          <Row gutter={[16, 16]} justify="center">
            {filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(product)}
                  cover={
                    <img
                      alt={product.name}
                      src={product.imagepid ? getOptimizedImage(product.imagepid) : getPlaceholderImage(product)}
                      style={{ height: "100px", objectFit: "cover", width: "100%", background: "#f0f2f5" }}
                    />
                  }                  
                  actions={[
                    product.showprice ? (
                      <div style={{ color: "#52c41a", fontWeight: "bold" }}>
                     ${product.webprice}
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

          {/* 🔹 Paginación */}
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              total={filteredProducts.length}
              pageSize={productsPerPage}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              showSizeChanger={false}
              hideOnSinglePage={true}
              showLessItems={true}
            />
          </div>
        </>
      )}

      {/* 🔹 Modal de Producto */}
      <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} centered>
        {selectedProduct && (
          <div>
<img
              src={
                selectedProduct.imagepid
                  ? getOptimizedImage(selectedProduct.imagepid)
                  : getPlaceholderImage(selectedProduct)
              }
              alt={selectedProduct.name}
              style={{ width: "100%", height: "auto", marginBottom: "16px" }}
            />           
             <Title level={4}>{selectedProduct.name}</Title>
            <p>{selectedProduct.description}</p>
          </div>
        )}
      </Modal>
      
    </div>
  );
};

export default ProductsWeb;
