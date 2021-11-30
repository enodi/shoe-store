import React from "react";
import {Box} from "@chakra-ui/react"
import Toast from "./components/Toast";
import Header from "./components/Header";
import {StoreType} from "./helper/types";
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";

const App = () => {
  const [connectionError, setConnectionError] = React.useState(false);
  const [newSaleCompleted, setNewSaleCompleted] = React.useState<StoreType[]>([]);

  const hideAlert = () => setConnectionError(false);

  return (
    <Box>
      <Header />
      <TopSection connectionError={connectionError} hideAlert={hideAlert}/>
      <BottomSection setConnectionError={setConnectionError} setNewSaleCompleted={setNewSaleCompleted}/>
      {newSaleCompleted.length && newSaleCompleted.map((item: StoreType, index: number) => <Toast key={index} data={item} />)}
    </Box>
  );
}

export default App;
