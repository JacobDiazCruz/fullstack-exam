import { Box, Divider } from "@mui/material";
import React from "react";
import { DataTable } from "./components/DataTable";
import { UserProfileManagement } from "./components/UserProfileManagement";

const App: React.FC = () => {
  return (
    <Box
      sx={{
        m: "auto",
        justifyContent: "center",
        width: "1200px",
        py: "60px",
      }}
    >
      <UserProfileManagement />
      <Divider sx={{ my: 5 }} />
      <DataTable />
    </Box>
  );
};

export default App;
