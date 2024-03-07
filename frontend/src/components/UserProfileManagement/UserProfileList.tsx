import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
} from "@mui/material";
import Card from "@mui/material/Card";
import React, { useState } from "react";
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState("");

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
                  onClick={() => {
                    setSelectedProfileId(profile._id as string);
                    setShowDeleteDialog(true);
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogContent
          sx={{
            p: 3,
          }}
        >
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user's profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            pb: 2,
            px: 3,
          }}
        >
          <Button
            sx={{
              textTransform: "capitalize",
              color: "#000",
            }}
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#ef4444",
              textTransform: "capitalize",
            }}
            disableElevation
            onClick={async () => {
              setShowDeleteDialog(false);
              await deleteProfile(selectedProfileId);
              fetchProfiles();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
