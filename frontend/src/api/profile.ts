import axios from "axios";
import { IUserProfile } from "../../../backend";

const API_URL = "http://localhost:3000/api/users";

export const getAllProfiles = async (): Promise<IUserProfile[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProfileById = async (
  profileId: string
): Promise<IUserProfile> => {
  const response = await axios.get(`${API_URL}/${profileId}`);
  return response.data;
};

export const createProfile = async (
  profile: IUserProfile
): Promise<IUserProfile> => {
  const response = await axios.post(API_URL, profile);
  return response.data;
};

export const deleteProfile = async (profileId: string) => {
  const response = await axios.delete(`${API_URL}/${profileId}`);
  return response.data;
};
