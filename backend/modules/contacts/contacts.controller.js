import * as contactService from "./contacts.service.js";

export const createContact = async (req, res) => {
  const contact = await contactService.createContact({
    owner:req.user.id,
    ...req.validated?.body
  });

  return res.status(201).json({
    success: true,
    data: { contact },
  });
};

export const getUserContacts = async (req, res) => {
  const userId = req.user.id;
  const contacts = await contactService.getUserContacts(userId);
  return res.status(200).json({
    success: true,
    data: {contacts},
  });
};

export const updateContact = async (req, res) => {
  const userId = req.user.id;
  const { contactId } = req.params;
  const { savedName } = req.validated.body;
  const contact = await contactService.updateContact({
    userId,
    contactId,
    savedName,
  });

  return res.status(200).json({
    success: true,
    data: { contact },
  });
};

export const deleteContact = async (req, res) => {
  const userId = req.user.id;
  const { contactId } = req.params;
  const result = await contactService.deleteContact({
    userId,
    contactId,
  });
  return res.status(200).json({
    success: true,
    data: result,
  });
};