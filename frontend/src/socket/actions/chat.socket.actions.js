import { socketEmit } from "../socket.manager";
import { EVENTS } from "../../../../backend/realtime/constants/events.constants";

export const sendMessage = ({
  roomId,
  content,
  tempId,
  senderId,
  type = "text",
  attachments = [],
  receiverId
}) => {

  socketEmit(EVENTS.CHAT.MESSAGE_SEND, {
    roomId,
    content,
    tempId,
    senderId,
    type,
    attachments,
    receiverId
  });
};


export const markDelivered = ({ messageId, chatId }) => {
  socketEmit(EVENTS.CHAT.MESSAGE_DELIVERED, {
    messageId,
    chatId,
  });
};

export const markRead = ({ messageId, chatId }) => {
  socketEmit(EVENTS.CHAT.MESSAGE_READ, {
    messageId,
    chatId,
  });
};

export const typingStart = (chatId) => {
  socketEmit(EVENTS.CHAT.TYPING_START, {
    chatId,
  });
};

export const typingStop = (chatId) => {
  socketEmit(EVENTS.CHAT.TYPING_STOP, {
    chatId,
  });
};