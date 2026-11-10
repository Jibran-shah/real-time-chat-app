import { apiClient } from "../apiClient";

export const createContact = async (data) => {
  const res = await apiClient.post("/contacts", data);
  return res.data;
};

export const getUserContacts = async () => {
  const res = await apiClient.get("/contacts");
  return res.data;
};

export const updateContact = async (contactId, data) => {
  const res = await apiClient.patch(`/contacts/${contactId}`, data);
  return res.data;
};

export const deleteContact = async (contactId) => {
  const res = await apiClient.delete(`/contacts/${contactId}`);
  return res.data;
};