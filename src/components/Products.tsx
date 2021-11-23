import React from "react";
import Table from "./Table";
import {StoreType} from "../helper/types";

interface Props {
  data: StoreType[];
}

const Products: React.FC<Props> = ({data}) => (
  <Table
    label="All Products"
    data={data}
    tableHeader={['Store', 'Shoe model', 'Quantity left']}
    showPagination={true}
  />
);

export default Products;
