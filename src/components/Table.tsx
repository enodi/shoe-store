import React, {useState, useMemo, useEffect} from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading
} from "@chakra-ui/react"
import ReactPaginate from "react-paginate";
import {StoreType} from "../helper/types";
import "../style.css"

interface Props {
  tableHeader: string[];
  data?: StoreType[];
  label?: string;
  showPagination?: boolean;
}

const TableComponent: React.FC<Props> = ({data, tableHeader, label, showPagination}) => {
  const [currentItems, setCurrentItems] = useState<StoreType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const result = useMemo(() => {
    return data && data.length > 0 ? data : [];
  }, [data]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(result.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(result.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, result]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % result.length;
    setItemOffset(newOffset);
  };

  return (
    <Box mb={20}>
      {label && <Heading sx={{color:"#272A30", fontSize: "24px", fontWeight: 500, mb: "10px"}}>{label}</Heading>}
      <Table variant="simple">
        <Thead sx={{ bg: "gray.400", color: "#FFF" }}>
          <Tr>
            {tableHeader.map((header, index) => <Th key={index} sx={{fontSize: 16, color: '#FFF'}}>{header}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {currentItems && currentItems.length > 0 ? currentItems.map((item: StoreType, index: number) => (
            <Tr key={index}>
              <Td>{item.store}</Td>
              <Td>{item.model}</Td>
              <Td isNumeric>{item.inventory}</Td>
            </Tr>
          ))
        : <Tr><Td colSpan={3} textAlign="center">No data available</Td></Tr>}
        </Tbody>
      </Table>
      {showPagination && currentItems.length > 0 && (
        <Box mt={10} sx={{display: "flex", justifyContent: "flex-end"}}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< prev"
            marginPagesDisplayed={1}
            containerClassName="pagination"
            pageClassName="page-item"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
          />
        </Box> 
      )}
    </Box>
  );
}

export default TableComponent;
