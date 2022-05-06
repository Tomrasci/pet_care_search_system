import database from '../../database/db';
import { IComment } from './interfaces/IComment';
import { ICommentWithUser } from './interfaces/ICommentWithUser';

const getCommentById = async (id: number): Promise<IComment> => {
  return await database('comment').where({ id }).first().select();
};

const getAdvertisementComments = async (id: number): Promise<IComment[]> => {
  return await database('comment').where({ advertisement_id: id }).select();
};

const getAdvertisementCommentsWithUserInfo = async (
  id: number
): Promise<ICommentWithUser[]> => {
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
};

const insertComment = async (comment: IComment) => {
  return await database('comment')
    .insert({
      ...comment
    })
    .then((id) => {
      return database('comment')
        .where('comment.id', id)
        .join(`user`, `comment.user_id`, `user.id`)
        .first()
        .select(
          'comment.id',
          'comment.description',
          'comment.created_at',
          'comment.updated_at',
          'comment.user_id',
          'comment.advertisement_id',
          'user.name as user_name'
        );
    });
};

const updateComment = async (
  id: number,
  editedComment: IComment
): Promise<IComment> => {
  return await database('comment')
    .where({ id })
    .update({
      ...editedComment,
      updated_at: database.fn.now()
    });
};

const deleteComment = async (id: number): Promise<IComment> => {
  return await database('comment').where({ id }).del();
};

export default {
  getCommentById,
  getAdvertisementComments,
  insertComment,
  updateComment,
  deleteComment,
  getAdvertisementCommentsWithUserInfo
};
