import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MasterDetailLayout from "../../components/common/layout/MasterDetailLayout";
import GroupSidebar from "../../components/page/chat/GroupSidebar"
import GroupContainer from "../../components/page/chat/GroupContainer";
import { setSelectedGroup } from "../../store/slices/group.slice";

export default function GroupsPage() {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.selectedGroup);
  const groupId = group?._id || group?.id;
  return (
    <MasterDetailLayout
      hasSelection={!!group}
      sidebar={(openMain) => (
        <GroupSidebar
          activeGroupId={groupId}
          onSelectedGroup={(selectedGroup) => {
            dispatch(setSelectedGroup(selectedGroup));
            openMain();
          }}
        />
      )}
      main={
        group ? (
          <GroupContainer group={group} groupId={groupId} />
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "grid",
              placeContent: "center",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Typography variant="h6">Select a group</Typography>

            <Typography variant="body2">
              Choose a group to start messaging.
            </Typography>
          </Box>
        )
      }
    />
  );
}