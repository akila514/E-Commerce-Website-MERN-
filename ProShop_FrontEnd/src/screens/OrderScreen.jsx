import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../store/orderApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  console.log(orderId);

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  return <div>OrderScreen</div>;
};

export default OrderScreen;
