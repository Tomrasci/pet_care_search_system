import express from 'express';
import commentController from '../controllers/comment.controller';
import authJwt from '../middleware/authJwt';
const router = express.Router();

router.get(
  '/commentsWithUserInfo/:id',
  commentController.getAdvertisementCommentsWithUserInfo
);

router.get('/comments/:id', commentController.getCommentById);

router.post(
  '/comments',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  commentController.createComment
);

router.delete(
  '/comments/:id',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  commentController.deleteComment
);

router.put(
  '/comments/:id',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  commentController.updateComment
);

export default router;
