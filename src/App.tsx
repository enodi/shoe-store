import React from "react";
import {Box, useBreakpointValue} from "@chakra-ui/react"
import Alert from "./components/Alert";
import Header from "./components/Header";
import Products from "./components/Products";
import TopProducts from "./components/TopProducts";
import BottomProducts from "./components/BottomProducts";
import CountDownTimer from "./components/CountDownTimer";
import {getAllProducts, getTopProducts, getLeastProducts} from "./helper/api-client";
import {StoreType} from "./helper/types";

const App = () => {
  const [connectionError, setConnectionError] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState<StoreType[]>([]);
  const [topProducts, setTopProducts] = React.useState<StoreType[]>([]);
  const [leastProducts, setLeastProducts] = React.useState<StoreType[]>([]);
  const isMobile = useBreakpointValue({base: true, md: false});

  React.useEffect(() => {
    handleAllProducts();
    handleTopFiveProducts();
    handleLeastFiveProducts();
  }, [allProducts, topProducts, leastProducts])

  const handleAllProducts = async () => {
    try {
      const response = await getAllProducts();
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

  const hideAlert = () => setConnectionError(false);

  return (
    <Box>
      <Header />
      <Box sx={{margin: "50px auto 0", maxW: "1200px"}}>
      <CountDownTimer />
      {connectionError && (
        <Alert
          handleOnClick={hideAlert}
          title="Network Error!"
          description="A network error occurred. Please try again"
          status="error"
          closeButton={true}
        />
      )}
        <Box sx={!isMobile ? {display: "flex", justifyContent: "space-between", width:"100%"} :{}}>
          <TopProducts data={topProducts} />
          <BottomProducts data={leastProducts}/>
        </Box>
        <Products data={allProducts}/>
      </Box>
    </Box>
  );
}

export default App;
