import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat/groupChat.service";
import { queryKeys } from "../../../utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useUpdateGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.updateGroup,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.detail(vars.groupId)
      });
    }
  });
};

export const useRemoveMember = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.removeMember,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.detail(vars.groupId)
      });
    }
  });
};

export const useLeaveGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.leaveGroup,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.all
      });
    }
  });
};

export const useGetUserGroups = () => {
  return useQuery({
    queryKey: queryKeys.groupChat.list(),
    queryFn: groupChatService.getUserGroups
  });
};

export const useGetGroupById = (groupId) => {
  return useQuery({
    queryKey: queryKeys.groupChat.detail(groupId),
    queryFn: () => groupChatService.getGroupById(groupId),
    enabled: !!groupId
  });
};

export const useDeleteGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.deleteGroup,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.all
      });
    }
  });
};

export const useCreateGroup = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: groupChatService.createGroup,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.all
      });
    }
  });
};

export const useAddMembers = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: groupChatService.addMembers,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.detail(vars.groupId)
      });
    }
  });
};

export const useChangeRole = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.changeRole,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.detail(vars.groupId)
      });
    }
  });
};