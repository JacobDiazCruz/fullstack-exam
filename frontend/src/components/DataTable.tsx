import { Box, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";

interface DataItem {
  id: number;
  value: string;
  number: number;
}

// Generates a large array of data items for demonstration purposes, do not need to modify.
const generateDataItems = (count: number): DataItem[] => {
  return Array.from({ length: count }, (v, k) => ({
    id: k,
    value: `Item ${k}`,
    number: Math.floor(Math.random() * 100),
  }));
};

export const DataTable = () => {
  const dataItems = generateDataItems(1000);
  const [searchTerm, setSearchTerm] = useState("");

  const processedItems = useMemo(() => {
    return dataItems
      .filter((item) =>
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((item) => ({ ...item, number: item.number * 2 }));
  }, [dataItems, searchTerm]);

  const total = () => {
    let runningTotal = processedItems
      .map((item) => item.number)
      .reduce((a, b) => a + b, 0);

    return runningTotal;
  };

  return (
    <Box sx={{ pb: 40 }}>
      <Typography variant="h5" fontWeight="600">
        Data Table
      </Typography>
      <TextField
        type="text"
        sx={{ width: "100%", mb: 2, mt: 3 }}
        placeholder="Search for item"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AutoSizer style={{ marginTop: 5 }}>
        {({ width }) => (
          <Table
            width={width}
            height={300}
            headerHeight={20}
            rowHeight={60}
            rowCount={processedItems.length}
            rowGetter={({ index }) => processedItems[index]}
          >
            <Column
              width={width * 0.3}
              label="ID"
              flexGrow={5}
              cellRenderer={({ cellData }) => cellData}
              dataKey="id"
            />
            <Column
              width={width * 0.3}
              flexGrow={1}
              label="Value"
              cellRenderer={({ cellData }) => cellData}
              dataKey="value"
            />
            <Column
              width={width * 0.3}
              flexGrow={1}
              label="Number"
              cellRenderer={({ cellData }) => cellData}
              dataKey="number"
            />
            <Column
              width={width * 0.3}
              flexGrow={1}
              label="Total"
              cellRenderer={({ cellData }) => total()}
              dataKey="total"
            />
          </Table>
        )}
      </AutoSizer>
    </Box>
  );
};
