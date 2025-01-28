import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrderBySale, getOrderLines } from "./salesSlice";


const ViewLinesSale = (props) => {
const { venta } = props
const dispatch = useDispatch()

/* useEffect (() => {
    const fetchData = async () => {
        await dispatch(getOrderBySale(venta))
    }
    fetchData()
},[dispatch]) */

return (
    <>
      <>Venta {venta}</>
    </>
  );
};

export default ViewLinesSale;
