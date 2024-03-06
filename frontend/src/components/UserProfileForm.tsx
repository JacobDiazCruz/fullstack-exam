import { useState } from "react";
import { IUserProfile } from "../../../backend";
import { createProfile } from "../api/profile";

interface Props {
  fetchProfiles: () => void;
}

export const UserProfileForm: React.FC<Props> = ({ fetchProfiles }) => {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={profile.age}
          onChange={handleChange}
        />
      </div>
      {/* Add inputs for tags if needed */}
      <button type="submit">Submit</button>
    </form>
  );
};
