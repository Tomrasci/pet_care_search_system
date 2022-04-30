import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import { ResponseCodes } from '../utils/responseCodes';
import commentService from '../services/comment.service';
import { IComment } from '../models/interfaces/IComment';
import validation from '../validation/validation';
import ApiError from '../../error/ApiError';

const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await commentService.getCommentById(Number(req.params.id));

  return res.status(ResponseCodes.OK).json(comment);
};

const getAdvertisementComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const advertComments = await commentService.getAdvertisementComments(
    Number(req.params.id)
  );

  return res.status(ResponseCodes.OK).json(advertComments);
};

const getAdvertisementCommentsWithUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const advertCommentsWithUser =
    await commentService.getAdvertisementCommentsWithUserInfo(
      Number(req.params.id)
    );

  return res.status(ResponseCodes.OK).json(advertCommentsWithUser);
};

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gottenComment: IComment = {
    description: req.body.description,
    user_id: req.body.user_id,
    advertisement_id: req.body.advertisement_id
  };
  const { error } = validation.validateComment(gottenComment);
  if (error) {
    logger.error(`Body validation failed ${error.message}`);
    return next(
      ApiError.badRequestError(`Body validation failed ${error.message}`)
    );
  }

  const insertedComment = await commentService.createComment(gottenComment);

  logger.info(`Comment has been created`);

  return res.status(ResponseCodes.CREATED).json(insertedComment);
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gottenComment: IComment = {
    description: req.body.description,
    user_id: req.body.user_id,
    advertisement_id: req.body.advertisement_id
  };
  const { error } = validation.validateComment(gottenComment);
  if (error) {
    logger.error(`Body validation failed ${error.message}`);
    return next(
      ApiError.badRequestError(`Body validation failed ${error.message}`)
    );
  }

  const editedComment = await commentService.updateComment(
    gottenComment,
    Number(req.params.id)
  );

  logger.info(`Comment has been edited`);

  const newCommentList =
    await commentService.getAdvertisementCommentsWithUserInfo(
      Number(req.body.advertisement_id)
    );

  return res.status(ResponseCodes.OK).json(newCommentList);
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await commentService.deleteComment(Number(req.params.id));
  } catch (err) {
    logger.error(err.message);
  }
  return res.status(ResponseCodes.OK).json('Comment deleted sucessfully');
};

export default {
  getCommentById,
  getAdvertisementComments,
  getAdvertisementCommentsWithUserInfo,
  createComment,
  updateComment,
  deleteComment
};
