import React from "react";
import {Box, useBreakpointValue} from "@chakra-ui/react";
import Products from "./Products";
import TopProducts from "./TopProducts";
import BottomProducts from "./BottomProducts";
import {getLatestSales, getTopProducts, getLeastProducts, latestSaleCompleted} from "../helper/api-client";
import {StoreType} from "../helper/types";

interface Props {
  setConnectionError: (val: boolean) => void;
  setNewSaleCompleted: (response: StoreType[]) => void;
}

const BottomSection: React.FC<Props> = ({setConnectionError, setNewSaleCompleted}) => {
  const [allProducts, setAllProducts] = React.useState<StoreType[]>([]);
  const [topProducts, setTopProducts] = React.useState<StoreType[]>([]);
  const [leastProducts, setLeastProducts] = React.useState<StoreType[]>([]);
  const isMobile = useBreakpointValue({base: true, md: false});

  React.useEffect(() => {
    handleAllProducts();
    handleTopFiveProducts();
    handleLeastFiveProducts();
    handleLatestSale();
    const interval=setInterval(()=>{
      handleAllProducts();
      handleTopFiveProducts();
      handleLeastFiveProducts();
      handleLatestSale();
     }, 5000)
       
     return () => clearInterval(interval);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAllProducts = async () => {
    try {
      const response = await getLatestSales();
      setAllProducts(response);
    } catch (error) {
      setConnectionError(true);
    }
  }

  const handleTopFiveProducts = async () => {
    try {
      const response = await getTopProducts();
      setTopProducts(response);
    } catch (error) {
      setConnectionError(true);
    }
  }

  const handleLeastFiveProducts = async () => {
    try {
      const response = await getLeastProducts();
      setLeastProducts(response);
    } catch (error) {
      setConnectionError(true);
    }
  }

  const handleLatestSale = async () => {
    try {
      const response = await latestSaleCompleted();
      setNewSaleCompleted(response);
    } catch (error) {
      setConnectionError(true);
    }
  }
  return (
    <Box sx={{margin: "50px auto 0", maxW: "1200px"}}>
      <Box sx={!isMobile ? {display: "flex", justifyContent: "space-between", width:"100%"} :{}}>
        <TopProducts data={topProducts} />
        <BottomProducts data={leastProducts}/>
      </Box>
      <Products data={allProducts}/>
    </Box>
  );
};

export default BottomSection;
