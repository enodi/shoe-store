import React from "react";
import {Box, useBreakpointValue} from "@chakra-ui/react"
import Toast from "./components/Toast";
import Header from "./components/Header";
import Products from "./components/Products";
import TopProducts from "./components/TopProducts";
import BottomProducts from "./components/BottomProducts";
import {getLatestSales, getTopProducts, getLeastProducts, latestSaleCompleted} from "./helper/api-client";
import {StoreType} from "./helper/types";
import TopSection from "./components/TopSection";

const App = () => {
  const [connectionError, setConnectionError] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState<StoreType[]>([]);
  const [topProducts, setTopProducts] = React.useState<StoreType[]>([]);
  const [leastProducts, setLeastProducts] = React.useState<StoreType[]>([]);
  const [newSaleCompleted, setNewSaleCompleted] = React.useState<StoreType[]>([]);
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

  const hideAlert = () => setConnectionError(false);

  return (
    <Box>
      <Header />
      <TopSection connectionError={connectionError} hideAlert={hideAlert}/>
      <Box sx={{margin: "50px auto 0", maxW: "1200px"}}>
        <Box sx={!isMobile ? {display: "flex", justifyContent: "space-between", width:"100%"} :{}}>
          <TopProducts data={topProducts} />
          <BottomProducts data={leastProducts}/>
        </Box>
        <Products data={allProducts}/>
      </Box>
      {newSaleCompleted.length && newSaleCompleted.map((item: StoreType, index: number) => <Toast key={index} data={item} />)}
    </Box>
  );
}

export default App;
