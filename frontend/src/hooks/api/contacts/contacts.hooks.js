import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as contactService from "../../../services/contacts/contacts.service";

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await contactService.createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useGetUserContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => await contactService.getUserContacts(),
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contactId, data }) =>
      await contactService.updateContact(contactId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactId) =>
      await contactService.deleteContact(contactId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};