import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  Pagination,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Info,
  MoreVertOutlined,
  OpenInFullOutlined,
  Search,
} from "@mui/icons-material";

interface DataTableProps {
  data?: Array<Record<string, any>>;
  columns?: Array<{
    id: string;
    header: string;
    accessorKey: string;
  }>;
  filters?: Record<string, any>;
}

const DataTable: React.FC<DataTableProps> = ({
  data = [
    {
      id: 1,
      title: "A101",
      data1: "Data",
      data2: "Data",
      data3: "Data",
      data4: "Data",
    },
    {
      id: 2,
      title: "A104",
      data1: "Data",
      data2: "Data",
      data3: "Data",
      data4: "Data",
    },
    {
      id: 3,
      title: "A105",
      data1: "Data",
      data2: "Data",
      data3: "Data",
      data4: "Data",
    },
    {
      id: 4,
      title: "A10",
      data1: "Data",
      data2: "Data",
      data3: "Data",
      data4: "Data",
    },
    {
      id: 5,
      title: "A124",
      data1: "Data",
      data2: "Data",
      data3: "Data",
      data4: "Data",
    },
    {
      id: 6,
      title: "A55W",
      data1: "Data",
      data2: "Data",
      data3: "Data",
      data4: "Data",
    },
    {
      id: 7,
      title: "A55G",
      data1: "Data",
      data2: "Data",
      data3: "Data",
      data4: "Data",
    },
  ],
  columns = [
    { id: "title", header: "Title", accessorKey: "title" },
    { id: "data1", header: "Data", accessorKey: "data1" },
    { id: "data2", header: "Data", accessorKey: "data2" },
    { id: "data3", header: "Data", accessorKey: "data3" },
    { id: "data4", header: "Data", accessorKey: "data4" },
  ],
  filters = {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 5;

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue === bValue) return 0;

    const comparison = aValue > bValue ? 1 : -1;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Paper className="w-full bg-white rounded-md shadow-sm border border-gray-200">
      <Box className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Typography variant="h6" className="font-medium mb-2">
            Details within Teams
          </Typography>
          <Box className="flex items-center gap-1">
            <IconButton size="small" className="text-gray-500">
              <OpenInFullOutlined fontSize="small" />
            </IconButton>
            <IconButton size="small" className="text-gray-500">
              <MoreVertOutlined fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="h-4 w-4 text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <Box className="flex items-center">{column.header}</Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.id}`}>
                      {row[column.accessorKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {totalPages > 1 && (
        <Box className="p-4 border-t border-gray-200 flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Paper>
  );
};

export default DataTable;
