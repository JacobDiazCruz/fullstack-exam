import React from "react";
import { IUserProfile } from "../../../backend";
import { deleteProfile } from "../api/profile";

interface Props {
  profiles: IUserProfile[];
  fetchProfiles: () => void;
}

export const UserProfileList: React.FC<Props> = ({
  profiles,
  fetchProfiles,
}) => {
  return (
    <div>
      <h2>Task 1: User Profiles</h2>
      <ul>
        {profiles.map((profile: IUserProfile) => (
          <li key={profile._id}>
            {profile.name} - {profile.email}
            {/* Display tags if present */}
            {profile.tags &&
              profile.tags.map((tag, index) => (
                <span key={index}> {tag} </span>
              ))}
            <button
              onClick={async () => {
                await deleteProfile(profile._id as string);
                await fetchProfiles();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Task 2: Data table</h2>
    </div>
  );
};
