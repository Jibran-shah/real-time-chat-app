import { apiClient } from "../apiClient";

export const createProfile = async (data) => {
  const res = await apiClient.post("/profiles", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res?.data ?? null;
};

export const getProfile = async (id) => {
  const res = await apiClient.get(`/profiles/${id}`);
  return res?.data ?? null;
};

export const updateProfile = async (data) => {
  const res = await apiClient.put("/profiles", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res?.data?.data ?? null;
};

export const deleteProfile = async () => {
  const res = await apiClient.delete("/profiles");
  return res?.data ?? null;
};

export const getProfileById = async (id) => {
  const res = await apiClient.get(`/profiles/${id}`);
  return res?.data?.data ?? null;
};

export const getProfiles = async (params) => {
  const res = await apiClient.get("/profiles", { params });
  return res?.data ?? { data: [] };
};