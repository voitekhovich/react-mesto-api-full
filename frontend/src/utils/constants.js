export const BASE_URL = 'http://localhost:3000'

export const headers = {
  // authorization: token,
  "Content-Type": "application/json",
};

export const userProfileSelectors = {
  userName: ".profile__name",
  userAbout: ".profile__about",
  userAvatart: ".profile__avatar",
};

export const formList = {
  editAvatarForm: "edit-form-avatar",
  addForm: "add-form",
  editForm: "edit-form",
};

export const elementTemplate = "#element-template";
export const elementsSelector = ".elements";

export const profileButtonEdit = document.querySelector(
  ".profile__edit-button"
);
export const profileButtonAdd = document.querySelector(".profile__add-button");
export const profileAvatarEdit = document.querySelector(
  ".profile__avatar-edit"
);

export const popupList = {
  popupEdit: ".popup_edit",
  popupAvatar: ".popup_avatar",
  popupImage: ".popup_image",
  popupAdd: ".popup_add",
  popupDel: ".popup_del",
};

export const INFOTOOLTIP_MESSAGE_DEFAULT = {
  icon: "",
  title: "",
};
export const INFOTOOLTIP_MESSAGE_OK = {
  icon: "infotooltip__icon_ok",
  title: "Вы успешно зарегистрировались!",
};
export const INFOTOOLTIP_MESSAGE_ERR = {
  icon: "infotooltip__icon_err",
  title: "Что-то пошло не так!\u000AПопробуйте ещё раз.",
};
