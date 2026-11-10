import { queryClient } from "../../utils/queryCient";
import { queryKeys } from "../../utils/queryKeys";

export const handleNewMessage = (message ) => {
  const chatId = message?.roomId || message;
  if (!chatId) {
    return;
  }

  const queryKey = queryKeys.messages.chat(chatId);

  queryClient.setQueryData(queryKey, (old) => {

    if (!old) {
      return {
        pages: [
          {
            messages: [message],
          },
        ],
        pageParams: [],
      };
    }

    const pages = [...old.pages];

    const lastPageIndex = pages.length - 1;
    const lastPage = pages[lastPageIndex];


    pages[lastPageIndex] = {
      ...lastPage,
      messages: [
        ...(lastPage.messages || []),
        message,
      ],
    };

    return {
      ...old,
      pages,
    };
  });
};

export const handleDelivered = () => {
  // TODO: Update message status in cache.
};

export const handleRead = () => {
  // TODO: Update message status in cache.
};

export const handleTypingStart = () => {
  // TODO: Set typing indicator in cache/state.
};

export const handleTypingStop = () => {
  // TODO: Remove typing indicator from UI/state.
};