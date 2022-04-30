import commentModel from '../models/comment.model';
import { IComment } from '../models/interfaces/IComment';

const createComment = async (comment: IComment) => {
  return await commentModel.insertComment(comment);
};

const getCommentById = async (id: number) => {
  return await commentModel.getCommentById(id);
};

const getAdvertisementComments = async (aid: number) => {
  return await commentModel.getAdvertisementComments(aid);
};

const getAdvertisementCommentsWithUserInfo = async (aid: number) => {
  return await commentModel.getAdvertisementCommentsWithUserInfo(aid);
};

const updateComment = async (comment: IComment, id: number) => {
  return await commentModel.updateComment(id, comment);
};
const deleteComment = async (id: number): Promise<IComment> => {
  return await commentModel.deleteComment(id);
};

export default {
  createComment,
  getCommentById,
  getAdvertisementComments,
  getAdvertisementCommentsWithUserInfo,
  updateComment,
  deleteComment
};
