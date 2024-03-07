import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IUserProfile } from "../../../../backend";
import { getAllProfiles } from "../../api/profile";
import { UserProfileForm } from "./UserProfileForm";
import { UserProfileList } from "./UserProfileList";

export const UserProfileManagement: React.FC = () => {
  const PROFILE_DATA = {
    name: "",
    email: "",
    age: 0,
    tags: [],
  };
  const [profiles, setProfiles] = useState<IUserProfile[]>([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [formType, setFormType] = useState<"CREATE" | "UPDATE">("CREATE");
  const [profile, setProfile] = useState<IUserProfile>(PROFILE_DATA);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const fetchedProfiles = await getAllProfiles();
    setProfiles(fetchedProfiles);
  };

  const handleClickEdit = (profile: IUserProfile) => {
    setFormType("UPDATE");
    setProfile(profile);
    setShowProfileForm(true);
  };

  return (
    <Box
      sx={{
        m: "auto",
        justifyContent: "center",
        width: "1200px",
        py: "60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="600">
          User Profile Management
        </Typography>
        <Button
          onClick={() => {
            setFormType("CREATE");
            setShowProfileForm(true);
          }}
          sx={{ background: "black", textTransform: "capitalize" }}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Add new Profile
        </Button>
      </Box>
      <UserProfileForm
        type={formType}
        profile={profile}
        setProfile={setProfile}
        fetchProfiles={fetchProfiles}
        open={showProfileForm}
        onClose={() => {
          setShowProfileForm(false);
          setProfile(PROFILE_DATA);
        }}
      />
      <UserProfileList
        profiles={profiles}
        fetchProfiles={fetchProfiles}
        handleClickEdit={handleClickEdit}
      />
    </Box>
  );
};
