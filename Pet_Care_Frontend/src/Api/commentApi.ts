import { IComment } from "../Interfaces/Caretaker/IComment";
import http from "../Utils/httpRequestBody";

const createComment = async (comment: IComment) => {
  const { data, status } = await http.post("/comments", comment);
  return data;
};

const getAdvertisementCommentsWithUserInfo = async (aid: number) => {
  const { data, status } = await http.get(`/commentsWithUserInfo/${aid}`);
  return data;
};

const getComment = async (id: number) => {
  const { data, status } = await http.get(`/comments/${id}`);
  return data;
};

const updateComment = async (id: number, editedComment: IComment) => {
  const { data, status } = await http.put(`/comments/${id}`, editedComment);
  return data;
};

const deleteComment = async (id: number) => {
  return await http.delete(`/comments/${id}`);
};

export default {
  createComment,
  getAdvertisementCommentsWithUserInfo,
  getComment,
  updateComment,
  deleteComment,
};
