import database from '../../database/db';
import { IComment } from './interfaces/IComment';
import { ICommentWithUser } from './interfaces/ICommentWithUser';

const getCommentById = async (id: number): Promise<IComment> => {
  try {
    return await database('comment').where({ id }).first().select();
  } catch (err) {
    console.log(err.message);
  }
};

const getAdvertisementComments = async (id: number): Promise<IComment[]> => {
  try {
    return await database('comment').where({ advertisement_id: id }).select();
  } catch (err) {
    console.log(err.message);
  }
};

const getAdvertisementCommentsWithUserInfo = async (
  id: number
): Promise<ICommentWithUser[]> => {
  try {
    return await database('comment')
      .where({ advertisement_id: id })
      .join(`user`, `comment.user_id`, `user.id`)
      .select(
        'comment.id',
        'comment.description',
        'comment.created_at',
        'comment.updated_at',
        'comment.user_id',
        'comment.advertisement_id',
        'user.name as user_name'
      );
  } catch (err) {
    console.log(err.message);
  }
};

const insertComment = async (comment: IComment) => {
  try {
    return await database('comment')
      .insert({
        ...comment
      })
      .then((id) => {
        return database('comment').where({ id }).first().select();
      });
  } catch (err) {
    console.log(err.message);
  }
};

const updateComment = async (
  id: number,
  editedComment: IComment
): Promise<IComment> => {
  try {
    return await database('comment')
      .where({ id })
      .update({
        ...editedComment,
        updated_at: database.fn.now()
      });
  } catch (err) {
    console.log(err.message);
  }
};

const deleteComment = async (id: number): Promise<IComment> => {
  try {
    return await database('comment').where({ id }).del();
  } catch (err) {
    console.log(err.message);
  }
};

export default {
  getCommentById,
  getAdvertisementComments,
  insertComment,
  updateComment,
  deleteComment,
  getAdvertisementCommentsWithUserInfo
};
