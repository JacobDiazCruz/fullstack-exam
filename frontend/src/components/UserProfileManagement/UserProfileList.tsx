import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, List, ListItem } from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import { IUserProfile } from "../../../../backend";
import { deleteProfile } from "../../api/profile";

interface Props {
  profiles: IUserProfile[];
  fetchProfiles: () => void;
  handleClickEdit: (profile: IUserProfile) => void;
}

export const UserProfileList: React.FC<Props> = ({
  profiles,
  fetchProfiles,
  handleClickEdit,
}) => {
  return (
    <div>
      <List>
        {profiles.map((profile: IUserProfile) => (
          <ListItem disablePadding>
            <Card
              key={profile._id}
              sx={{
                mb: 1,
                p: 2,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #FAFAFA",
                alignItems: "center",
              }}
            >
              {profile.name} - {profile.email}
              {/* Display tags if present */}
              {profile.tags &&
                profile.tags.map((tag, index) => (
                  <span key={index}> {tag} </span>
                ))}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleClickEdit(profile)}
                  sx={{ textTransform: "capitalize" }}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  sx={{ textTransform: "capitalize" }}
                  onClick={async () => {
                    await deleteProfile(profile._id as string);

                    fetchProfiles();
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
