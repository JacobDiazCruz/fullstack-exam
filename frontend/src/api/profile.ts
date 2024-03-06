import axios from "axios";
import { IUserProfile } from "../../../backend";

const API_URL = "http://localhost:3000/api/users";

export const getAllProfiles = async (): Promise<IUserProfile[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProfile = async (
  profile: IUserProfile
): Promise<IUserProfile> => {
  const response = await axios.post(API_URL, profile);
  return response.data;
};
