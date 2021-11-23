import React from "react";
import {Box, useBreakpointValue} from "@chakra-ui/react"
import Table from "./Table";
import {StoreType} from "../helper/types";

interface Props {
  data: StoreType[];
}

const BottomProducts: React.FC<Props> = ({data}) => {
  const isMobile = useBreakpointValue({base: true, md: false});
  return (
    <Box sx={isMobile ? {maxW: "100%"} : {maxW: "550px"}}>
      <Table
        label="Least 5 Products"
        data={data}
        tableHeader={['Store', 'Shoe model', 'Quantity left']}
      />
    </Box>
  )
}

export default BottomProducts;
