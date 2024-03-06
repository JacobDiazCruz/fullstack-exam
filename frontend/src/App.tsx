import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IUserProfile } from "../../backend";
import { getAllProfiles } from "./api/profile";
import { DataTable } from "./components/DataTable";
import { UserProfileForm } from "./components/UserProfileForm";
import { UserProfileList } from "./components/UserProfileList";

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<IUserProfile[]>([]);
  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const fetchedProfiles = await getAllProfiles();
    setProfiles(fetchedProfiles);
  };

  return (
    <div>
      <div
        style={{ margin: "auto", justifyContent: "center", width: "1200px" }}
      >
        <h1>User Profile Management</h1>
        <Button
          onClick={() => setShowProfileForm(true)}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Add new Profile
        </Button>
        <UserProfileForm
          fetchProfiles={fetchProfiles}
          open={showProfileForm}
          onClose={() => setShowProfileForm(false)}
        />
        <UserProfileList profiles={profiles} fetchProfiles={fetchProfiles} />
        <DataTable />
      </div>
    </div>
  );
};

export default App;
