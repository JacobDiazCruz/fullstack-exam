import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  Typography,
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
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteProfile = async () => {
    setDeleteLoading(true);
    try {
      await deleteProfile(selectedProfileId);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
      fetchProfiles();
    }
  };

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
              <Box>
                <Typography variant="subtitle1" fontWeight="600">
                  {profile.name}
                </Typography>
                <Typography>{profile.email}</Typography>
                <Typography>Age: {profile.age}</Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  {profile.tags &&
                    profile.tags.map((tag, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: 2,
                          backgroundColor: "#bbf7d0",
                          color: "#15803d",
                          p: 1,
                          fontSize: 12,
                        }}
                      >
                        {tag}
                      </Box>
                    ))}
                </Box>
              </Box>
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
          <LoadingButton
            variant="contained"
            loading={deleteLoading}
            sx={{
              background: "#ef4444",
              textTransform: "capitalize",
            }}
            disableElevation
            onClick={handleDeleteProfile}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
