import { Modal } from "@mui/base";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { IUserProfile } from "../../../backend";
import { createProfile } from "../api/profile";
interface Props {
  fetchProfiles: () => void;
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const UserProfileForm: React.FC<Props> = ({
  fetchProfiles,
  open,
  onClose,
}) => {
  const [profile, setProfile] = useState<IUserProfile>({
    name: "",
    email: "",
    age: 0,
    tags: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProfile(profile);
    setProfile({ name: "", email: "", age: 0, tags: [] });
    fetchProfiles();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5">Profile Form</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            width: "100%",
          }}
        >
          <div>
            <label>Name:</label>
            <TextField
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>Email:</label>
            <TextField
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>Age:</label>
            <TextField
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
