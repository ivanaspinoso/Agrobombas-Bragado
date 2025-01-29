const ViewLinesSale = (props) => {

const { orderlines } = props

return (
    <>Cant. - Articulo - Producto - Precio - Subtotal<br/>
    { orderlines && orderlines.map((line,index) => {
      return(<>{line.quantity} - {line.article} - {line.name} - {line.price} - {line.subtotal}<br/></>)
    })}
    </>
  );
};

export default ViewLinesSale;
