import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { IUserProfile } from "../../../../backend";
import { createProfile, updateProfile } from "../../api/profile";
interface Props {
  type: "CREATE" | "UPDATE";
  fetchProfiles: () => void;
  open: boolean;
  profile: IUserProfile;
  setProfile: any;
  onClose: () => void;
}

export const UserProfileForm: React.FC<Props> = ({
  type,
  profile,
  setProfile,
  fetchProfiles,
  open,
  onClose,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    type === "CREATE"
      ? await createProfile(profile)
      : await updateProfile(profile);
    setProfile({ name: "", email: "", age: 0, tags: [] });
    fetchProfiles();
    onClose();
  };

  const TAGS = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Cybersecurity Analyst",
  ];

  const selectedValues = React.useMemo(
    () => TAGS.filter((v) => profile.tags?.includes(v)),
    [TAGS, profile.tags]
  );

  const handleTagsChange = (_: any, values: string[]) => {
    setProfile({ ...profile, tags: values });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ width: 400 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" fontWeight="600">
            {type === "CREATE" ? "Create Profile" : "Edit Profile"}
          </Typography>
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
              sx={{ width: "100%", marginTop: 1 }}
            />
          </div>
          <div>
            <label>Email:</label>
            <TextField
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              sx={{ width: "100%", marginTop: 1 }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Tags:</label>
            <Autocomplete
              options={TAGS}
              multiple
              sx={{ width: "100%", mt: 1 }}
              value={selectedValues}
              onChange={handleTagsChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Age:</label>
            <TextField
              type="number"
              name="age"
              InputProps={{
                inputProps: { min: 0 },
              }}
              value={profile.age}
              onChange={handleChange}
              sx={{ width: "100px", marginTop: 1 }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{
              height: 45,
              background: "black",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
