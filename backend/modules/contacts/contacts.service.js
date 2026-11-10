import { NotFoundError } from "../../errors/index.js";
import { Contact } from "../../models/Contact.model.js";
import { toStr } from "../../utils/string.utils.js";
import { User } from "../../models/User.model.js"

export const createContact = async ({ owner, phoneNo, username, savedName }) => {
  const searchObject = (username) ? {username} : {phoneNo}
  const user2 = await User.findOne(searchObject)
  if(!user2)
    throw new NotFoundError("no on this platform")
  const contact = await Contact.create({
    owner,
    contact: toStr(user2._id),
    savedName,
  });

  return contact;
};

export const getUserContacts = async (userId) => {
  const contacts = await Contact.find({
    owner: toStr(userId),
  })
    .sort({ createdAt: -1 })
    .populate("contact", "profile username phoneNo");

  return contacts;
};

export const updateContact = async ({ userId, contactId, savedName }) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: toStr(userId),
    },
    { savedName },
    { new: true }
  );

  if (!contact) {
    throw new NotFoundError("Contact not found", 404);
  }

  return contact;
};

export const deleteContact = async ({ userId, contactId }) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    owner: toStr(userId),
  });

  if (!contact) {
    throw new NotFoundError("Contact not found", 404);
  }

  return { message: "Contact deleted successfully" };
};