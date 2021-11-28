import React from "react";
import {useToast, Box} from "@chakra-ui/react";
import {StoreType} from "../helper/types";

interface Props {
  data?: StoreType;
}

const ToastComponent: React.FC<Props>  = ({data}) => {
  const toast = useToast();

  React.useEffect(() => {
    toast({
      position: "top-right",
      title: "New Sale Completed",
      description: <Box><p>Model: {data?.model}</p> <p>Store: {data?.store}</p> <p>Inventory: {data?.inventory}</p></Box>,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <span>{''}</span>;
}

export default ToastComponent;