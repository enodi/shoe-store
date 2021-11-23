import React from "react";
import {Box, useBreakpointValue} from "@chakra-ui/react";
import Table from "./Table";
import {StoreType} from "../helper/types";

interface Props {
  data: StoreType[];
}

const TopProducts: React.FC<Props> = ({data}) => {
  const isMobile = useBreakpointValue({base: true, md: false});
  return (
    <Box sx={isMobile ? {maxW: "100%"} : {maxW: "550px"}}>
      <Table
        label="Top 5 Products"
        tableHeader={['Store', 'Shoe model', 'Quantity left']}
        data={data}
      />
    </Box>
  )
}

export default TopProducts;
