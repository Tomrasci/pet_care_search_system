import express from 'express';
import commentController from '../controllers/comment.controller';
const router = express.Router();

router.get(
  '/commentsWithUserInfo/:id',
  commentController.getAdvertisementCommentsWithUserInfo
);

router.get('/comments/:id', commentController.getCommentById);

router.post('/comments', commentController.createComment);

router.delete('/comments/:id', commentController.deleteComment);

router.put('/comments/:id', commentController.updateComment);

export default router;
