/* eslint-disable import/extensions */
import express from 'express';
import createPostRequest from '../middlewares/post/createPostRequest.middleware.js';
import * as postCrudController from '../controllers/postCRUD.controller.js';
import * as postInteractionController from '../controllers/postInteraction.controller.js';
import isLoggedIn from '../middlewares/isLoggedIn.middleware.js';
import isValidID from '../middlewares/isValidID.middlware.js';
import isPostAuthor from '../middlewares/isPostAuthor.middlware.js';

const router = express.Router();

router.post(
  '/post',
  isLoggedIn,
  createPostRequest,
  postCrudController.createPost,
);

router.get('/posts', postCrudController.findAll);

router.get(
  '/post/:postId/like',
  isLoggedIn,
  isValidID,
  isPostAuthor,
  postInteractionController.likePost,
);

router.get(
  '/post/:postId/unlike',
  isLoggedIn,
  isValidID,
  isPostAuthor,
  postInteractionController.unlikePost,
);

router.delete(
  '/post/:postId',
  isLoggedIn,
  isValidID,
  isPostAuthor,
  postCrudController.deleteById,
);
export default router;
