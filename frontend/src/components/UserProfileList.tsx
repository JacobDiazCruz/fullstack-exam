import { IUserProfile } from "../../../backend";

interface Props {
  profiles: IUserProfile[];
}

export const UserProfileList: React.FC<Props> = ({ profiles }) => {
  return (
    <div>
      <h2>Task 1: User Profiles</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id}>
            {profile.name} - {profile.email}
            {/* Display tags if present */}
            {profile.tags &&
              profile.tags.map((tag, index) => (
                <span key={index}> {tag} </span>
              ))}
          </li>
        ))}
      </ul>
      <hr />
      <h2>Task 2: Data table</h2>
    </div>
  );
};
