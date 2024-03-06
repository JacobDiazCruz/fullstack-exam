import React, { useEffect, useState } from "react";
import { IUserProfile } from "../../backend";
import { getAllProfiles } from "./api/profile";
import { DataTable } from "./components/DataTable";
import { UserProfileForm } from "./components/UserProfileForm";
import { UserProfileList } from "./components/UserProfileList";

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<IUserProfile[]>([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const fetchedProfiles = await getAllProfiles();
    setProfiles(fetchedProfiles);
  };

  return (
    <div>
      <h1>User Profile Management</h1>
      <UserProfileForm fetchProfiles={fetchProfiles} />
      <UserProfileList profiles={profiles} fetchProfiles={fetchProfiles} />
      <DataTable />
    </div>
  );
};

export default App;
